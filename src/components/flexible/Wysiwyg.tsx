interface WysiwygProps {
    fields: {
        text: string;
        container?: boolean;
    };
}

const Wysiwyg = ({ fields }: WysiwygProps) => {
    return (
        <section className={`max-w-4xl ${fields?.container && "container"}`}>
            <div
                className="content"
                dangerouslySetInnerHTML={{ __html: fields?.text }}
            ></div>
        </section>
    );
};
export default Wysiwyg;
