import { createAction, getActionCreator } from "@app/middlewares/redux-subreducer";

export const actions = {
    increment: createAction("Increment", "Dashboard/Home"),
    decrement: createAction("Decrement", "Dashboard/Home"),
};

export const actionCreators = {
    increment: getActionCreator(actions.increment),
    decrement: getActionCreator(actions.decrement),
};
