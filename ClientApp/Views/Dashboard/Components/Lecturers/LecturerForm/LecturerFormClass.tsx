import * as React from "react";

import { Button } from "rmwc/Button";
import { Typography } from "rmwc/Typography";

import { FormSelectField } from "@app/components/FormSelectField";
import { FormTextField } from "@app/components/FormTextField";
import { ILecturer } from "@app/store/database";

import { lecturersActions } from "../../../actions";

import { Form, FormContext } from "./Form";
import { formValidator, Validation } from "./Validation";

export type Props =
    {
        isEditing: boolean;
    }
    & typeof lecturersActions.mapCreators.form;

export class LecturerFormClass extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    handleReset = () => {
        this.props.actions.reset();
    }
    handleSubmit = () => {
        if (this.props.isEditing) {
            this.props.actions.requestSave();
        } else {
            this.props.actions.requestAdd();
        }
    }
    onSubmit = (values: any) => {
        this.handleSubmit();
    }
    onUpdate = (model: ILecturer) => {
        this.props.actions.setValue(model);
    }
    render() {
        const { isEditing } = this.props;
        const selectOptions = [{ value: "0", label: "Мужчина" }, { value: "1", label: "Женщина" }];
        return (
            <div>
                <Form
                    onSubmit={this.onSubmit}
                    onReset={this.handleReset}
                    onModelChange={this.onUpdate}
                >
                    <FormContext>
                        {({ isSubmitting, model }) => (
                            <Validation validator={formValidator}>
                                <Typography use="title" tag={"div"}>{isEditing ? "Изменить" : "Добавить"} лектора</Typography>
                                <Typography use="subheading1" tag={"div"}>{model.fullName}</Typography>

                                <input name={"id"} value={model.id} hidden={true} />

                                <FormTextField name={"firstName"} label={"First Name"} disabled={isSubmitting} />
                                <FormTextField name={"secondName"} label={"Second Name"} disabled={isSubmitting} />
                                <FormTextField name={"lastName"} label={"Last Name"} disabled={isSubmitting} />
                                <FormTextField name={"fullName"} label={"Full Name"} disabled={isSubmitting} />
                                <FormSelectField
                                    name={"gender"}
                                    placeholder="Gender"
                                    label={"Gender"}
                                    options={selectOptions}
                                    disabled={isSubmitting}
                                />

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
            </div>
        );
    }
}
