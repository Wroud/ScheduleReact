import { Action, Reducer } from "redux";
import { IApplicationState } from "./";
import { getActionMeta, IAppAction } from "./AppAction";

interface IActionList<TState extends TModifedState, TModifedState> {
    [key: string]: (state: TState, payload: any) => TModifedState;
}

export interface IExReducer<TState> {
    name: string;
    reducer: Reducer<TState>;
}

export interface IReducer<TState, TReducerState extends TModifedState, TModifedState>
    extends IExReducer<TReducerState> {

    path: string;

    setLinkToParent: (reducer: IReducer<TState, any, any>) => void;
    stateSelector: (state: TState) => TReducerState;
    on: <TData>(action: IAppAction<TData>, state: (state: TReducerState, payload: TData) => TModifedState) => this;
    join: (reducer: IReducer<TState, any, any>) => this;
    joinReducer: <TRState>(name: string, reducer: (state: TRState, action: any) => TRState) => this;
}

const MainReducerName = "MainReducer";

export class AppReducer<TState, TReducerState extends TModifedState, TModifedState>
    implements IReducer<TState, TReducerState, TModifedState> {

    // tslint:disable-next-line:variable-name
    protected _name: string;
    private initState: TModifedState;
    private actions: IActionList<TReducerState, TModifedState>;
    /**
     * must be deprecated
     */
    private registeredActions: string[];
    private reducers: Array<IExReducer<any>>;
    private parent: IReducer<TState, any, any>;

    constructor(name: string, initState?: TModifedState) {
        this.initState = initState || {} as any;
        this.actions = {} as any;
        this.registeredActions = [];
        this.reducers = [];
        this._name = name;
        this.parent = {} as any;
    }

    get name() {
        return this._name;
    }

    get path() {
        return `${this.parent.path}.${this._name}`;
    }

    public stateSelector = (state) => this.parent.stateSelector(state)[this._name];

    public setLinkToParent(reducer: IReducer<TState, any, any>) {
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

        if (!this.actions[action.type]) {
            if (this._name === MainReducerName) {
                console.log("Next app state: ", nextState);
            }
            return nextState;
        }

        const { type, payload } = action as IAppAction<any>;
        const nextActionState = this.actions[type](nextState, payload || {});
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

    public on = <TData>({ type }: IAppAction<TData>, state: (state: TReducerState, data: TData) => TModifedState) => {
        this.actions[type] = state;
        this.registeredActions.push(type);
        return this;
    }

    public join = (reducer: IReducer<TState, any, any>) => {
        this.reducers = this.reducers.filter((el) => el.name !== reducer.name);
        reducer.setLinkToParent(this);
        this.reducers.push(reducer);
        return this;
    }

    public joinReducer = <RState>(name: string, reducer: (state: RState, action: any) => RState) => {
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
    extends AppReducer<TState, TState, TModifedState> {

    constructor(initState?: TModifedState) {
        super(MainReducerName, initState);
    }

    get path() {
        return this._name;
    }

    public stateSelector = (state) => state;
}

export function createMainReducer<TState extends TModifedState, TModifedState>(initState?: TModifedState): IReducer<TState, TState, TModifedState> {
    return new MainReducer<TState, TModifedState>(initState);
}
export function createReducer<TParentState, TState extends TModifedState, TModifedState>(name: string, initState?: TState): IReducer<TParentState, TState, TModifedState> {
    return new AppReducer<TParentState, TState, TModifedState>(name, initState);
}
