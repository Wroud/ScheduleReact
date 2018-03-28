import { JsonQueryResult } from "@app/middlewares/JsonQuery";
import { Table } from "@app/store/database/DbSet";
import { ILecturer } from "@app/store/database/Lecturer";
import { call, put } from "redux-saga/effects";
import { lecturersActionCreators, lecturersActions } from "../actions";
import { Api } from "../api";

export function* fetchData(action) {
    try {
        const query: JsonQueryResult<ILecturer[]> = yield call(Api.lecturers.load);
        const db = new Table<ILecturer>("lecturers");
        const result = yield db.add(query.data);
        yield put(lecturersActionCreators.actions.update(result));
        yield put(lecturersActions.loadFinish);
    } catch (error) {
        console.log(error);
        yield put({ type: "FETCH_FAILED", error });
    }
}
