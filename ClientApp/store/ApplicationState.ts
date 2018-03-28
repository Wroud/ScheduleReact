import { RouterState } from "react-router-redux";
import { IViewState } from "../View";
import * as Database from "./database";

export interface IApplicationState {
    view: IViewState;
    database: Database.IDatabaseState;
    routing: RouterState;
}
