import { IApplicationState, Reducer } from "./store";
import { loadViews } from "./ViewLoader";

export const Views =
    loadViews<IApplicationState>()
        .load()
        .joinToReducer(Reducer.AppReducer);
