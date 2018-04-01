import { createServerRenderer, RenderResult } from "aspnet-prerendering";
import { createMemoryHistory } from "history";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { Switch } from "react-router";
import { StaticRouter } from "react-router-dom";
import { replace } from "react-router-redux";
import sagaMiddlewareFactory from "redux-saga";
import configureStore from "./configureStore";
import { views } from "./loadViews";

export default createServerRenderer(params => {
    return new Promise<RenderResult>((resolve, reject) => {
        const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // remove trailing slash
        const urlAfterBasename = params.url.substring(basename.length);

        const sagaMiddleware = sagaMiddlewareFactory();

        const store = configureStore(createMemoryHistory(), undefined, sagaMiddleware);
        sagaMiddleware.run(views.sagas);
        store.dispatch(replace(urlAfterBasename));

        const routerContext: any = {};
        const app = (
            <Provider store={store}>
                <StaticRouter basename={basename} context={routerContext} location={params.location.path}>
                    <Switch>{views.routes}</Switch>
                </StaticRouter>
            </Provider>
        );
        renderToString(app);

        if (routerContext.url) {
            resolve({ redirectUrl: routerContext.url });
            return;
        }

        params.domainTasks.then(() => {
            resolve({
                html: renderToString(app),
                globals: { initialReduxState: store.getState() },
            });
        }, reject);
    });
});
