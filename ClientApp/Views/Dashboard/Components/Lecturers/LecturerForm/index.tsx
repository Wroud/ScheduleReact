import { compose } from "redux";
import { connectWithComponentId } from "redux-subreducer";

import { IErrorMessage } from "@app/middlewares/JsonQuery";

import { lecturersActions } from "../../../actions";
import { getLecturerFormEditing } from "../../../selectors/lecturers";

import { LecturerFormClass } from "./LecturerFormClass";

export interface IState {
    errors: IErrorMessage[];
}

const enhance = compose<React.ComponentClass>(
    connectWithComponentId(
        state => ({ isEditing: getLecturerFormEditing(state) }),
        lecturersActions.mapDispatch.form,
    ),
);

export const LecturerForm = enhance(LecturerFormClass);
