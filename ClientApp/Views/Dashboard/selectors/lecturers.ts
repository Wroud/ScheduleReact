import { IApplicationState } from "@app/store";
import { ILecturer, SelectFromTable } from "@app/store/database";
import { createSelector } from "reselect";
import { lecturerFormReducer, lecturersReducer } from "../reducers";

export const getLecturersState = (state: IApplicationState) => lecturersReducer.stateSelector(state);
export const getLecturers = (state: IApplicationState) => lecturersReducer.stateSelector(state).lecturers;
export const getLecturerForm = (state: IApplicationState) => lecturerFormReducer.stateSelector(state);
export const getLecturer = (state: IApplicationState) => getLecturerForm(state).lecturer;
// export const getLecturerForm = (state: IApplicationState) => getLecturers(state).form;
// export const getLecturerList = (state: IApplicationState) => getLecturers(state).lecturers;

export const makeGetLecturer = () => {
    return createSelector(
        SelectFromTable(db => db.lecturers, (id: string) => id),
        (lecturer): ILecturer => ({ ...lecturer }),
    );
};
