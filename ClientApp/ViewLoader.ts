import { createSubReducer, ISubReducer } from "@app/middlewares/redux-subreducer";
import { SagaIterator } from "redux-saga";
import { IView, IViewState, IViewStatePart, View } from "./View";
import { IViewRoute, mapRoutes } from "./ViewRoutes";

type SagaGetter = () => SagaIterator;

export interface IViewLoader<TAppState> {
    Reducer: ISubReducer<TAppState, IViewState>;
    Views: ({ [key: string]: IView<any, any, any> });
    Api: ({ [key: string]: any });
    Routes: JSX.Element[];

    Sagas: () => SagaIterator;
    getView: <TReducerState extends TReducerStateModifed, TState extends IViewStatePart, TReducerStateModifed = {}, TApi = {}>(name: string) => IView<TState, TReducerState, TApi>;
    joinToReducer: (reducer: ISubReducer<TAppState, any>) => this;
    load: () => this;
}

export class ViewLoader<TAppState extends IViewStatePart> implements IViewLoader<TAppState> {
    private reducer: ISubReducer<TAppState, IViewState>;
    private views: ({ [key: string]: IView<any, any, any> });
    private api: ({ [key: string]: any });
    private routes: JSX.Element[];
    private sagas: SagaGetter[];

    constructor() {
        this.reducer = createSubReducer<TAppState, IViewState>("view");
        this.views = {};
        this.api = {};
        this.routes = [];
        this.sagas = [];

        this.Sagas = this.Sagas.bind(this);
    }

    get Views() {
        return this.views;
    }

    get Reducer() {
        return this.reducer;
    }

    get Api() {
        return this.api;
    }

    get Routes() {
        return this.routes;
    }

    public *Sagas() {
        for (const saga of this.sagas) {
            for (const effect of saga()) {
                yield effect;
            }
        }
    }

    public joinToReducer = (reducer: ISubReducer<TAppState, any>) => {
        reducer.join(this.reducer);
        return this;
    }

    public getView = (view: string) => {
        console.log(this);
        return this.views[view];
    }

    public load = () => {
        const routeLoader = require.context("./Views/", true, /^\.\/[^\/]+\/routes.ts$/);
        routeLoader.keys().forEach((el) => {
            const routes = mapRoutes(routeLoader<any>(el).Routes as IViewRoute[]);
            this.routes.push(routes);
        });

        const context = require.context("./Views/", true, /^\.\/[^\/]+\/module.ts$/);
        context.keys().forEach((el) => {
            const view = context<any>(el).default as View<TAppState, any, any>;

            if (!view) {
                return;
            }

            view.loader = this;

            this.views = {
                ...this.views,
                [view.name]: view,
            };

            if (view.sagas) {
                this.sagas.push(view.sagas);
            }

            if (view.api) {
                this.api = {
                    ...this.api,
                    [`${view.name}Api`]: view.api,
                };
            }

            if (view.reducer) {
                this.reducer.join(view.reducer);
            }

            console.log("Loaded View: ", view);
        });
        return this;
    }
}

export const loadViews = <TState extends IViewStatePart>(): IViewLoader<TState> => new ViewLoader<TState>();
