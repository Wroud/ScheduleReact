import { ILecturer } from "@app/store/database";
import { createAction, createPayloadAction, prepareActions } from "redux-subreducer";

const from = "Views/Dashboard";

export const { actions, creators, mapDispatch, mapCreators } = prepareActions({
    drawer: {
        switchDrawer: createAction("Switch Drawer", from),
    },
});
