import { getPartialName } from '../lib/helpers';
import Form from './flexible/Form';
import Spacer from './flexible/Spacer';
import Wysiwyg from './flexible/Wysiwyg';

interface FlexibleProps {
    flexible: any;
}

const Flexible = ({ flexible }: FlexibleProps) => {
    let partials = [];

    flexible?.flexContent.map((flex: any, index: number) => {
        const partialName = flex?.__typename
            ? getPartialName(flex.__typename)
            : null;

        switch (partialName) {
            case 'spacer':
                partials.push(
                    <Spacer key={index} fields={flex?.[partialName]} />
                );
                return;
            case 'wysiwyg':
                partials.push(
                    <Wysiwyg key={index} fields={flex?.[partialName]} />
                );
                return;

            case 'form':
                partials.push(
                    <Form key={index} fields={flex?.[partialName]} />
                );
                return;

            default:
                return <div>No fields</div>;
        }
    });

    return <>{partials.map((partial) => partial)}</>;
};

export default Flexible;
