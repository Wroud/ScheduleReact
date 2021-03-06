import { JsonQueryResult } from "@app/middlewares/JsonQuery";
import { takeEveryAction } from "@app/middlewares/sagaExtensions";
import { dbContext, ILecturer } from "@app/store/database";
import { delay } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { lecturersActions } from "../actions";
import { api } from "../api";
import { getLecturerLoading } from "../selectors";
import { getLecturer } from "../selectors/lecturers";

const { actions, creators } = lecturersActions;

export function* lecturersSaga() {
    yield takeEveryAction(actions.lecturers.requestLoad, fetchData);
    yield takeEveryAction(actions.lecturer.requestDelete, deleteLecturer);
    yield takeEveryAction(actions.lecturer.edit, editLecturer);
    yield takeEveryAction([actions.form.requestAdd, actions.form.requestSave], submitLecturer);
}

export function* fetchData(action) {
    const { data, state, errors }: JsonQueryResult<ILecturer[]> = yield call(api.lecturers.load);
    yield put(actions.lecturers.setLoading);

    if (state) {
        const ids = yield dbContext.lecturers.add(data);
        yield put(creators.lecturers.setLecturers(ids));
    } else {
        console.log(errors);
        yield put({ type: "FETCH_FAILED", errors });
    }

    yield put(actions.lecturers.setLoaded);
}

export function* submitLecturer(action) {
    yield put(actions.form.setLoading);
    const lecturer: ILecturer = yield select(getLecturer);
    const { data, state, errors }: JsonQueryResult<ILecturer> = yield call(api.lecturers.addOrEdit, lecturer);

    if (state) {
        const result = yield dbContext.lecturers.add([data]);
        yield put(actions.form.reset);
        yield put(creators.lecturers.setLecturers(dbContext.lecturers.getAllIds()));
    } else {
        yield put(creators.form.setErrors(errors));
    }
    // yield call(delay, 100);
    yield put(actions.form.setLoaded);
}

export function* deleteLecturer(action: typeof actions.lecturer.requestDelete) {
    yield put(actions.lecturers.setLoading);
    const id = action.payload;
    const { data, state, errors }: JsonQueryResult<ILecturer> = yield call(api.lecturers.delete, id);

    if (state) {
        dbContext.lecturers.remove(id);
        yield put(creators.lecturers.setLecturers(dbContext.lecturers.getAllIds()));
    } else {
        console.log(errors);
        yield put({ type: "FETCH_FAILED", errors });
    }

    yield put(actions.lecturers.setLoaded);
}

export function* editLecturer(action: typeof actions.lecturer.edit) {
    const lecturer = yield dbContext.lecturers.get(action.payload);
    yield put(creators.form.setValue({ ...lecturer }));
}
