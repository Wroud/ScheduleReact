import { AppReducer, createReducer, IReducer } from "./store/AppReducer";
import { IView, IViewState, View } from "./View";
import { IViewRoute, mapRoutes } from "./ViewRoutes";

export interface IViewLoader<TAppState> {
    Reducer: IReducer<TAppState, IViewState, IViewState>;
    Views: ({ [key: string]: IView<any, any, any, any> });
    Api: ({ [key: string]: any });
    Routes: JSX.Element[];

    getView: <TReducerState extends TReducerStateModifed, TState = {}, TReducerStateModifed = {}, TApi = {}>(name: string) => IView<TState, TReducerState, TReducerStateModifed, TApi>;
    joinToReducer: (reducer: IReducer<TAppState, any, any>) => this;
    load: () => this;
}

export class ViewLoader<TAppState> implements IViewLoader<TAppState> {
    private reducer: IReducer<TAppState, IViewState, IViewState>;
    private views: ({ [key: string]: IView<any, any, any, any> });
    private api: ({ [key: string]: any });
    private routes: JSX.Element[];

    constructor() {
        this.reducer = createReducer<TAppState, IViewState, IViewState>("view");
        this.views = {};
        this.api = {};
        this.routes = [];
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

    public joinToReducer = (reducer: IReducer<TAppState, any, any>) => {
        reducer.join(this.reducer);
        return this;
    }

    public getView = (view: string) => {
        console.log(this);
        return this.views[view];
    }

    public load = () => {
        // var loader = require.context("./Views/", true, /^\.\/[^\/]+\/loader.tsx$/);
        // loader.keys().forEach(el => {
        //    var load = loader<any>(el).View as any;
        //    load.View = this;
        // });

        const routeLoader = require.context("./Views/", true, /^\.\/[^\/]+\/routes.ts$/);
        routeLoader.keys().forEach((el) => {
            const routes = mapRoutes(routeLoader<any>(el).Routes as IViewRoute[]);
            this.routes.push(routes);
        });

        const context = require.context("./Views/", true, /^\.\/[^\/]+\/module.ts$/);
        context.keys().forEach((el) => {
            const view = context<any>(el).default as View<TAppState, any, any, any>;

            if (!view) {
                return;
            }

            view.loader = this;

            this.views = {
                ...this.views,
                [view.name]: view,
            };

            if (view.api) {
                this.api = {
                    ...this.api,
                    [`${view.name}Api`]: view.api,
                };
            }

            if (view.reducer) {
                this.reducer.join(view.reducer);
            }

            console.log("View: ", view);
        });
        return this;
    }
}

export const loadViews = <TState>(): IViewLoader<TState> => new ViewLoader<TState>();
