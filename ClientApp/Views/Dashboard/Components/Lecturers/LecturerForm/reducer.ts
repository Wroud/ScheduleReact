import { IFormProps, IFormState } from "react-painlessform";
import { IComponentId, ILocalReducer } from "redux-subreducer";

import { ILecturer } from "@app/store/database";

import { lecturersActions } from "../../../actions";

import { IState } from "./";
import { Props } from "./LecturerFormClass";

export const initValidationState: IState = {
    errors: [],
};

export const validationReducer = (reducer: ILocalReducer<Props & IComponentId, IState>) => reducer
    .on(lecturersActions.actions.form.setErrors, (_, __, errors) => ({ errors }))
    .on(lecturersActions.actions.form.setValue, state => ({ errors: [] }));

export const initFormState: Partial<IFormState<ILecturer>> = {
    isSubmitting: false,
};

export const formReducer = (reducer: ILocalReducer<IFormProps<ILecturer> & IComponentId, IFormState<ILecturer>>) => reducer
    .on(lecturersActions.actions.form.setLoading, () => ({ isSubmitting: true }))
    .on(lecturersActions.actions.form.setLoaded, () => ({ isSubmitting: false }));
