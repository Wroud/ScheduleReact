import { ILecturer } from "@app/store/database";

export interface ILecturerFormState {
    isLoading: boolean;
    isEditing: boolean;
    lecturer: ILecturer;
}

export interface ILecturersState {
    isLoading: boolean;
    lecturers: string[];
    form: ILecturerFormState;
}

export const initLecturerFormState: Partial<ILecturerFormState> = {
    isLoading: false,
    isEditing: false,
    lecturer: {
        id: "",
        firstName: "",
        lastName: "",
        secondName: "",
        fullName: "",
        gender: "",
    },
};

export const initLecturersState: Partial<ILecturersState> = {
    isLoading: true,
    lecturers: [],
    form: initLecturerFormState as ILecturerFormState,
};
