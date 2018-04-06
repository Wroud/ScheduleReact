import { IApplicationState } from "@app/store";
import { IViewState } from "@app/View";
import { createSubReducer } from "redux-subreducer";
import { actions } from "./actions";
import * as Store from "./Store";

export const configureReducer = (name: string) =>
        createSubReducer<IViewState, Store.IState>(name, Store.initState)
                .on(actions.increment, state => ({ count: state.count + 1 }))
                .on(actions.decrement, state => ({ count: state.count - 1 }));
