import { ILecturer } from "./Lecturer";

export interface IFaculty extends IType {
    id: string;
    shortName: string;
    deanId: string;
    fullName: string;
    dean: ILecturer;
}

export interface IType {
    id?: string;
    shortName?: string;
    deanId?: string;
    fullName?: string;
    dean?: ILecturer;
}
