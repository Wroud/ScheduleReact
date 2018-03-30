import { Dispatch } from "react-redux";
import { IApplicationState } from "./ApplicationState";
import * as reducer from "./reducer";
export { reducer, IApplicationState };

export type AppThunkAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;

export type DispatchType = Dispatch<IApplicationState | undefined>;
