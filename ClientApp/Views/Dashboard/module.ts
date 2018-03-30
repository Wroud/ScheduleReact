﻿import { createView } from "@app/View";
import { navigation } from "./navigation";
import { configureReducer } from "./reducers";
import { rootSaga } from "./sagas/sagas";

export const name = "dashboard";
export const reducer = configureReducer(name);

export default createView(name, navigation, reducer, rootSaga);
