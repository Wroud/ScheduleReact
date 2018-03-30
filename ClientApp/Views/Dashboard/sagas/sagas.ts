import { takeEvery } from "redux-saga/effects";
import { lecturersActions } from "../actions";
import { deleteLecturer, editLecturer, fetchData, submitLecturer } from "./lecturers";

export function* rootSaga() {
    yield takeEvery(lecturersActions.lecturers.load.type, fetchData);
    yield takeEvery(lecturersActions.lecturer.delete.type, deleteLecturer);
    yield takeEvery(lecturersActions.lecturer.edit.type, editLecturer);
    yield takeEvery([lecturersActions.form.add.type, lecturersActions.form.save.type], submitLecturer);
}
