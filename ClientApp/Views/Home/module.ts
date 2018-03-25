import { IApplicationState } from "@app/store";
import { createView } from "@app/View";
import { configureReducer } from "./configureReducer";
import { Navigation } from "./navigation";
import * as Store from "./Store";

export const Name = "home";
export const Reducer = configureReducer(Name);

export default createView(Name, Navigation, Reducer);
