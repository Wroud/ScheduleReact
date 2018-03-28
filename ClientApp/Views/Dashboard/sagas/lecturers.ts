import { JsonQueryResult } from "@app/middlewares/JsonQuery";
import { ILecturer, openTable } from "@app/store/database";
import { call, put } from "redux-saga/effects";
import { lecturersActionCreators, lecturersActions } from "../actions";
import { Api } from "../api";

export function* fetchData(action) {
    try {
        const query: JsonQueryResult<ILecturer[]> = yield call(Api.lecturers.load);
        const db = openTable<ILecturer>("lecturers");
        const result = yield db.add(query.data);
        yield put(lecturersActionCreators.actions.update(result));
        yield put(lecturersActions.loadFinish);
    } catch (error) {
        console.log(error);
        yield put({ type: "FETCH_FAILED", error });
    }
}
