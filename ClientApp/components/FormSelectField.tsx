import * as React from "react";
import {
    FieldContext,
    Form,
    IField,
    IFieldClass,
    IFieldClassProps,
} from "react-painlessform";
import { Select } from "rmwc/Select";
import { TextFieldHelperText } from "rmwc/TextField";

interface IOptions<V> {
    label: string;
    value: V;
    options?: IOptions<V>;
}
interface IOptionsMap<V> {
    [value: string]: V;
}

interface IProps<T> {

    label: string;
    options: Array<IOptions<T>> | Array<IOptionsMap<T>> | T[];
    required?: boolean;
    [key: string]: any;
}

export class FormSelectField<T> extends React.Component<IProps<T>> {
    render() {
        const { field, name, label, options, required, ...rest } = this.props;
        return (
            <FieldContext>
                {({
                    name: fieldName,
                    value,
                    isChanged,
                    isVisited,
                    isValid,
                    validationErrors,
                    validationScope,
                    onClick,
                    onChange,
                    formState,
                    children,
                    ...fieldRest,
                }: IFieldClassProps<string, string, any>) =>
                    (
                        <>
                            <Select
                                id={fieldName}
                                name={fieldName}
                                value={value || "0"}
                                label={label}
                                options={options}
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
                                {validationErrors && validationErrors.map((error, id) => <span key={id}>{error.message}<br /></span>)}
                            </TextFieldHelperText>
                        </>
                    )
                }
            </FieldContext>
        );
    }
}
