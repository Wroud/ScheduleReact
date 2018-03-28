import { takeEvery } from "redux-saga/effects";
import { lecturersActions } from "../actions";
import { fetchData } from "./lecturers";

export function* rootSaga() {
    yield takeEvery(lecturersActions.load.type, fetchData);
}
