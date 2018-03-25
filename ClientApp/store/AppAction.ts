import { Action } from "redux";

export interface IAppAction<TData>
    extends Action {

    payload?: TData;
}

export interface IDataAction<TData>
    extends IAppAction<TData> {

    payload: TData;
}

interface IActionMeta {
    action: IAppAction<any>;
    description?: string;
    from?: string;
}

let id = 0;
const createdActions: { [key: string]: IActionMeta } = {};

export function createAction(description?: string, from?: string) {
    const action: Action = {
        type: `GENERIC_ACTION_${id}`,
    };
    createdActions[action.type] = { action, description, from };
    id++;
    return action;
}

export function createDataAction<TData>(description?: string, from?: string) {
    const action: IDataAction<TData> = {
        type: `GENERIC_ACTION_${id}`,
        payload: {} as any,
    };
    createdActions[action.type] = { action, description, from };
    id++;
    return action;
}

export const getActionMeta = ({ type }: IAppAction<any>): IActionMeta => createdActions[type] || {};
export const getCreator = (action: Action) => () => action;
export const getDataCreator = <TData>(action: IDataAction<TData>) => (data: TData) => ({ ...action, data });
