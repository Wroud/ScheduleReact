import { RouterState } from "react-router-redux";
import { IViewState } from "../View";
import * as Database from "./database";

export interface IApplicationStateModifed {
    view?: IViewState;
    database?: Database.IDatabaseState;
    routing?: RouterState;
    testCount?: number;
}

export interface IApplicationState extends IApplicationStateModifed {
    view: IViewState;
    database: Database.IDatabaseState;
    routing: RouterState;
    testCount: number;
}
