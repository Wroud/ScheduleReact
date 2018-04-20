import {
    createFormValidator,
    createRawFormValidator,
    FormErrors,
    IValidationContext,
    IValidationProps,
    Validation as PainValidation,
} from "react-painlessform";
import { compose } from "redux";
import { connectState } from "redux-subreducer";
import * as Yup from "yup";

import { ILecturer } from "@app/store/database";

import { IState } from "./";
import { Props } from "./LecturerFormClass";
import { initValidationState, validationReducer } from "./reducer";

interface IValidationMeta {
    state: IValidationContext & IState;
    props: IValidationProps;
}

const submitValidator = createRawFormValidator<ILecturer, IValidationMeta>((values, meta) => {
    // tslint:disable-next-line:no-object-literal-type-assertion
    const errors: FormErrors<ILecturer> = {} as FormErrors<ILecturer>;
    if (!meta.state) {
        return errors;
    }
    const { errors: stateErrors } = meta.state;
    if (stateErrors) {
        Object.keys(values).forEach(name => {
            const error = stateErrors.find(e => e.name.toLowerCase() === name.toLowerCase());
            if (error) {
                errors[name] = [...(errors[name] || []), error.message];
            }
        });
    }
    return errors;
});

const validator = Yup.object<Partial<ILecturer>>().shape({
    id: Yup.string(),
    firstName: Yup.string().min(2).required(),
    lastName: Yup.string().min(2).required(),
    secondName: Yup.string().min(2).required(),
    fullName: Yup.string().min(2).required(),
    gender: Yup.string().oneOf(["0", "1"], "Wrong value").required(),
});

export const formValidator = createFormValidator<ILecturer, IValidationMeta>(
    submitValidator,
    validator,
);

const enhance = compose<typeof PainValidation>(
    connectState<Props, IState>(
        initValidationState,
        validationReducer,
    ),
);

export const Validation = enhance(PainValidation);
