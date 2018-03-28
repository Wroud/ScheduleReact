import { ILecturer } from "./Lecturer";
export const FacultyTableName = "faculties";
export interface IFaculty {
    id: string;
    shortName: string;
    deanId: string;
    fullName: string;
    dean: ILecturer;
}
