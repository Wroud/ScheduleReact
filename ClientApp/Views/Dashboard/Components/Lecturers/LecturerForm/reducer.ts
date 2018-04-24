import { IForm, IFormProps, IFormState } from "react-painlessform";
import { IComponentId, ILocalReducer } from "redux-subreducer";

import { ILecturer } from "@app/store/database";

import { lecturersActions } from "../../../actions";

import { IState } from "./";
import { Props } from "./LecturerFormClass";

const { actions } = lecturersActions;

export const initValidationState: IState = {
    errors: [],
};

export const validationReducer = (reducer: ILocalReducer<Props & IComponentId, IState>) => reducer
    .on(actions.form.setErrors, (_, __, errors) => ({ errors }))
    .on(actions.form.reset, state => ({ errors: [] }));

export const initFormState: Partial<IFormState<ILecturer>> = {
    isSubmitting: false,
};

export const formReducer = (reducer: ILocalReducer<IFormProps<ILecturer> & IComponentId, IFormState<ILecturer>>) => reducer
    .on(actions.form.setLoading, () => ({ isSubmitting: true }))
    .on(actions.form.setLoaded, () => ({ isSubmitting: false }))
    /*.on(actions.form.reset, null, (component: IForm<ILecturer>) => component.handleReset())*/;
