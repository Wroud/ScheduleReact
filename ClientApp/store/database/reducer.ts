import { createSubReducer } from "@app/middlewares/redux-subreducer";
import { IApplicationState } from "../ApplicationState";
import { Actions, TableActions } from "./actions";
import { IDatabaseState, ITable } from "./DatabaseState";
import { IFaculty } from "./Faculty";
import { ILecturer } from "./Lecturer";

const FacultyReducer = createSubReducer<IDatabaseState, ITable<IFaculty>>("faculties")
    .on(TableActions.update, (state, data) => data as ITable<IFaculty>);

const LecturerReducer = createSubReducer<IDatabaseState, ITable<ILecturer>>("lecturers")
    .on(TableActions.update, (state, data) => data as ITable<ILecturer>);

export const TableReducers = {
    faculties: FacultyReducer,
    lecturers: LecturerReducer,
};

export const DefaultState: IDatabaseState = {
    faculties: {},
    lecturers: {},
};

export const Reducer =
    createSubReducer<IApplicationState, IDatabaseState>("database", DefaultState)
        .join(LecturerReducer)
        .join(FacultyReducer)
        .on(Actions.update, (state, data) => data);
