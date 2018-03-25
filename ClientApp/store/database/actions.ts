
import { createPayloadAction } from "@app/middlewares/redux-subreducer";
import { IDatabaseState } from "./DatabaseState";

export const Actions = {
    update: createPayloadAction<IDatabaseState>(),
};

export const ActionsCreators = {
    update: (data: IDatabaseState) => ({
        ...createPayloadAction<IDatabaseState>(),
        data,
    }),
};
