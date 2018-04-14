import * as React from "react";
import {
    Field,
    Form,
} from "react-painlessform";
import { TextField, TextFieldHelperText } from "rmwc/TextField";

interface IProps {
    name: string;
    label: string;
    required?: boolean;
}

export class FormTextField extends React.Component<IProps> {
    render() {
        const { name, label, required } = this.props;
        return (
            <Field name={name}>
                {({
                    name: fieldName,
                    value,
                    isVisited,
                    isValid,
                    validationErrors,
                    onClick,
                    onChange,
                }) => [
                        <TextField
                            key={0}
                            id={fieldName}
                            name={fieldName}
                            value={value}
                            label={label}
                            required={required}
                            onClick={onClick}
                            onChange={onChange}
                        />,
                        <TextFieldHelperText
                            key={1}
                            persistent={isVisited || !isValid}
                            validationMsg={!isValid}
                        >
                            {validationErrors && validationErrors.map((error, id) => <span key={id}>{error}<br /></span>)}
                        </TextFieldHelperText>,
                    ]}
            </Field>
        );
    }
}
