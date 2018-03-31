import { takeEvery } from "redux-saga/effects";
import { lecturersSaga } from "./lecturers";

export function* rootSaga() {
    yield* lecturersSaga();
}
