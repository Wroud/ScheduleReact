import { JsonQueryResult } from "@app/middlewares/JsonQuery";
import { dbContext, ILecturer } from "@app/store/database";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { actionCreators, actions } from "../actions";
import { api } from "../api";
import { getLecturer } from "../selectors";

export function* lecturersSaga() {
    yield takeEvery(actions.lecturers.lecturers.load.type, fetchData);
    yield takeEvery(actions.lecturers.lecturer.delete.type, deleteLecturer);
    yield takeEvery(actions.lecturers.lecturer.edit.type, editLecturer);
    yield takeEvery([actions.lecturers.form.add.type, actions.lecturers.form.save.type], submitLecturer);
}

export function* fetchData(action) {
    const { data, state, errors }: JsonQueryResult<ILecturer[]> = yield call(api.lecturers.load);

    if (state) {
        const result = yield dbContext.lecturers.add(data);
        yield put(actionCreators.lecturers.lecturers.actions.update(result));
    } else {
        console.log(errors);
        yield put({ type: "FETCH_FAILED", errors });
    }

    yield put(actions.lecturers.lecturers.setLoaded);
}

export function* submitLecturer(action) {
    yield put(actions.lecturers.form.setLoading);
    const lecturer: ILecturer = yield select(getLecturer);
    const { data, state, errors }: JsonQueryResult<ILecturer> = yield call(api.lecturers.addOrEdit, lecturer);

    if (state) {
        const result = yield dbContext.lecturers.add([data]);
        yield put(actions.lecturers.form.reset);
        yield put(actionCreators.lecturers.lecturers.actions.update(dbContext.lecturers.getAllIds()));
    } else {
        console.log(errors);
        yield put({ type: "FETCH_FAILED", errors });
    }

    yield put(actions.lecturers.form.setLoaded);
}

export function* deleteLecturer(action: typeof actions.lecturers.lecturer.delete) {
    yield put(actions.lecturers.lecturers.setLoading);
    const id = action.payload;
    const { data, state, errors }: JsonQueryResult<ILecturer> = yield call(api.lecturers.delete, id);

    if (state) {
        dbContext.lecturers.remove(id);
        yield put(actionCreators.lecturers.lecturers.actions.update(dbContext.lecturers.getAllIds()));
    } else {
        console.log(errors);
        yield put({ type: "FETCH_FAILED", errors });
    }

    yield put(actions.lecturers.lecturers.setLoaded);
}

export function* editLecturer(action: typeof actions.lecturers.lecturer.edit) {
    const lecturer = yield dbContext.lecturers.get(action.payload);
    yield put(actionCreators.lecturers.form.actions.update({ ...lecturer }));
}
