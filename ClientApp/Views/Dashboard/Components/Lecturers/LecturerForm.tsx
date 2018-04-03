import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, ButtonIcon } from "rmwc/Button";
import { Select } from "rmwc/Select";
import { TextField, TextFieldHelperText } from "rmwc/TextField";
import { Typography } from "rmwc/Typography";

import { connectState, connectWithComponentId, IComponentId, ILocalReducer } from "@app/middlewares/redux-subreducer";
import { ILecturer } from "@app/store/database";
import { lecturersActions } from "../../actions";
import { getLecturer, getLecturerForm } from "../../selectors";

interface IState {
    errors: string;
}

type Props =
    {
        editingId: string;
        name: string;
        editing: boolean;
    }
    & typeof lecturersActions.mapCreators.form;

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
    render() {
        const { editingId, editing, name } = this.props;
        const attr = { required: true, dense: false };
        const selectOptions = [{ value: "0", label: "Мужчина" }, { value: "1", label: "Женщина" }];
        const { FirstNameField, SecondNameField, LastNameField, FullNameField, GenderSelect } = this;
        return (
            <div>
                <Typography use="title" tag={"div"}>{editing ? "Изменить" : "Добавить"} лектора</Typography>
                <Typography use="subheading1" tag={"div"}>{name}</Typography>
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
    .on(lecturersActions.actions.lecturer.edit, mapErrors);

const initState = {
    errors: "",
};

const enhance = compose<React.ComponentClass>(
    connectState<Props, IState>(
        initState,
        stateReducer,
    ),
    connectWithComponentId(
        mapStateToProps,
        lecturersActions.mapDispatch.form,
    ),
);

export const LecturerForm = enhance(LecturerFormClass);
