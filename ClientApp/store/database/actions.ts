import { createPayloadAction, getCreators } from "@app/middlewares/redux-subreducer";
import { IDatabaseState, ITable, Tables } from "./DatabaseState";
import { facultyTableName } from "./tables/Faculty";
import { lecturerTableName } from "./tables/Lecturer";

const from = "Database";

export const tableActions = {
    [lecturerTableName]: {
        update: createPayloadAction<ITable<Tables>>("Update database table", from),
    },
    [facultyTableName]: {
        update: createPayloadAction<ITable<Tables>>("Update database table", from),
    },
};

export const tableActionsCreators = {
    [lecturerTableName]: getCreators(tableActions[lecturerTableName]),
    [facultyTableName]: getCreators(tableActions[facultyTableName]),
};

export const actions = {
    update: createPayloadAction<IDatabaseState>("Update Database", from),
};

export const actionsCreators = getCreators(actions);
