import * as React from "react";
import { Field, FieldRenderProps, Form, FormRenderProps } from "react-final-form";
import { connect } from "react-redux";
import { compose } from "redux";

import { Button, ButtonIcon } from "rmwc/Button";
import { Select } from "rmwc/Select";
import { TextField, TextFieldHelperText } from "rmwc/TextField";
import { Typography } from "rmwc/Typography";

import { IErrorMessage } from "@app/middlewares/JsonQuery";
import { ILecturer } from "@app/store/database";
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

const onSubmit = async values => {
    // await sleep(300);
    // window.alert(JSON.stringify(values, 0, 2));
};

const requiredValidate = value => (value ? undefined : "Required");
const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);
const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

class LecturerFormClass extends React.Component<Props, IState> {
    private FirstNameField: React.ComponentClass<any>;
    private LastNameField: React.ComponentClass<any>;
    private SecondNameField: React.ComponentClass<any>;
    private FullNameField: React.ComponentClass<any>;
    private GenderSelect: React.ComponentClass<any>;

    constructor(props: Props) {
        super(props);

        this.FirstNameField = FormTextField("firstName", "Fist Name");
        this.LastNameField = FormTextField("lastName", "Last Name");
        this.SecondNameField = FormTextField("secondName", "Second Name");
        this.FullNameField = FormTextField("fullName", "Full Name");
        this.GenderSelect = FormSelect("gender", "Gender");
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = !target.name ? target.id : target.name;

        // tslint:disable-next-line:no-object-literal-type-assertion
        this.props.actions.setValue({
            [name]: value,
        } as ILecturer);
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
    validate = (values: object) => {
        const errors = {};
        console.log(this.state);
        Object.keys(values).forEach(name => {
            const error = this.state.errors.find(e => e.name.toLowerCase() === name.toLowerCase());
            if (error) {
                errors[name] = error.message;
            }
        });
        return errors;
    }
    onSubmit = async (values: any) => {
        return undefined;
    }
    renderField = (label: string, required?: boolean) => ({ input, meta }: FieldRenderProps) => {
        return [
            <TextField key={1} id={input.name} {...input} label={label} required={required} />,
            <TextFieldHelperText
                key={2}
                persistent={meta.error && meta.touched}
                validationMsg={meta.error && meta.touched}
                children={meta.error}
            />,
            // {meta.error}
            // </TextFieldHelperText>,
            // <div>
            //     <label>First Name</label>
            //     <input {...input} type="text" placeholder="First Name" />
            //     {meta.error && meta.touched && <span>{meta.error}</span>}
            // </div>
        ];
    }
    renderForm = ({ handleSubmit, reset, submitting, pristine, values }: FormRenderProps) => {
        const { editingId, editing, name } = this.props;
        const attr = { required: true, dense: false };
        const selectOptions = [{ value: "0", label: "Мужчина" }, { value: "1", label: "Женщина" }];
        const { FirstNameField, SecondNameField, LastNameField, FullNameField, GenderSelect } = this;
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstName"
                    label={"Fist Name"}
                    validate={requiredValidate}
                >
                    {this.renderField("Fist Name", true)}
                </Field>
                <input name={"id"} value={editingId} hidden={true} />
                <FirstNameField {...attr} onChange={this.handleInputChange} />
                <SecondNameField {...attr} onChange={this.handleInputChange} />
                <LastNameField {...attr} onChange={this.handleInputChange} />
                <FullNameField {...attr} onChange={this.handleInputChange} />
                <GenderSelect options={selectOptions} onChange={this.handleInputChange} />
                <TextFieldHelperText>Optional help text.</TextFieldHelperText>
                {/* <TextFieldHelperText persistent validationMsg id={7}>The field is required.</TextFieldHelperText> */}

                <Button onClick={this.handleReset} hidden={!editing}>Отменить</Button>
                <Button raised={true} onClick={this.handleSubmit}>
                    {editing ? "Сохранить" : "Добавить"}
                </Button>
            </form>
        );
    }
    render() {
        const { editingId, editing, name } = this.props;
        const attr = { required: true, dense: false };
        const selectOptions = [{ value: "0", label: "Мужчина" }, { value: "1", label: "Женщина" }];
        const { FirstNameField, SecondNameField, LastNameField, FullNameField, GenderSelect } = this;
        return (
            <div>
                <Typography use="title" tag={"div"}>{editing ? "Изменить" : "Добавить"} лектора</Typography>
                <Typography use="subheading1" tag={"div"}>{name}</Typography>
                <Form
                    onSubmit={onSubmit}
                    render={this.renderForm}
                    validate={this.validate}
                />
            </div>
        );
    }
}

export const FormTextField = (name: string, label: string, ...attr: any[]) => connect(
    state => ({
        name,
        id: name,
        label,
        value: getLecturer(state)[name],
        ...attr,
    }),
    () => ({}),
)(TextField);

export const FormSelect = (name: string, label: string, ...attr: any[]) => connect(
    state => ({
        name,
        id: name,
        label,
        value: getLecturer(state)[name] + "",
        ...attr,
    }),
    () => ({}),
)(Select);

const mapStateToProps = state => {
    const mapState = getLecturerForm(state);
    return {
        editing: mapState.editing,
        editingId: mapState.lecturer.id,
        name: mapState.lecturer.fullName,
    };
};

const mapErrors = (props, prevState, errors) => ({ errors });

const stateReducer = (reducer: ILocalReducer<Props & IComponentId, IState>) => reducer
    .on(lecturersActions.actions.form.setErrors, mapErrors);

const initState: IState = {
    errors: [],
};

const enhance = compose<React.ComponentClass>(
    connectWithComponentId(
        mapStateToProps,
        lecturersActions.mapDispatch.form,
    ),
    connectState<Props, IState>(
        initState,
        stateReducer,
    ),
);

export const LecturerForm = enhance(LecturerFormClass);
