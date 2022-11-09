import { useForm } from '../../hooks/useForm';

interface FormProps {
    fields: {
        formId: any;
    };
}

const Form = ({ fields }: FormProps) => {
    const { getFormById, Form } = useForm();
    const form = getFormById(fields.formId);

    return (
        <section className={`max-w-3xl container`}>
            <Form gfForm={form} />
        </section>
    );
};
export default Form;
