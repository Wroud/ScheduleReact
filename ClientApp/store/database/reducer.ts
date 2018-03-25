import { IApplicationState } from "../ApplicationState";
import { createReducer } from "../AppReducer";
import { Actions } from "./actions";
import { IDatabaseState, ITable } from "./DatabaseState";
import { IFaculty } from "./Faculty";
import { ILecturer } from "./Lecturer";

export const FacultyReducer = createReducer<IApplicationState, ITable<IFaculty>, ITable<IFaculty>>("faculties");
export const LecturerReducer = createReducer<IApplicationState, ITable<ILecturer>, ITable<ILecturer>>("lecturers");

export const TableReducers = {
    faculties: FacultyReducer,
    lecturers: LecturerReducer,
};

export const DefaultState: IDatabaseState = {
    faculties: {},
    lecturers: {},
};

export const Reducer =
    createReducer<IApplicationState, IDatabaseState, IDatabaseState>("database", DefaultState)
        .join(LecturerReducer)
        .join(FacultyReducer)
        .on(Actions.update, (state, data) => data);
