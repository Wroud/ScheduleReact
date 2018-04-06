import { createSubReducer } from "redux-subreducer";
import { IApplicationState } from "../ApplicationState";
import { actions, tableActions } from "./actions";
import { IDatabaseState, ITable } from "./DatabaseState";
import { facultyTableName, IFaculty } from "./tables/Faculty";
import { ILecturer, lecturerTableName } from "./tables/Lecturer";

const facultyActions = tableActions[facultyTableName];
const lecturerActions = tableActions[lecturerTableName];

const updateNormalizedData = (state, data) => data;

const facultyReducer =
    createSubReducer<IDatabaseState, ITable<IFaculty>>(facultyTableName)
        .on(facultyActions.update, updateNormalizedData);

const lecturerReducer =
    createSubReducer<IDatabaseState, ITable<ILecturer>>(lecturerTableName)
        .on(lecturerActions.update, updateNormalizedData);

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

        .on(actions.update, updateNormalizedData);
