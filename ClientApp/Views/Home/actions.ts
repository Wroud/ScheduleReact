import { createAction, getActionCreator } from "@app/middlewares/redux-subreducer";
import { Action } from "redux";
import * as Store from "./Store";

export const actions = {
    increment: createAction("Increment", "Views/Home"),
    decrement: createAction("Decrement", "Views/Home"),
};

export const actionCreators = {
    increment: getActionCreator(actions.increment),
    decrement: getActionCreator(actions.decrement),
};
