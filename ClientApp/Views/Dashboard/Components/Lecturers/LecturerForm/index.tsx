import { compose } from "redux";
import { connectWithComponentId, getState } from "redux-subreducer";

import { IErrorMessage } from "@app/middlewares/JsonQuery";

import { lecturersActions } from "../../../actions";
import { lecturerFormReducer } from "../../../reducers/lecturers";

import { LecturerFormClass } from "./LecturerFormClass";

export interface IState {
    errors: IErrorMessage[];
}

const enhance = compose<React.ComponentClass>(
    connectWithComponentId(
        getState(
            {
                form: lecturerFormReducer,
            },
            ({ form: { isEditing } }) => ({ isEditing }),
        ),
        lecturersActions.mapDispatch.form,
    ),
);

export const LecturerForm = enhance(LecturerFormClass);
