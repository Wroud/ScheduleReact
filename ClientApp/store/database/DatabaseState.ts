import { facultyTableName, IFaculty } from "./tables/Faculty";
import { ILecturer, lecturerTableName } from "./tables/Lecturer";

export type Tables = ILecturer | IFaculty;

export interface ITable<T> {
    [id: string]: T;
}

export interface IDatabaseState {
    [lecturerTableName]: ITable<ILecturer>;
    [facultyTableName]: ITable<IFaculty>;
}
