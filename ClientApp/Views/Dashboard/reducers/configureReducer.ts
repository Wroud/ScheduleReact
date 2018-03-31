import { createSubReducer } from "@app/middlewares/redux-subreducer";
import { IViewState } from "@app/View";
import * as Store from "../store";
import { lecturersReducer } from "./lecturers";

export const configureReducer = (name: string) =>
        createSubReducer<IViewState, Store.IState>(name, Store.initState)
                .join(lecturersReducer);
