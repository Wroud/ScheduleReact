export interface ILecturersState {
    lecturers: string[];
    loading: boolean;
}

export const InitLecturersState: ILecturersState = {
    lecturers: [],
    loading: true,
};
