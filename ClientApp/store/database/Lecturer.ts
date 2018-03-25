export interface ILecturer extends IType {
    id: string;
    firstName: string;
    lastName: string;
    secondName: string;
    fullName: string;
    gender: string;
}

export interface IType {
    id?: string;
    firstName?: string;
    lastName?: string;
    secondName?: string;
    fullName?: string;
    gender?: string;
}
