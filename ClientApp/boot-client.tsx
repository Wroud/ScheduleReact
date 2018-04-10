import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import sagaMiddlewareFactory from "redux-saga";
import configureStore from "./configureStore";
import * as ViewsLoader from "./loadViews";
import "./styles/style.scss";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href")!;
const history = createBrowserHistory({ basename: baseUrl });

const sagaMiddleware = sagaMiddlewareFactory();

const initialState = (window as any).initialReduxState;
const store = configureStore(history, initialState, sagaMiddleware);

let appViews = ViewsLoader.views;
let sagaTask = sagaMiddleware.run(appViews.sagas);

function renderApp() {
    ReactDOM.hydrate(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}><Switch>{appViews.routes}</Switch></ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById("react-app"),
    );
}

renderApp();

if (module.hot) {
    module.hot.accept("./loadViews", () => {
        appViews = require<typeof ViewsLoader>("./loadViews").views;
        sagaTask.cancel();
        sagaTask = sagaMiddleware.run(appViews.sagas);
        renderApp();
    });
}
