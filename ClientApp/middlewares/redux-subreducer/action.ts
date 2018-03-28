import {
    Action,
    ActionCreatorsMapObject,
    bindActionCreators,
    Dispatch,
} from "redux";

export interface IExtendAction<TData = {}>
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

interface IActionsClass {
    [key: string]: IExtendAction<any>;
}

type ActionCreator<TA extends IExtendAction> = (payload?: TA["payload"]) => TA;

type TransformActionsClass<T extends IActionsClass> = {
    [P in keyof T]: ActionCreator<T[P]>;
};

let id = 0;
const createdActions: { [key: string]: IActionMeta } = {};

export function createAction(description?: string, from?: string) {
    const action: IExtendAction<{}> = {
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
export const getCreators = <T extends IActionsClass>(actions: T): TransformActionsClass<T> => {
    const result: TransformActionsClass<T> = {} as any;
    // tslint:disable-next-line:forin
    for (const action in actions) {
        result[action] = (payload?: any) => ({ ...actions[action] as any, payload });
    }
    return result;
};
export const getActionCreator = (action: Action) => () => action;
export const getPayloadCreator = <TData>(action: IPayloadAction<TData>) => (payload: TData) => ({ ...action, payload });
export const createActions = <T extends ActionCreatorsMapObject>(actions: T): { actions: T } => ({ actions });
export const mapActionsToProps = <T extends ActionCreatorsMapObject>(actions: { actions: T }) =>
    (dispatch: Dispatch<Action>) => ({ actions: bindActionCreators(actions.actions, dispatch) });
