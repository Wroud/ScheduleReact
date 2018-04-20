import { IApplicationState } from "@app/store";
import { ILecturer, selectFromTable } from "@app/store/database";
import { createSelector } from "reselect";
import { lecturerFormReducer, lecturersReducer } from "../reducers";

export const getLecturersState = (state: IApplicationState) => lecturersReducer.stateSelector(state);
export const getLecturerLoading = (state: IApplicationState) => lecturersReducer.stateSelector(state).isLoading;
export const getLecturers = (state: IApplicationState) => lecturersReducer.stateSelector(state).lecturers;

export const getLecturerForm = (state: IApplicationState) => lecturerFormReducer.stateSelector(state);
export const getLecturer = (state: IApplicationState) => {
    const lecturer = lecturerFormReducer.stateSelector(state).lecturer;
    return { ...lecturer, gender: "" + lecturer.gender };
};
export const getLecturerFormLoading = (state: IApplicationState) => lecturerFormReducer.stateSelector(state).isLoading;
export const getLecturerFormEditing = (state: IApplicationState) => lecturerFormReducer.stateSelector(state).isEditing;
// export const getLecturerForm = (state: IApplicationState) => getLecturers(state).form;
// export const getLecturerList = (state: IApplicationState) => getLecturers(state).lecturers;

export const makeGetLecturer = () => {
    return createSelector(
        selectFromTable(db => db.lecturers, (id: string) => id),
        (lecturer): ILecturer => ({ ...lecturer }),
    );
};
