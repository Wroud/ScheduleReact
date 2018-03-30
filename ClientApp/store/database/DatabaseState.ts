import { facultyTableName, IFaculty } from "./Faculty";
import { ILecturer, lecturerTableName } from "./Lecturer";

export type Tables = ILecturer | IFaculty;

export interface ITable<T> {
    [id: string]: T;
}

export interface IDatabaseState {
    [lecturerTableName]: ITable<ILecturer>;
    [facultyTableName]: ITable<IFaculty>;
}
