import { IApplicationState } from "@app/store";
import { SelectFromTable } from "@app/store/database/DbSet";
import { ILecturer } from "@app/store/database/Lecturer";
import { createSelector } from "reselect";
import { LecturersReducer } from "../configureReducer";

export const getLecturers = (state: IApplicationState) => LecturersReducer.stateSelector(state).lecturers;
// export const getLecturerForm = (state: IApplicationState) => getLecturers(state).form;
// export const getLecturerList = (state: IApplicationState) => getLecturers(state).lecturers;

export const makeGetLecturer = () => {
    return createSelector(
        SelectFromTable((db) => db.lecturers, (id: string) => id),
        (lecturer) => ({ ...lecturer }),
    );
};
