import * as React from "react";
import {
    Field,
    Form,
} from "react-painlessform";
import { Select } from "rmwc/Select";
import { TextFieldHelperText } from "rmwc/TextField";

interface IProps {
    name: string;
    label: string;
    options;
    required?: boolean;
}

export class FormSelectField extends React.Component<IProps> {
    render() {
        const { name, label, options, required } = this.props;
        return (
            <Field name={name} >
                {({
                    name: fieldName,
                    value,
                    isVisited,
                    validationErrors,
                    onClick,
                    onChange,
                }) => [
                        <Select
                            key={0}
                            id={fieldName}
                            name={fieldName}
                            value={value}
                            label={label}
                            options={options}
                            required={required}
                            onClick={onClick}
                            onChange={onChange}
                        />,
                        <TextFieldHelperText
                            key={1}
                            persistent={isVisited || !!validationErrors}
                            validationMsg={!!validationErrors}
                            children={validationErrors && validationErrors}
                        />,
                    ]}
            </Field>
        );
    }
}
