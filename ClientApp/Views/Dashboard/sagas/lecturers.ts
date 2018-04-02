import { JsonQueryResult } from "@app/middlewares/JsonQuery";
import { takeEveryAction } from "@app/middlewares/sagaExtensions";
import { dbContext, ILecturer } from "@app/store/database";
import { call, put, select } from "redux-saga/effects";
import { lecturersActions } from "../actions";
import { api } from "../api";
import { getLecturer } from "../selectors";

const { actions, creators } = lecturersActions;

export function* lecturersSaga() {
    yield takeEveryAction(actions.lecturers.load, fetchData);
    yield takeEveryAction(actions.lecturer.delete, deleteLecturer);
    yield takeEveryAction(actions.lecturer.edit, editLecturer);
    yield takeEveryAction([actions.form.add, actions.form.save], submitLecturer);
}

export function* fetchData(action) {
    const { data, state, errors }: JsonQueryResult<ILecturer[]> = yield call(api.lecturers.load);

    if (state) {
        const result = yield dbContext.lecturers.add(data);
        yield put(creators.lecturers.update(result));
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
        yield put(creators.lecturers.update(dbContext.lecturers.getAllIds()));
    } else {
        console.log(errors);
        yield put({ type: "FETCH_FAILED", errors });
    }

    yield put(actions.form.setLoaded);
}

export function* deleteLecturer(action: typeof actions.lecturer.delete) {
    yield put(actions.lecturers.setLoading);
    const id = action.payload;
    const { data, state, errors }: JsonQueryResult<ILecturer> = yield call(api.lecturers.delete, id);

    if (state) {
        dbContext.lecturers.remove(id);
        yield put(creators.lecturers.update(dbContext.lecturers.getAllIds()));
    } else {
        console.log(errors);
        yield put({ type: "FETCH_FAILED", errors });
    }

    yield put(actions.lecturers.setLoaded);
}

export function* editLecturer(action: typeof actions.lecturer.edit) {
    const lecturer = yield dbContext.lecturers.get(action.payload);
    yield put(creators.form.update({ ...lecturer }));
}
