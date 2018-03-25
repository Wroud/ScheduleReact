import * as Faculty from "./Faculty";
import * as Lecturer from "./Lecturer";

export type Tables = Lecturer.ILecturer | Faculty.IFaculty;

export interface ITable<T> {
    [id: string]: T;
}

export interface IDatabaseState {
    lecturers: ITable<Lecturer.ILecturer>;
    faculties: ITable<Faculty.IFaculty>;
}
