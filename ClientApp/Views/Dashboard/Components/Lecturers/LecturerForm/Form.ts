import { Form as PainForm, FormContext as PFormContext, IForm, IFormState } from "react-painlessform";
import { connect } from "react-redux";
import { compose } from "redux";
import { connectState, getState } from "redux-subreducer";

import { Consumer } from "@app/interfaces/consumer";
import { ILecturer } from "@app/store/database";

import { lecturersActions } from "../../../actions";
import { lecturerFormReducer } from "../../../reducers";

import { formReducer, initFormState } from "./reducer";

const enhance = compose<IForm<ILecturer>>(
    connect(
        getState(
            {
                form: lecturerFormReducer,
            },
            ({ form }) => ({
                values: form.lecturer,
                isReset: form.isReset,
            }),
        ),
        lecturersActions.mapDispatch.form,
    ),
    connectState(
        initFormState,
        formReducer,
    ),
);

export const FormContext: Consumer<IFormState<ILecturer>> = PFormContext;
export const Form = enhance(PainForm);
