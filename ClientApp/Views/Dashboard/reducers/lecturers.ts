import { createSubReducer } from "redux-subreducer";
import { lecturersActions } from "../actions";
import * as Store from "../store";
const { actions, creators } = lecturersActions;

const setLoading = (value: boolean) => () => ({ loading: value });
const setEditing = (value: boolean) => () => ({ editing: value });
const setFormInitState = () => Store.initLecturerFormState;
const updateLecturers = (state, payload) => ({ lecturers: payload });
const updateLecturer = (state, payload) => ({ lecturer: payload });

export const lecturerFormReducer =
    createSubReducer<Store.ILecturersState, Store.ILecturerFormState>("form", Store.initLecturerFormState)
        .on(actions.form.reset, setFormInitState)
        .on(actions.form.setValue, updateLecturer)
        .on(actions.form.setLoaded, setLoading(false))
        .on(actions.form.setLoading, setLoading(true))

        .on(actions.lecturer.edit, setEditing(true));

export const lecturersReducer =
    createSubReducer<Store.IState, Store.ILecturersState>("lecturers", Store.initLecturersState)
        .join(lecturerFormReducer)

        .on(actions.lecturers.requestLoad, setLoading(true))
        .on(actions.lecturers.setLecturers, updateLecturers)
        .on(actions.lecturers.setLoaded, setLoading(false))
        .on(actions.lecturers.setLoading, setLoading(true));
