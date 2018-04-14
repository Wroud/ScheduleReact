import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { Button, ButtonIcon } from "rmwc/Button";
import { Select } from "rmwc/Select";
import { TextField, TextFieldHelperText } from "rmwc/TextField";
import { Typography } from "rmwc/Typography";

import { FormSelectField } from "@app/components/FormSelectField";
import { FormTextField } from "@app/components/FormTextField";
import { IErrorMessage } from "@app/middlewares/JsonQuery";
import { ILecturer } from "@app/store/database";
import {
    createFieldValidator,
    createFormValidator,
    createRawFormValidator,
    createValidator,
    Form,
    FormErrors,
    IValidationProps,
    IValidationState,
    Validation,
    Validator,
} from "react-painlessform";
import { connectState, connectWithComponentId, IComponentId, ILocalReducer } from "redux-subreducer";
import { lecturersActions } from "../../actions";
import { getLecturer, getLecturerForm } from "../../selectors";

interface IState {
    errors: IErrorMessage[];
}

type Props =
    {
        editingId: string;
        name: string;
        editing: boolean;
    }
    & typeof lecturersActions.mapCreators.form;

const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);
const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

const required: Validator<string, string | string[]> =
    data =>
        data === ""
            ? "Requered"
            : [];
const minLength: Validator<string, string | string[]> =
    data =>
        data.length < 3
            && data.length > 0
            ? "Min length 3"
            : [];
const maxLength: Validator<string, string | string[]> =
    data =>
        data.length > 6
            ? "Max length 6"
            : [];

const firstNameValidator = createFieldValidator<ILecturer, string>(
    "firstName",
    createValidator<string>("firstName", maxLength, minLength, required),
);
const lastNameValidator = createFieldValidator<ILecturer, string>(
    "lastName",
    createValidator<string>("lastName", maxLength, minLength, required),
);

interface IValidationMeta {
    state: IValidationState & IState;
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
const formValidator = createFormValidator<ILecturer>(
    firstNameValidator,
    lastNameValidator,
    submitValidator,
);

const initState: IState = {
    errors: [],
};

class LecturerFormClass extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    handleReset = () => {
        this.props.actions.reset();
    }
    handleSubmit = () => {
        if (this.props.editing) {
            this.props.actions.requestSave();
        } else {
            this.props.actions.requestAdd();
        }
    }
    onSubmit = async (values: any) => {
        return undefined;
    }
    onUpdate = (prev, model: ILecturer) => {
        this.props.actions.setValue(model);
    }
    render() {
        const { editingId, editing, name } = this.props;
        const selectOptions = [{ value: "0", label: "Мужчина" }, { value: "1", label: "Женщина" }];
        return (
            <div>
                <Typography use="title" tag={"div"}>{editing ? "Изменить" : "Добавить"} лектора</Typography>
                <Typography use="subheading1" tag={"div"}>{name}</Typography>
                <FormExt
                    onSubmit={this.onSubmit}
                    onReset={this.handleReset}
                    onModelChange={this.onUpdate}
                >
                    <ValidationExt validator={formValidator}>
                        <input name={"id"} value={editingId} hidden={true} />
                        <FormTextField name={"firstName"} label={"First Name"} />
                        <FormTextField name={"secondName"} label={"Second Name"} />
                        <FormTextField name={"lastName"} label={"Last Name"} />
                        <FormTextField name={"fullName"} label={"Full Name"} />
                        <FormSelectField name={"gender"} label={"Gender"} options={selectOptions} />

                        <Button type={"button"} onClick={this.handleReset} hidden={!editing}>Отменить</Button>
                        <Button type={"button"} raised={true} onClick={this.handleSubmit}>
                            {editing ? "Сохранить" : "Добавить"}
                        </Button>
                    </ValidationExt>
                </FormExt>
            </div>
        );
    }
}

const mapErrors2 = (props, prevState, errors) => {
    console.log(errors);
    return ({ errors });
};

const stateReducer3 = (reducer: ILocalReducer<Props & IComponentId, IState>) => reducer
    .on(lecturersActions.actions.form.setErrors, mapErrors2)
    .on(lecturersActions.actions.form.setValue, state => ({ errors: [] }));

const enhance3 = compose<typeof Validation>(
    connectState<Props, IState>(
        initState,
        stateReducer3,
    ),
);

export const ValidationExt = enhance3(Validation);

const mapStateToProps2 = (state, props) => {
    const lecturer = getLecturer(state);
    return {
        values: {
            ...lecturer,
            gender: "" + lecturer.gender,
        },
    };
};

const enhance2 = compose<typeof Form>(
    connect(
        mapStateToProps2,
        lecturersActions.mapDispatch.form,
    ),
);

export const FormExt = enhance2(Form);

const mapStateToProps = state => {
    const { editing, lecturer: { id, fullName } } = getLecturerForm(state);
    return {
        editing,
        editingId: id,
        name: fullName,
    };
};

const enhance = compose<React.ComponentClass>(
    connectWithComponentId(
        mapStateToProps,
        lecturersActions.mapDispatch.form,
    ),
);

export const LecturerForm = enhance(LecturerFormClass);
