import { RouterState } from "react-router-redux";
import { IViewState } from "../View";
import { IDatabaseState } from "./database";

export interface IApplicationState {
    view: IViewState;
    database: IDatabaseState;
    routing: RouterState;
}
