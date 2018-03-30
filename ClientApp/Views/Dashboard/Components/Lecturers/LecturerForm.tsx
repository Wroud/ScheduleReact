import { IApplicationState } from "@app/store";
import * as React from "react";
import { connect } from "react-redux";
import { Button, ButtonIcon } from "rmwc/Button";
import { FormField } from "rmwc/FormField";
import { Select } from "rmwc/Select";
import { TextField, TextFieldHelperText, TextFieldIcon } from "rmwc/TextField";

import { ILecturer } from "@app/store/database";
import * as Actions from "../../actions";
import { lecturerFormReducer } from "../../reducers";
import { ILecturerFormState } from "../../Store/Lecturers";

type Props =
    {
        editingId: string;
        editing: boolean;
    }
    & typeof Actions.lecturersActionCreators.form;

class LecturerForm extends React.Component<Props> {
    private FirstNameField: React.ComponentClass<any>;
    private LastNameField: React.ComponentClass<any>;
    private SecondNameField: React.ComponentClass<any>;
    private FullNameField: React.ComponentClass<any>;
    private GenderSelect: React.ComponentClass<any>;

    public constructor(props: Props) {
        super(props);
        this.FirstNameField = FormTextField("firstName", "Fist Name");
        this.LastNameField = FormTextField("lastName", "Last Name");
        this.SecondNameField = FormTextField("secondName", "Second Name");
        this.FullNameField = FormTextField("fullName", "Full Name");
        this.GenderSelect = FormSelect("gender", "Gender");
    }

    public handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = !target.name ? target.id : target.name;

        // tslint:disable-next-line:no-object-literal-type-assertion
        this.props.actions.update({
            [name]: value,
        } as ILecturer);
    }
    public handleReset = () => {
        this.props.actions.reset();
    }
    public handleSubmit = () => {
        if (this.props.editing) {
            this.props.actions.save();
        } else {
            this.props.actions.add();
        }
    }
    public render() {
        const { editingId, editing } = this.props;
        const attr = { required: true, dense: true };
        const selectOptions = [{ value: "0", label: "Мужчина" }, { value: "1", label: "Женщина" }];
        const { FirstNameField, SecondNameField, LastNameField, FullNameField, GenderSelect } = this;
        return (
            <div>
                {editing ? "Изменить" : "Добавить"} лектора <span className="mdc-typography--caption" />
                <br />
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
    (state) => ({
            name,
            id: name,
            label,
            value: lecturerFormReducer.stateSelector(state).lecturer[name],
            ...attr,
        }),
    () => ({}),
)(TextField);

export const FormSelect = (name: string, label: string, ...attr: any[]) => connect(
    (state) => ({
        name,
        id: name,
        label,
        value: lecturerFormReducer.stateSelector(state).lecturer[name] + "",
        ...attr,
    }),
    () => ({}),
)(Select);

export default connect(
    (state) => {
        const mapState = lecturerFormReducer.stateSelector(state);
        return {
            editing: mapState.editing,
            editingId: mapState.lecturer.id,
        };
    },
    Actions.lecturersActionsMap.form,
)(LecturerForm);
