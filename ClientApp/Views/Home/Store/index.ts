export interface IState extends IModifedState {
    count: number;
}

export interface IModifedState {
    count?: number;
}

export const Default: IState = {
    count: 0,
};
