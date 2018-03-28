import { Dispatch } from "react-redux";
import { IApplicationState } from "./ApplicationState";
import * as Reducer from "./reducer";
export { Reducer, IApplicationState };

export type AppThunkAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;

export type DispatchType = Dispatch<IApplicationState | undefined>;
