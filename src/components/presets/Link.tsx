import DefaultLink, { LinkProps } from "next/link";

type NewLinkProps = LinkProps & {
    children?: React.ReactNode;
};

const Link = ({ children, ...rest }: NewLinkProps) => {
    return (
        <DefaultLink {...rest} scroll={rest.scroll || false}>
            {children}
        </DefaultLink>
    );
};
export default Link;
