import { ILecturer } from "@app/store/database";
import { createSubReducer } from "redux-subreducer";
import { lecturersActions } from "../actions";
import * as Store from "../store";
const { actions, creators } = lecturersActions;

const setLoading = (value: boolean) => () => ({ isLoading: value });
const setEditing = (value: boolean) => () => ({ isEditing: value });
const setFormInitState = () => Store.initLecturerFormState;
const updateLecturers = (state: Store.ILecturersState, payload: string[]) => ({ lecturers: payload });
const updateLecturer = (state: Store.ILecturerFormState, payload: ILecturer) =>
    ({
        lecturer: payload,
        isReset: state.lecturer.id !== payload.id,
    });

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

        .on(actions.lecturers.setLecturers, updateLecturers)
        .on(actions.lecturers.setLoaded, setLoading(false))
        .on(actions.lecturers.setLoading, setLoading(true));
