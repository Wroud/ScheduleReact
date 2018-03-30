import { ILecturer } from "./Lecturer";
export const facultyTableName = "faculties";
export interface IFaculty {
    id: string;
    shortName: string;
    deanId: string;
    fullName: string;
    dean: ILecturer;
}
