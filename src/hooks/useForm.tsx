import { Field, Form as FormikForm, Formik } from 'formik';
import { createContext, useContext, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { PulseLoader } from 'react-spinners';
import * as Yup from 'yup';
import { mutateAPI } from '../lib/api';
import { useNotification } from './useNotification';

interface FormProps {
    gfForm: {
        databaseId: number;
        formFields: {
            nodes: Array<{
                id: number;
                description: string;
                label: string;
                type: string;
                isRequired: boolean;
                placeholder: string;
            }>;
        };
    };
}

export const FormContext = createContext(null);

export const FormContextProvider = ({ children, value }) => {
    return (
        <FormContext.Provider value={value}>{children}</FormContext.Provider>
    );
};

export function useForm() {
    const forms = useContext(FormContext);
    const { showNotification } = useNotification();
    const captchaRef = useRef(null);

    /**
     *
     * @param id
     * @returns Form with databaseId that matches id
     */
    const getFormById = (id: number) => {
        const form = forms?.find((form) => form.databaseId === id);
        return form || null;
    };

    /**
     *
     * @param type
     * @returns String
     */
    const getFieldType = (type: any) => {
        switch (type) {
            case 'TEXT':
                return 'text';
            case 'TEXTAREA':
                return 'textarea';
            case 'EMAIL':
                return 'email';
            case 'PHONE':
                return 'tel';
            default:
                return 'text';
        }
    };

    /**
     * gets yup data type for field
     * @param type
     * @returns string
     */
    const getFieldDataType = (type: any) => {
        switch (type) {
            default:
                return 'string';
        }
    };

    /**
     * Makes sumbit form mutation to wp gravityforms
     * @param values
     * @param formFields
     * @param setLoading
     * @param setError
     */
    const submitForm = (values, formFields, setLoading, setError) => {
        if (!captchaRef.current.getValue()) {
            showNotification({
                message: 'Please check Captcha',
                type: 'error',
            });
            return;
        }
        captchaRef.current.reset();

        setLoading(true);

        let fieldsWithValue = [];

        for (const [key, value] of Object.entries(values)) {
            // dont add if value is empty
            if (value == '') continue;

            // get index of field
            const index = formFields.findIndex((field) => field.label === key);

            // return appropriate format
            switch (formFields[index].type) {
                case 'TEXT':
                    fieldsWithValue.push({
                        id: formFields[index].id,
                        value,
                    });
                    break;

                case 'EMAIL':
                    fieldsWithValue.push({
                        id: formFields[index].id,
                        emailValues: { value },
                    });
                    break;

                default:
                    fieldsWithValue.push({
                        id: formFields[index].id,
                        value,
                    });
                    break;
            }
        }

        const fieldsWithValueClean = JSON.stringify(fieldsWithValue);
        const graphQLfieldsWithValue = fieldsWithValueClean.replace(
            /"([^(")"]+[^\\"]+)":/g,
            '$1:'
        );

        submitGfForm(1, graphQLfieldsWithValue)
            .then((res) => {
                setLoading(false);
                if (res?.data?.submitGfForm?.entry) {
                    setError(null);
                    showNotification({
                        message: 'Form submitted successfully',
                        type: 'success',
                    });
                } else {
                    setError({
                        ids: res?.data?.submitGfForm?.errors?.map(
                            (err) => err.id
                        ),
                    });
                    showNotification({
                        message: 'Form submission failed',
                        type: 'error',
                    });
                }
            })
            .catch((err) => {
                setLoading(false);
                showNotification({
                    message: 'Form submission failed',
                    type: 'error',
                });
            });
    };

    /**
     * Regex for phone validation
     */
    const phoneRegExp =
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

    /**
     *  Formik form yp validationschema
     * @param formFields
     * @returns Yup schema for form
     */
    const validationSchema = (formFields) =>
        Yup.object().shape(
            formFields.reduce((acc, field) => {
                const fieldType = getFieldDataType(field.type);

                let fieldSchema = Yup[fieldType]();

                // if field is required, add required validation
                fieldSchema = field?.isRequired
                    ? fieldSchema.required('Required')
                    : fieldSchema;

                // if field is email, add email validation
                fieldSchema =
                    getFieldType(field.type) === 'email'
                        ? fieldSchema.email('Invalid email')
                        : fieldSchema;

                // if field is number, add number validation
                fieldSchema =
                    getFieldType(field.type) === 'tel'
                        ? fieldSchema.matches(
                              phoneRegExp,
                              'Phone number is not valid'
                          )
                        : fieldSchema;

                return { ...acc, [field.label]: fieldSchema };
            }, {})
        );

    /**
     * Gets initial values for formik
     * @param formFields
     * @returns empty states for form fields
     */
    const getInitialValues = (formFields) =>
        formFields?.reduce((acc, field) => {
            acc[field.label] = field?.type === 'FILEUPLOAD' ? null : '';
            return acc;
        }, {});

    /**
     * Form component with all fields and loading states
     * @param {gfForm}
     * @returns Form component
     */
    const Form = ({ gfForm }: FormProps) => {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const formFields = gfForm?.formFields?.nodes;

        return (
            <div>
                <Formik
                    initialValues={getInitialValues(formFields)}
                    validationSchema={validationSchema(formFields)}
                    onSubmit={(values) =>
                        submitForm(values, formFields, setLoading, setError)
                    }
                >
                    {({ errors, touched }) => (
                        <FormikForm>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {formFields?.map((node, index) => {
                                    return (
                                        <div
                                            className={`gfield mb-2 col-span-2`}
                                            key={index}
                                        >
                                            <div className="mb-2 tracking-wider text-lg font-Impact">
                                                {node?.label}
                                            </div>
                                            <Field
                                                name={node?.label}
                                                className={`bg-slate-100 p-3 w-full h-[40px] font-OpenSans border-none border-[2px] rounded-md  ${
                                                    errors[node?.label] &&
                                                    touched[node?.label] &&
                                                    '!border-red-500'
                                                }
                                                    ${
                                                        node?.type ===
                                                            'TEXTAREA' &&
                                                        'h-[200px]'
                                                    }                                                        
                                                    `}
                                                placeholder={node?.placeholder}
                                                type={node?.type}
                                                required={node?.isRequired}
                                                as={
                                                    node?.type === 'TEXTAREA'
                                                        ? CustomInputComponentTextArea
                                                        : null
                                                }
                                            />
                                            {errors[node?.label] &&
                                            touched[node?.label] ? (
                                                <div>
                                                    {/* {
                                                            errors[
                                                                field
                                                                    ?.placeholder
                                                            ]
                                                        } */}
                                                </div>
                                            ) : null}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="w-full flex sm:flex-row flex-col gap-5 justify-between items-center">
                                <button
                                    type="submit"
                                    className={` bg-yellow rounded-[8px] w-full bg-slate-900 md:w-auto md:px-24 py-3 text-white text-lg font-Impact ${
                                        loading &&
                                        'opacity-30 pointer-events-none'
                                    }`}
                                >
                                    Verzenden
                                </button>
                                {loading && (
                                    <div className="absolute pt-2 sm:ml-28">
                                        <PulseLoader
                                            color="#000000"
                                            speedMultiplier={0.7}
                                        />
                                    </div>
                                )}
                                <div className="">
                                    <ReCAPTCHA
                                        sitekey="6LceAPMiAAAAAN3TdYGWEiiYzqWx3-IKRuoQAUpi"
                                        ref={captchaRef}
                                    />
                                </div>
                            </div>
                        </FormikForm>
                    )}
                </Formik>
            </div>
        );
    };

    async function submitGfForm(id: number, formFields: string) {
        const data = await mutateAPI(
            `
            mutation submitForm($id: ID!) {
                submitGfForm(
                    input: { 
                        id: $id
                        fieldValues: ${formFields}
                    }
                ) {
                    entry {
                        id
                    }
                    errors {
                        id
                        message
                    }
                }
            }
        `,
            {
                variables: {
                    id: id,
                },
            }
        );

        return data;
    }

    return { forms, getFormById, Form };
}

/**
 * Custom input components
 *
 * @param props
 * @returns JSX Element
 */

const CustomInputComponentTextArea = (props) => <textarea {...props} />;
