import { createView } from "@app/View";
import { Navigation } from "./navigation";
import { configureReducer } from "./reducers";
import { rootSaga } from "./sagas/sagas";

export const Name = "dashboard";
export const Reducer = configureReducer(Name);

export default createView(Name, Navigation, Reducer, rootSaga);
