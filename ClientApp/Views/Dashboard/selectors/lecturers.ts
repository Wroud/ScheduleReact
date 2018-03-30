import { IApplicationState } from "@app/store";
import { ILecturer, SelectFromTable } from "@app/store/database";
import { createSelector } from "reselect";
import { lecturersReducer } from "../reducers";

export const getLecturers = (state: IApplicationState) => lecturersReducer.stateSelector(state).lecturers;
// export const getLecturerForm = (state: IApplicationState) => getLecturers(state).form;
// export const getLecturerList = (state: IApplicationState) => getLecturers(state).lecturers;

export const makeGetLecturer = () => {
    return createSelector(
        SelectFromTable((db) => db.lecturers, (id: string) => id),
        (lecturer): ILecturer => ({ ...lecturer }),
    );
};
