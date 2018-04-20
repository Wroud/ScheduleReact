import { Form as PainForm, FormContext as PFormContext, IForm, IFormProps, IFormState } from "react-painlessform";
import { connect } from "react-redux";
import { compose } from "redux";
import { connectState } from "redux-subreducer";

import { ILecturer } from "@app/store/database";

import { lecturersActions } from "../../../actions";
import { getLecturer } from "../../../selectors/lecturers";

import { formReducer, initFormState } from "./reducer";

const enhance = compose<IForm<ILecturer>>(
    connect(
        state => ({ values: getLecturer(state) }),
        lecturersActions.mapDispatch.form,
    ),
    connectState<IFormProps<ILecturer>, Partial<IFormState<ILecturer>>>(
        initFormState,
        formReducer,
    ),
);

export const FormContext: React.ComponentClass<{
    children?: (context: IFormState<ILecturer>) => React.ReactNode;
}> = PFormContext;
export const Form = enhance(PainForm);
