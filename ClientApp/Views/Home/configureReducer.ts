import { IApplicationState } from "@app/store";
import { createReducer } from "@app/store/AppReducer";
import { actions } from "./actions";
import * as Store from "./Store";

export const configureReducer = (name: string) =>
        createReducer<IApplicationState, Store.IState, Store.IModifedState>(name, Store.Default)
                .on(actions.increment, (state) => ({ count: state.count + 1 }))
                .on(actions.decrement, (state) => ({ count: state.count - 1 }));
