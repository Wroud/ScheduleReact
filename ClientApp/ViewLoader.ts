import { createSubReducer, ISubReducer } from "@app/middlewares/redux-subreducer";
import { SagaIterator } from "redux-saga";
import { IView, IViewState, IViewStatePart, View } from "./View";
import { IViewRoute, mapRoutes } from "./ViewRoutes";

type SagaGetter = () => SagaIterator;

export interface IViewLoader<TAppState> {
    reducer: ISubReducer<TAppState, IViewState>;
    views: ({ [key: string]: IView<any, any, any> });
    api: ({ [key: string]: any });
    routes: JSX.Element[];

    sagas: () => SagaIterator;
    getView: <TReducerState extends TReducerStateModifed, TState extends IViewStatePart, TReducerStateModifed = {}, TApi = {}>(name: string) => IView<TState, TReducerState, TApi>;
    joinToReducer: (reducer: ISubReducer<TAppState, any>) => this;
    load: () => this;
}

export class ViewLoader<TAppState extends IViewStatePart>
    implements IViewLoader<TAppState> {

    private _reducer: ISubReducer<TAppState, IViewState>;
    private _views: ({ [key: string]: IView<any, any, any> });
    private _api: ({ [key: string]: any });
    private _routes: JSX.Element[];
    private _sagas: SagaGetter[];

    constructor() {
        this._reducer = createSubReducer<TAppState, IViewState>("view");
        this._views = {};
        this._api = {};
        this._routes = [];
        this._sagas = [];

        this.sagas = this.sagas.bind(this);
    }

    get views() {
        return this._views;
    }

    get reducer() {
        return this._reducer;
    }

    get api() {
        return this._api;
    }

    get routes() {
        return this._routes;
    }

    *sagas() {
        for (const saga of this._sagas) {
            yield* saga();
            // for (const effect of saga()) {
            //     yield effect;
            // }
        }
    }

    joinToReducer = (reducer: ISubReducer<TAppState, any>) => {
        reducer.join(this._reducer);
        return this;
    }

    getView = (view: string) => {
        console.log(this);
        return this._views[view];
    }

    load = () => {
        const routeLoader = require.context("./Views/", true, /^\.\/[^\/]+\/routes.ts$/);
        routeLoader.keys().forEach(el => {
            const routes = mapRoutes(routeLoader<any>(el).routes as IViewRoute[]);
            this._routes.push(routes);
        });

        const context = require.context("./Views/", true, /^\.\/[^\/]+\/view.ts$/);
        context.keys().forEach(el => {
            const view = context<any>(el).view as View<TAppState, any, any>;

            if (!view) {
                return;
            }

            view.loader = this;

            this._views = {
                ...this._views,
                [view.name]: view,
            };

            if (view.sagas) {
                this._sagas.push(view.sagas);
            }

            if (view.api) {
                this._api = {
                    ...this._api,
                    [`${view.name}Api`]: view.api,
                };
            }

            if (view.reducer) {
                this._reducer.join(view.reducer);
            }

            console.log("Loaded View: ", view);
        });
        return this;
    }
}

export const loadViews = <TState extends IViewStatePart>(): IViewLoader<TState> => new ViewLoader<TState>();
