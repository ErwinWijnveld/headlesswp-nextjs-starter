import { getPartialName } from "../lib/helpers";
import Spacer from "./Spacer";
import Wysiwyg from "./Wysiwyg";

interface FlexibleProps {
    flexible: any;
}

const Flexible = ({ flexible }: FlexibleProps) => {
    let partials = [];

    console.log(flexible);

    flexible?.flexContent.map((flex: any, index: number) => {
        const partialName = flex?.__typename
            ? getPartialName(flex.__typename)
            : null;

        switch (partialName) {
            case "spacer":
                partials.push(
                    <Spacer key={index} fields={flex?.[partialName]} />
                );
                return;
            case "wysiwyg":
                partials.push(
                    <Wysiwyg key={index} fields={flex?.[partialName]} />
                );
                return;

            default:
                return <div>No fields</div>;
        }
    });

    return <>{partials.map((partial) => partial)}</>;
};

export default Flexible;
