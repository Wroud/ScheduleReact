import { IViewState } from "@app/View";
import { createSubReducer } from "redux-subreducer";
import * as Store from "../store";
import { lecturersReducer } from "./lecturers";

export const configureReducer = (name: string) =>
        createSubReducer<IViewState, Store.IState>(name, Store.initState)
                .join(lecturersReducer);
