import { History } from "history";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore, GenericStoreEnhancer, StoreEnhancerStoreCreator } from "redux";
import { SagaMiddleware } from "redux-saga";
import thunk from "redux-thunk";
import { IApplicationState, reducer } from "./store";

export default function configureStore(history: History, initialState?: IApplicationState, sagaMiddleware?: SagaMiddleware<{}>) {
    const windowIfDefined = typeof window === "undefined" ? null : window as any;
    const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension as () => GenericStoreEnhancer;

    const middlewares = compose<any>(
        applyMiddleware(thunk, routerMiddleware(history)),
        sagaMiddleware ? applyMiddleware(sagaMiddleware) : <S>(next: StoreEnhancerStoreCreator<S>) => next,
        devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next,
    );

    const store = createStore<IApplicationState>(reducer.appReducer.reducer, initialState as any, middlewares);

    if (module.hot) {
        module.hot.accept("./store/reducer", () => {
            const nextRootReducer = require<typeof reducer>("./store/reducer").appReducer.reducer;
            store.replaceReducer(nextRootReducer);
        });
    }

    reducer.setStore(store);
    return store;
}
