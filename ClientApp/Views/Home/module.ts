import { IApplicationState } from "@app/store";
import { createView } from "@app/View";
import { configureReducer } from "./configureReducer";
import { navigation } from "./navigation";
import * as Store from "./Store";

export const name = "home";
export const reducer = configureReducer(name);

export default createView(name, navigation, reducer);
