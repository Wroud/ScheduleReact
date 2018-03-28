import {
    createAction,
    createActions,
    createPayloadAction,
    getActionCreator,
    getCreators,
    getPayloadCreator,
    mapActionsToProps,
} from "@app/middlewares/redux-subreducer";

const from = "Views/Dashboard";

export const actions = {
    load: createAction("Loading Lecturers", from),
    update: createPayloadAction<string[]>("Update Lecturers", from),
    loadFinish: createAction("Loading Lecturers Finished", from),
};

export const actionCreators = createActions(getCreators(actions));
export const actopnsMap = mapActionsToProps(actionCreators);
