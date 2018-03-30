import { createSubReducer } from "@app/middlewares/redux-subreducer";
import { IApplicationState } from "../ApplicationState";
import { actions, tableActions } from "./actions";
import { IDatabaseState, ITable } from "./DatabaseState";
import { facultyTableName, IFaculty } from "./Faculty";
import { ILecturer, lecturerTableName } from "./Lecturer";

const facultyReducer = createSubReducer<IDatabaseState, ITable<IFaculty>>(facultyTableName)
    .on(tableActions[facultyTableName].update, (state, data) => data as ITable<IFaculty>);

const lecturerReducer = createSubReducer<IDatabaseState, ITable<ILecturer>>(lecturerTableName)
    .on(tableActions[lecturerTableName].update, (state, data) => data as ITable<ILecturer>);

export const tableReducers = {
    [facultyTableName]: facultyReducer,
    [lecturerTableName]: lecturerReducer,
};

export const defaultState: IDatabaseState = {
    [facultyTableName]: {},
    [lecturerTableName]: {},
};

export const reducer =
    createSubReducer<IApplicationState, IDatabaseState>("database", defaultState)
        .join(lecturerReducer)
        .join(facultyReducer)
        .on(actions.update, (state, data) => data);
