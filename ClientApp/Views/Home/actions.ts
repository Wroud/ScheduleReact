import { createAction, createDataAction, getCreator, getDataCreator } from "@app/store/AppAction";
import { Action } from "redux";
import * as Store from "./Store";

export const actions = {
    increment: createAction("Increment", "Views/Home"),
    decrement: createAction("Decrement", "Views/Home"),
};

export const actionCreators = {
    increment: getCreator(actions.increment),
    decrement: getCreator(actions.decrement),
};
