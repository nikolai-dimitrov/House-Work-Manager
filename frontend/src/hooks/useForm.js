import { useState } from "react";
export const useForm = (initialValues, submitHandler) => {
    const [formValues, setFormValues] = useState(initialValues);

    const onChangeHandler = (e) => {
        setFormValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e, id) => {
        e.preventDefault();
        id ? submitHandler(formValues, id) : submitHandler(formValues);
        setFormValues(initialValues);
    };

    const changeInitialValues = (values) => {
        setFormValues(values);
    };
    return {
        formValues,
        onChangeHandler,
        onSubmit,
        changeInitialValues,
    };
};
