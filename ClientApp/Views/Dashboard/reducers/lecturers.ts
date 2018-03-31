import { createSubReducer } from "@app/middlewares/redux-subreducer";
import { actions } from "../actions";
import * as Store from "../store";

const setLoading = (value: boolean) => () => ({ loading: value });
const setEditing = (value: boolean) => () => ({ editing: value });
const setFormInitState = () => Store.initLecturerFormState;
const updateLecturers = (state, payload) => ({ lecturers: payload });
const updateLecturer = (state, payload) => ({ lecturer: payload });

export const lecturerFormReducer =
    createSubReducer<Store.ILecturersState, Store.ILecturerFormState>("form", Store.initLecturerFormState)
        .on(actions.lecturers.form.reset, setFormInitState)
        .on(actions.lecturers.form.update, updateLecturer)
        .on(actions.lecturers.form.setLoaded, setLoading(false))
        .on(actions.lecturers.form.setLoading, setLoading(true))

        .on(actions.lecturers.lecturer.edit, setEditing(true));

export const lecturersReducer =
    createSubReducer<Store.IState, Store.ILecturersState>("lecturers", Store.initLecturersState)
        .join(lecturerFormReducer)

        .on(actions.lecturers.lecturers.load, setLoading(true))
        .on(actions.lecturers.lecturers.update, updateLecturers)
        .on(actions.lecturers.lecturers.setLoaded, setLoading(false))
        .on(actions.lecturers.lecturers.setLoading, setLoading(true));
