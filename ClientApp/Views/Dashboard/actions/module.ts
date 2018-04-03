import { createAction, createPayloadAction, prepareActions } from "@app/middlewares/redux-subreducer";
import { ILecturer } from "@app/store/database";

const from = "Views/Dashboard";

export const { actions, creators, mapDispatch, mapCreators } = prepareActions({
    drawer: {
        switchDrawer: createAction("Switch Drawer", from),
    },
});
