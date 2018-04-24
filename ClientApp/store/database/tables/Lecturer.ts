export const lecturerTableName = "lecturers";
export interface ILecturer {
    id: string;
    firstName: string;
    lastName: string;
    secondName: string;
    fullName: string;
    gender: string;
}
export const defaultLecturer: ILecturer = {
    id: "",
    firstName: "",
    lastName: "",
    secondName: "",
    fullName: "",
    gender: "0",
};
