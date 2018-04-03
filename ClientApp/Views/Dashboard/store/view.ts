import { ILecturersState } from "./Lecturers";

export interface IState {
    lecturers: ILecturersState;
    count: number;
}

export const initState: Partial<IState> = {
    count: 0,
};
