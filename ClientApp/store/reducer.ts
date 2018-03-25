import { createMainReducer } from "@app/middlewares/redux-subreducer";
import { Store } from "react-redux";
import { routerReducer } from "react-router-redux";
import { IApplicationState, IApplicationStateModifed } from "./ApplicationState";
import * as Database from "./database";

export let AppStore: Store<IApplicationState | undefined>;

export const setStore = (store: Store<IApplicationState | undefined>) => {
    AppStore = store;
};

const InitalState: IApplicationStateModifed = {
    testCount: 0,
};

export const AppReducer =
    createMainReducer<IApplicationState, IApplicationStateModifed>(InitalState)
        .join(Database.Reducer)
        .joinReducer("routing", routerReducer);
