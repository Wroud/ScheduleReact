import { History } from "history";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore, GenericStoreEnhancer, StoreEnhancerStoreCreator } from "redux";
import thunk from "redux-thunk";
import { IApplicationState, Reducer } from "./store";

export default function configureStore(history: History, initialState?: IApplicationState) {
    const windowIfDefined = typeof window === "undefined" ? null : window as any;
    const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension as () => GenericStoreEnhancer;

    const middlewares = compose<any>(
        applyMiddleware(thunk, routerMiddleware(history)),
        devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next,
    );

    const store = createStore<IApplicationState>(Reducer.AppReducer.reducer, initialState as any, middlewares);

    if (module.hot) {
        module.hot.accept("./store/reducer", () => {
            const nextRootReducer = require<any>("./store/reducer").AppReducer.reducer;
            store.replaceReducer(nextRootReducer);
        });
    }

    Reducer.setStore(store);
    return store;
}
