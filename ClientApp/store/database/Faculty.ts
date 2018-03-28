import { ILecturer } from "./Lecturer";

export interface IFaculty {
    id: string;
    shortName: string;
    deanId: string;
    fullName: string;
    dean: ILecturer;
}
