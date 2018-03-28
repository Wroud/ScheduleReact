
import {
    createActions,
    createPayloadAction,
    getCreators,
    getPayloadCreator,
} from "@app/middlewares/redux-subreducer";
import { IDatabaseState, ITable, Tables } from "./DatabaseState";
import { ILecturer } from "./Lecturer";

const from = "Database";

export const TableActions = {
    update: createPayloadAction<ITable<Tables>>("Update database table", from),
};

export const TableActionsCreators = getCreators(TableActions);

export const Actions = {
    update: createPayloadAction<IDatabaseState>("Update Database", from),
};

export const ActionsCreators = getCreators(Actions);
