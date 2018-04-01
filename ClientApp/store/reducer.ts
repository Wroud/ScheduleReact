import { createMainReducer, LocalListener } from "@app/middlewares/redux-subreducer";
import { Store } from "react-redux";
import { routerReducer } from "react-router-redux";
import { IApplicationState } from "./ApplicationState";
import { reducer as DatabaseReducer } from "./database/reducer";

export let appStore: Store<IApplicationState | undefined>;

export const setStore = (store: Store<IApplicationState | undefined>) => {
    appStore = store;
};

const initalState: Partial<IApplicationState> = {};

export const appReducer =
    createMainReducer<IApplicationState>(initalState)
        .join(DatabaseReducer)
        .joinReducer("routing", routerReducer)
        .joinListener("listener", LocalListener);
