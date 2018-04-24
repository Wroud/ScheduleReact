import * as React from "react";

import { Button } from "rmwc/Button";
import { Typography } from "rmwc/Typography";

import { FormSelectField } from "@app/components/FormSelectField";
import { FormTextField } from "@app/components/FormTextField";
import { ILecturer } from "@app/store/database";

import { lecturersActions } from "../../../actions";

import { createFormFactory } from "react-painlessform";
import { Form, FormContext } from "./Form";
import { formValidator, Validation } from "./Validation";

const { Field } = createFormFactory<ILecturer>();

export type Props =
    {
        isEditing: boolean;
    }
    & typeof lecturersActions.mapCreators.form;

export class LecturerFormClass extends React.Component<Props> {
    selectOptions = [
        { value: "0", label: "Мужчина" },
        { value: "1", label: "Женщина" },
    ];
    handleModelUpdate = (model: ILecturer) => this.props.actions.setValue(model);
    handleReset = () => this.props.actions.reset();
    handleSubmit = () => (values: any) => {
        const { isEditing, actions } = this.props;
        if (isEditing) {
            actions.requestSave();
        } else {
            actions.requestAdd();
        }
    }
    render() {
        const { isEditing } = this.props;
        return (
            <Form
                onSubmit={this.handleSubmit}
                onReset={this.handleReset}
                onModelChange={this.handleModelUpdate}
            >
                <FormContext>
                    {({ isSubmitting, model }) => (
                        <Validation validator={formValidator}>
                            <Typography use="title" tag={"div"}>
                                {isEditing ? "Изменить" : "Добавить"} лектора
                            </Typography>
                            <Typography use="subheading1" tag={"div"}>
                                {model.fullName.value}
                            </Typography>

                            <input name={"id"} value={model.id.value} readOnly={true} hidden={true} />

                            <Field name={"firstName"} disabled={isSubmitting}>
                                <FormTextField label={"First Name"} />
                            </Field>
                            <Field name={"secondName"} disabled={isSubmitting}>
                                <FormTextField label={"Second Name"} />
                            </Field>
                            <Field name={"lastName"} disabled={isSubmitting}>
                                <FormTextField label={"Last Name"} />
                            </Field>
                            <Field name={"fullName"} disabled={isSubmitting}>
                                <FormTextField label={"Full Name"} />
                            </Field>
                            <Field name={"gender"} disabled={isSubmitting}>
                                <FormSelectField label={"Gender"} options={this.selectOptions} />
                            </Field>

                            <div className={"form-actions"}>
                                <Button
                                    type={"button"}
                                    onClick={this.handleReset}
                                    hidden={!isEditing}
                                    disabled={isSubmitting}
                                >
                                    Отменить
                                </Button>
                                <Button type={"submit"} raised={true} disabled={isSubmitting}>
                                    {isEditing ? "Сохранить" : "Добавить"}
                                </Button>
                            </div>
                        </Validation>
                    )}
                </FormContext>
            </Form>
        );
    }
}
