import * as React from "react";
import {
    Field,
    Form,
} from "react-painlessform";
import { Select } from "rmwc/Select";
import { TextFieldHelperText } from "rmwc/TextField";

interface IOptions {
    label: string;
    value: string;
    options?: IOptions;
}
interface IOptionsMap {
    [value: string]: string;
}

interface IProps {
    name: string;
    label: string;
    options: IOptions[] | IOptionsMap[] | string[];
    required?: boolean;
    [key: string]: any;
}

export class FormSelectField extends React.Component<IProps> {
    render() {
        const { name, label, options, required, ...rest } = this.props;
        return (
            <Field name={name} {...rest} >
                {({
                    name: fieldName,
                    value,
                    isVisited,
                    isValid,
                    validationErrors,
                    onClick,
                    onChange,
                }) => [
                        <Select
                            key={0}
                            id={fieldName}
                            name={fieldName}
                            value={value || "0"}
                            label={label}
                            options={options}
                            required={required}
                            onClick={onClick}
                            onChange={onChange}
                            {...rest}
                        />,
                        <TextFieldHelperText
                            key={1}
                            persistent={isVisited}
                            validationMsg={!isValid}
                            children={validationErrors && validationErrors}
                        />,
                    ]}
            </Field>
        );
    }
}
