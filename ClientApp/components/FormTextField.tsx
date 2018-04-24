import * as React from "react";
import {
    FieldContext,
    Form,
    IField,
    IFieldClassProps,
} from "react-painlessform";
import { TextField, TextFieldHelperText } from "rmwc/TextField";

interface IProps {
    label: string;
    required?: boolean;
    [key: string]: any;
}

export class FormTextField extends React.Component<IProps> {
    render() {
        const { label, required, children, ...rest } = this.props;
        return (
            <FieldContext>
                {({
                    name,
                    value,
                    isVisited,
                    isValid,
                    isChanged,
                    validationErrors,
                    validationScope,
                    onClick,
                    onChange,
                    formState,
                    children: _,
                    ...fieldRest,
                }: IFieldClassProps<string, string, any>) =>
                    (
                        <>
                            <TextField
                                id={name}
                                name={name}
                                value={value}
                                label={label}
                                required={required}
                                onClick={onClick}
                                onChange={onChange}
                                {...rest}
                                {...fieldRest}
                            />
                            <TextFieldHelperText
                                persistent={isVisited}
                                validationMsg={!isValid}
                            >
                                {validationErrors && validationErrors.filter(error =>
                                    !isChanged
                                    || !error.meta
                                    || error.meta.type !== "server",
                                ).map((error, id) => (
                                    <span key={id}>{error.message}<br /></span>
                                ))}
                            </TextFieldHelperText>
                        </>
                    )
                }
            </FieldContext>
        );
    }
}
