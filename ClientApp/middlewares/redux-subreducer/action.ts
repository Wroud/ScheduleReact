import { Action } from "redux";

export interface IExtendAction<TData>
    extends Action {

    payload?: TData;
}

export interface IPayloadAction<TData>
    extends IExtendAction<TData> {

    payload: TData;
}

interface IActionMeta {
    action: IExtendAction<any>;
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

export function createPayloadAction<TData>(description?: string, from?: string) {
    const action: IPayloadAction<TData> = {
        type: `GENERIC_ACTION_${id}`,
        payload: {} as any,
    };
    createdActions[action.type] = { action, description, from };
    id++;
    return action;
}

export const getActionMeta = ({ type }: IExtendAction<any>): IActionMeta => createdActions[type] || {};
export const getActionCreator = (action: Action) => () => action;
export const getPayloadCreator = <TData>(action: IPayloadAction<TData>) => (data: TData) => ({ ...action, data });
