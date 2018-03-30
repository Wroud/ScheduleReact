import { JsonQueryResult } from "@app/middlewares/JsonQuery";
import { ILecturer, openTable } from "@app/store/database";
import { call, put, select } from "redux-saga/effects";
import { lecturersActionCreators, lecturersActions } from "../actions";
import { Api } from "../api";
import { LecturerFormReducer } from "../reducers";

export function* fetchData(action) {
    try {
        const query: JsonQueryResult<ILecturer[]> = yield call(Api.lecturers.load);
        const db = openTable<ILecturer>("lecturers");
        const result = yield db.add(query.data);
        yield put(lecturersActionCreators.lecturers.actions.update(result));
        yield put(lecturersActions.lecturers.setLoaded);
    } catch (error) {
        console.log(error);
        yield put({ type: "FETCH_FAILED", error });
    }
}

export function* submitLecturer(action) {
    yield put(lecturersActions.form.setLoading);
    try {
        const lecturer: ILecturer = yield select((state) => LecturerFormReducer.stateSelector(state).lecturer);
        const query: JsonQueryResult<ILecturer> = yield call(Api.lecturers.addOrEdit, lecturer);
        if (query.state) {
            const db = openTable<ILecturer>("lecturers");
            const result = yield db.add([query.data]);
            yield put(lecturersActions.form.reset);
            yield put(lecturersActionCreators.lecturers.actions.update(db.getAllIds()));
        }
    } catch (error) {
        console.log(error);
        yield put({ type: "FETCH_FAILED", error });
    }
    yield put(lecturersActions.form.setLoaded);
}

export function* deleteLecturer(action: typeof lecturersActions.lecturer.delete) {
    yield put(lecturersActions.lecturers.setLoading);
    try {
        const id = action.payload;
        const query: JsonQueryResult<ILecturer> = yield call(Api.lecturers.delete, id);
        if (query.state) {
            const db = openTable<ILecturer>("lecturers");
            db.remove(id);
            yield put(lecturersActionCreators.lecturers.actions.update(db.getAllIds()));
        }
    } catch (error) {
        console.log(error);
        yield put({ type: "FETCH_FAILED", error });
    }
    yield put(lecturersActions.lecturers.setLoaded);
}

export function* editLecturer(action: typeof lecturersActions.lecturer.edit) {
    try {
        const db = openTable<ILecturer>("lecturers");
        const lecturer = yield db.get(action.payload);
        yield put(lecturersActionCreators.form.actions.update({ ...lecturer }));
    } catch (error) {
        console.log(error);
        yield put({ type: "FETCH_FAILED", error });
    }
}
