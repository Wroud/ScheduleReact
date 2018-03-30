import { ILecturer } from "@app/store/database";

export interface ILecturerFormState {
    loading: boolean;
    editing: boolean;
    lecturer: ILecturer;
}

export interface ILecturersState {
    lecturers: string[];
    form: ILecturerFormState;
    loading: boolean;
}

export const InitLecturerFormState: Partial<ILecturerFormState> = {
    loading: false,
    editing: false,
    lecturer: {
        id: "",
        firstName: "",
        lastName: "",
        secondName: "",
        fullName: "",
        gender: "",
    },
};

export const InitLecturersState: Partial<ILecturersState> = {
    lecturers: [],
    form: InitLecturerFormState as ILecturerFormState,
    loading: true,
};
