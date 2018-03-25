import { RouteComponentProps } from "react-router";
import { INavigationMember } from "./Navigation";
import { AppReducer, createReducer, IReducer } from "./store/AppReducer";
import { ViewLoader } from "./ViewLoader";

export interface IViewState {
    [key: string]: any;
}

export interface IView<TAppState, TReducerState extends TReducerStateModifed, TReducerStateModifed, TApi> {
    name: string;
    loader: ViewLoader<TAppState>;
    api?: TApi;
    reducer?: IReducer<any, TReducerState, TReducerStateModifed>;
}

export class View<TAppState, TReducerState extends TReducerStateModifed, TReducerStateModifed, TApi> implements IView<TAppState, TReducerState, TReducerStateModifed, TApi> {
    public loader: ViewLoader<TAppState>;
    // tslint:disable-next-line:variable-name
    private _name: string;
    // tslint:disable-next-line:variable-name
    private _navigation?: INavigationMember[];
    // tslint:disable-next-line:variable-name
    private _reducer?: IReducer<TAppState, TReducerState, TReducerStateModifed>;
    // tslint:disable-next-line:variable-name
    private _api?: TApi;

    constructor(name: string, navigation?: INavigationMember[], reducer?: IReducer<TAppState, TReducerState, TReducerStateModifed>, api?: TApi) {
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

export const createView = <TReducerState extends TReducerStateModifed, TAppState, TReducerStateModifed, TApi= {}>(name: string, navigation?: INavigationMember[], reducer?: IReducer<TAppState, TReducerState, TReducerStateModifed>, api?: TApi) => new View<TAppState, TReducerState, TReducerStateModifed, TApi>(name, navigation, reducer, api);
