import { IApplicationState, reducer } from "./store";
import { loadViews } from "./ViewLoader";

export const views =
    loadViews<IApplicationState>()
        .load()
        .joinToReducer(reducer.appReducer);
