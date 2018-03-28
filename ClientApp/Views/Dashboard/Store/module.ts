import { ILecturersState } from "./Lecturers";

export interface IState {
    lecturers: ILecturersState;
    count: number;
}

export const InitState: Partial<IState> = {
    count: 0,
};
