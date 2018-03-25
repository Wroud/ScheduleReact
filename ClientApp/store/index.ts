import { Dispatch } from "react-redux";
import { IApplicationState, IApplicationStateModifed } from "./ApplicationState";
import * as Reducer from "./reducer";
export { Reducer, IApplicationState, IApplicationStateModifed };

export type AppThunkAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;

export type DispatchType = Dispatch<IApplicationState | undefined>;
