import { createDataAction } from "../AppAction";
import { IDatabaseState } from "./DatabaseState";

export const Actions = {
    update: createDataAction<IDatabaseState>(),
};

export const ActionsCreators = {
    update: (data: IDatabaseState) => ({
        ...createDataAction<IDatabaseState>(),
        data,
    }),
};
