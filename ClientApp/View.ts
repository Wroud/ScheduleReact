import { RouteComponentProps } from "react-router";
import { SagaIterator } from "redux-saga";
import { ISubReducer } from "redux-subreducer";
import { INavigationMember } from "./Navigation";
import { ViewLoader } from "./ViewLoader";

export interface IViewState {
    [key: string]: any;
}

export interface IViewStatePart {
    view: IViewState;
}

export interface IView<TAppState
    extends IViewStatePart, TReducerState, TApi> {

    name: string;
    loader: ViewLoader<TAppState>;
    sagas?: () => SagaIterator;
    api?: TApi;
    reducer?: ISubReducer<IViewState, TReducerState>;
}

export class View<TAppState extends IViewStatePart, TReducerState, TApi>
    implements IView<TAppState, TReducerState, TApi> {

    loader: ViewLoader<TAppState>;
    // tslint:disable-next-line:variable-name
    private _name: string;
    // tslint:disable-next-line:variable-name
    private _navigation?: INavigationMember[];
    // tslint:disable-next-line:variable-name
    private _reducer?: ISubReducer<IViewState, TReducerState>;
    // tslint:disable-next-line:variable-name
    private _sagas?: () => SagaIterator;
    // tslint:disable-next-line:variable-name
    private _api?: TApi;

    constructor(
        name: string,
        navigation?: INavigationMember[],
        reducer?: ISubReducer<IViewState, TReducerState>,
        sagas?: () => SagaIterator,
        api?: TApi) {

        this._name = name;
        this._navigation = navigation;
        this._reducer = reducer;
        this._sagas = sagas;
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

    get sagas() {
        return this._sagas;
    }

    stateSelector = (state: TAppState): TReducerState => {
        if (!this.reducer) {
            throw new Error("stateSelector reducer is undefined");
            // return {} as any;
        }
        return this.reducer.stateSelector(state);
    }

    Api = (api: any): TApi => api[`${this.name}Api`];
}

export const createView = <TReducerState extends TReducerStateModifed, TAppState extends IViewStatePart, TReducerStateModifed, TApi= {}>(name: string, navigation?: INavigationMember[], reducer?: ISubReducer<IViewState, TReducerState>, sagas?: () => SagaIterator, api?: TApi) => new View<TAppState, TReducerState, TApi>(name, navigation, reducer, sagas, api);
