import { createSubReducer } from "@app/middlewares/redux-subreducer";
import { IViewState } from "@app/View";
import { actions, lecturersActions } from "../actions";
import * as Store from "../Store";

export const lecturerFormReducer =
    createSubReducer<Store.ILecturersState, Store.ILecturerFormState>("form", Store.initLecturerFormState)
        .on(lecturersActions.form.reset, (state) => (Store.initLecturerFormState))
        .on(lecturersActions.form.update, (state, payload) => ({ lecturer: payload }))
        .on(lecturersActions.form.setLoaded, (state) => ({ loading: false }))
        .on(lecturersActions.form.setLoading, (state) => ({ loading: true }))

        .on(lecturersActions.lecturer.edit, (state) => ({ editing: true }));

export const lecturersReducer =
    createSubReducer<Store.IState, Store.ILecturersState>("lecturers", Store.initLecturersState)
        .join(lecturerFormReducer)

        .on(lecturersActions.lecturers.load, (state) => ({ loading: true }))
        .on(lecturersActions.lecturers.update, (state, payload) => ({ lecturers: payload }))
        .on(lecturersActions.lecturers.setLoaded, (state) => ({ loading: false }))
        .on(lecturersActions.lecturers.setLoading, (state) => ({ loading: true }));
