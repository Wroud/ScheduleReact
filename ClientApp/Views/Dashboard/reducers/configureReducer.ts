import { createSubReducer } from "@app/middlewares/redux-subreducer";
import { IViewState } from "@app/View";
import { actions, lecturersActions } from "../actions";
import * as Store from "../Store";
import { lecturersReducer } from "./lecturer";

export const configureReducer = (name: string) =>
        createSubReducer<IViewState, Store.IState>(name, Store.initState)
                .join(lecturersReducer);
