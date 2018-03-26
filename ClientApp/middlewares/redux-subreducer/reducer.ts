import { Action, Reducer } from "redux";
import { getActionMeta, IExtendAction } from "./action";

type IActionReducer<TState, TModifedState, TPayload> = (state: TState, payload: TPayload) => TModifedState;

interface IActionReducerList<TState extends TModifedState, TModifedState> {
    [key: string]: IActionReducer<TState, TModifedState, any>;
}

export interface INamedReducer<TState> {
    name: string;
    reducer: Reducer<TState>;
}

export interface ISubReducer<TState, TReducerState extends TModifedState, TModifedState>
    extends INamedReducer<TReducerState> {

    path: string;

    setLinkToParent: (reducer: ISubReducer<TState, any, any>) => void;
    stateSelector: (state: any) => TReducerState;
    on: <TPayload>(action: IExtendAction<TPayload>, reducer: IActionReducer<TReducerState, TModifedState, TPayload>) => this;
    join: <T extends TReducerState[keyof TReducerState]>(reducer: ISubReducer<TState, T, T>) => this;
    joinReducer: <T extends TReducerState[keyof TReducerState]>(name: keyof TReducerState, reducer: (state: T, action: any) => T) => this;
}

const MainReducerName = "MainReducer";

export class SubReducer<TState, TReducerState extends TModifedState, TModifedState>
    implements ISubReducer<TState, TReducerState, TModifedState> {

    // tslint:disable-next-line:variable-name
    protected _name: string;
    private initState: TModifedState;
    private actionReducerList: IActionReducerList<TReducerState, TModifedState>;
    private reducers: Array<INamedReducer<any>>;
    private parent!: ISubReducer<TState, any, any>;

    constructor(name: string, initState?: TModifedState) {
        this.initState = initState || {} as any;
        this.actionReducerList = {} as any;
        this.reducers = [];
        this._name = name;
    }

    get name() {
        return this._name;
    }

    get path() {
        return `${this.parent.path}.${this._name}`;
    }

    public stateSelector = (state) => this.parent.stateSelector(state)[this._name];

    public setLinkToParent(reducer: ISubReducer<TState, any, any>) {
        this.parent = reducer;
    }

    public reducer: Reducer<TReducerState> = (state, action) => {
        let nextState: TReducerState = { ...state as any };

        if (!state) {
            nextState = { ...this.initState as any };
        }

        this.reducers.forEach((reducer) => {
            nextState[reducer.name] = reducer.reducer(nextState[reducer.name], action);
        });

        if (!this.actionReducerList[action.type]) {
            if (this._name === MainReducerName) {
                console.log("Next app state: ", nextState);
            }
            return nextState;
        }

        const { type, payload } = action as IExtendAction<any>;
        const nextActionState = this.actionReducerList[type](nextState, payload || {});
        this.deepExtend(nextState, nextActionState);

        console.log("reducer: ", this.path);
        console.log("action: ", action);

        const { description, from } = getActionMeta(action);
        if (description) {
            console.log(`${from || "Description"}: `, description);
        }

        console.log("State / Next state / Diff: ", state, nextState, nextActionState);
        console.log("---");

        return nextState;
    }

    public on = <TPayload>({ type }: IExtendAction<TPayload>, state: IActionReducer<TReducerState, TModifedState, TPayload>) => {
        this.actionReducerList[type] = state;
        return this;
    }

    public join = <T extends TReducerState[keyof TReducerState]>(reducer: ISubReducer<TState, T, T>) => {
        this.reducers = this.reducers.filter((el) => el.name !== reducer.name);
        reducer.setLinkToParent(this as ISubReducer<TState, any, any>);
        this.reducers.push(reducer);
        return this;
    }

    public joinReducer = <T extends TReducerState[keyof TReducerState]>(name: keyof TReducerState, reducer: (state: T, action: any) => T) => {
        this.reducers = this.reducers.filter((el) => el.name !== name);
        this.reducers.push({
            name,
            reducer,
        });
        return this;
    }

    private deepExtend = (destination, source) => {
        if (Array.isArray(destination)) {
            destination.length = 0;
            destination.push.apply(destination, source);
            return;
        }
        for (const property in source) {
            if (typeof source[property] === "object"
                && source[property] !== null
                && !Array.isArray(source[property])) {

                destination[property] = { ...destination[property] } || {};
                this.deepExtend(destination[property], source[property]);
            } else if (source[property] !== "__delete__") {
                destination[property] = source[property];
            } else {
                delete destination[property];
            }
        }
    }
}

export class MainReducer<TState extends TModifedState, TModifedState>
    extends SubReducer<TState, TState, TModifedState> {

    constructor(initState?: TModifedState) {
        super(MainReducerName, initState);
    }

    get path() {
        return this._name;
    }

    public stateSelector = (state) => state;
}

export function createMainReducer<TState extends TModifedState, TModifedState>(initState?: TModifedState): ISubReducer<TState, TState, TModifedState> {
    return new MainReducer<TState, TModifedState>(initState);
}
export function createSubReducer<TParentState, TState extends TModifedState, TModifedState>(name: keyof TParentState, initState?: TModifedState): ISubReducer<TParentState, TState, TModifedState> {
    return new SubReducer<TParentState, TState, TModifedState>(name, initState);
}
