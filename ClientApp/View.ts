import { ISubReducer } from "@app/middlewares/redux-subreducer";
import { RouteComponentProps } from "react-router";
import { INavigationMember } from "./Navigation";
import { ViewLoader } from "./ViewLoader";

export interface IViewState {
    [key: string]: any;
}

export interface IViewStatePart {
    view: IViewState;
}

export interface IView<TAppState extends IViewStatePart, TReducerState extends TReducerStateModifed, TReducerStateModifed, TApi> {
    name: string;
    loader: ViewLoader<TAppState>;
    api?: TApi;
    reducer?: ISubReducer<TAppState, TReducerState, TReducerStateModifed>;
}

export class View<TAppState extends IViewStatePart, TReducerState extends TReducerStateModifed, TReducerStateModifed, TApi> implements IView<TAppState, TReducerState, TReducerStateModifed, TApi> {
    public loader: ViewLoader<TAppState>;
    // tslint:disable-next-line:variable-name
    private _name: string;
    // tslint:disable-next-line:variable-name
    private _navigation?: INavigationMember[];
    // tslint:disable-next-line:variable-name
    private _reducer?: ISubReducer<TAppState, TReducerState, TReducerStateModifed>;
    // tslint:disable-next-line:variable-name
    private _api?: TApi;

    constructor(name: string, navigation?: INavigationMember[], reducer?: ISubReducer<TAppState, TReducerState, TReducerStateModifed>, api?: TApi) {
        this._name = name;
        this._navigation = navigation;
        this._reducer = reducer;
        this._api = api;
        this.loader = {} as any;
    }

    get name() {
        return this._name;
    }

    get navigation() {
        return this._navigation || [];
    }

    get reducer() {
        return this._reducer;
    }

    get api() {
        return this._api;
    }

    public stateSelector = (state: TAppState): TReducerState => {
        if (!this.reducer) {
            throw new Error("stateSelector reducer is undefined");
            // return {} as any;
        }
        return this.reducer.stateSelector(state) as TReducerState;
    }

    public Api = (api: any): TApi => api[`${this.name}Api`];
}

export const createView = <TReducerState extends TReducerStateModifed, TAppState extends IViewStatePart, TReducerStateModifed, TApi= {}>(name: string, navigation?: INavigationMember[], reducer?: ISubReducer<TAppState, TReducerState, TReducerStateModifed>, api?: TApi) => new View<TAppState, TReducerState, TReducerStateModifed, TApi>(name, navigation, reducer, api);
