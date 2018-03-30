import { createPayloadAction, getCreators } from "@app/middlewares/redux-subreducer";
import { IDatabaseState, ITable, Tables } from "./DatabaseState";
import { FacultyTableName } from "./Faculty";
import { LecturerTableName } from "./Lecturer";

const from = "Database";

export const TableActions = {
    [LecturerTableName]: {
        update: createPayloadAction<ITable<Tables>>("Update database table", from),
    },
    [FacultyTableName]: {
        update: createPayloadAction<ITable<Tables>>("Update database table", from),
    },
};

export const TableActionsCreators = {
    [LecturerTableName]: getCreators(TableActions[LecturerTableName]),
    [FacultyTableName]: getCreators(TableActions[FacultyTableName]),
};

export const Actions = {
    update: createPayloadAction<IDatabaseState>("Update Database", from),
};

export const ActionsCreators = getCreators(Actions);
