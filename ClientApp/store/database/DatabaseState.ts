import { FacultyTableName, IFaculty } from "./Faculty";
import { ILecturer, LecturerTableName } from "./Lecturer";

export type Tables = ILecturer | IFaculty;

export interface ITable<T> {
    [id: string]: T;
}

export interface IDatabaseState {
    [LecturerTableName]: ITable<ILecturer>;
    [FacultyTableName]: ITable<IFaculty>;
}
