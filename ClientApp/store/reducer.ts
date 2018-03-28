import { createMainReducer } from "@app/middlewares/redux-subreducer";
import { Store } from "react-redux";
import { routerReducer } from "react-router-redux";
import { IApplicationState } from "./ApplicationState";
import { Reducer as DatabaseReducer } from "./database/reducer";

export let AppStore: Store<IApplicationState | undefined>;

export const setStore = (store: Store<IApplicationState | undefined>) => {
    AppStore = store;
};

const InitalState: Partial<IApplicationState> = {};

export const AppReducer =
    createMainReducer<IApplicationState>(InitalState)
        .join(DatabaseReducer)
        .joinReducer("routing", routerReducer);
