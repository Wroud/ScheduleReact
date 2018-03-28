import { createView } from "@app/View";
import { configureReducer } from "./configureReducer";
import { Navigation } from "./navigation";
import { rootSaga } from "./sagas/sagas";

export const Name = "dashboard";
export const Reducer = configureReducer(Name);

export default createView(Name, Navigation, Reducer, rootSaga);
