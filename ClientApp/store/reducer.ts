import { Store } from "react-redux";
import { routerReducer } from "react-router-redux";
import { createRootReducer, LocalListener } from "redux-subreducer";
import { IApplicationState } from "./ApplicationState";
import { reducer as DatabaseReducer } from "./database/reducer";

export let appStore: Store<IApplicationState | undefined>;

export const setStore = (store: Store<IApplicationState | undefined>) => {
    appStore = store;
};

const initalState: Partial<IApplicationState> = {};

export const appReducer =
    createRootReducer<IApplicationState>(initalState)
        .join(DatabaseReducer)
        .joinReducer("routing", routerReducer)
        .joinListener("listener", LocalListener);
