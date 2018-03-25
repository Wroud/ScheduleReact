import { createSubReducer } from "@app/middlewares/redux-subreducer";
import { IApplicationState } from "../ApplicationState";
import { Actions } from "./actions";
import { IDatabaseState, ITable } from "./DatabaseState";
import { IFaculty } from "./Faculty";
import { ILecturer } from "./Lecturer";

export const DefaultState: IDatabaseState = {
    faculties: {},
    lecturers: {},
};

export const FacultyReducer = createSubReducer<IDatabaseState, ITable<IFaculty>, ITable<IFaculty>>("faculties");
export const LecturerReducer = createSubReducer<IDatabaseState, ITable<ILecturer>, ITable<ILecturer>>("lecturers");

export const TableReducers = {
    faculties: FacultyReducer,
    lecturers: LecturerReducer,
};

export const Reducer =
    createSubReducer<IApplicationState, IDatabaseState, IDatabaseState>("database", DefaultState)
        .join(LecturerReducer)
        .join(FacultyReducer)
        .on(Actions.update, (state, data) => data);
