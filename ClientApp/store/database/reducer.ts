import { createSubReducer } from "@app/middlewares/redux-subreducer";
import { IApplicationState } from "../ApplicationState";
import { Actions, TableActions } from "./actions";
import { IDatabaseState, ITable } from "./DatabaseState";
import { FacultyTableName, IFaculty } from "./Faculty";
import { ILecturer, LecturerTableName } from "./Lecturer";

const FacultyReducer = createSubReducer<IDatabaseState, ITable<IFaculty>>(FacultyTableName)
    .on(TableActions[FacultyTableName].update, (state, data) => data as ITable<IFaculty>);

const LecturerReducer = createSubReducer<IDatabaseState, ITable<ILecturer>>(LecturerTableName)
    .on(TableActions[LecturerTableName].update, (state, data) => data as ITable<ILecturer>);

export const TableReducers = {
    [FacultyTableName]: FacultyReducer,
    [LecturerTableName]: LecturerReducer,
};

export const DefaultState: IDatabaseState = {
    [FacultyTableName]: {},
    [LecturerTableName]: {},
};

export const Reducer =
    createSubReducer<IApplicationState, IDatabaseState>("database", DefaultState)
        .join(LecturerReducer)
        .join(FacultyReducer)
        .on(Actions.update, (state, data) => data);
