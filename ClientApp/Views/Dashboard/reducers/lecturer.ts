import { createSubReducer } from "@app/middlewares/redux-subreducer";
import { IViewState } from "@app/View";
import { actions, lecturersActions } from "../actions";
import * as Store from "../Store";

export const LecturerFormReducer =
    createSubReducer<Store.ILecturersState, Store.ILecturerFormState>("form", Store.InitLecturerFormState)
        .on(lecturersActions.form.reset, (state) => (Store.InitLecturerFormState))
        .on(lecturersActions.form.update, (state, payload) => ({ lecturer: payload }))
        .on(lecturersActions.form.setLoaded, (state) => ({ loading: false }))
        .on(lecturersActions.form.setLoading, (state) => ({ loading: true }))

        .on(lecturersActions.lecturer.edit, (state) => ({ editing: true }));

export const LecturersReducer =
    createSubReducer<Store.IState, Store.ILecturersState>("lecturers", Store.InitLecturersState)
        .join(LecturerFormReducer)

        .on(lecturersActions.lecturers.load, (state) => ({ loading: true }))
        .on(lecturersActions.lecturers.update, (state, payload) => ({ lecturers: payload }))
        .on(lecturersActions.lecturers.setLoaded, (state) => ({ loading: false }))
        .on(lecturersActions.lecturers.setLoading, (state) => ({ loading: true }));
