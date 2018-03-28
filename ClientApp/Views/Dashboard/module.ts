import { IApplicationState } from "@app/store";
import { createView } from "@app/View";
import { configureReducer } from "./configureReducer";
import { Navigation } from "./navigation";
import { rootSaga } from "./sagas/sagas";
import * as Store from "./Store";

export const Name = "dashboard";
export const Reducer = configureReducer(Name);

export default createView(Name, Navigation, Reducer, rootSaga);
