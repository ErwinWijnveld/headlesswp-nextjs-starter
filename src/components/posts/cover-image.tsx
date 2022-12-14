import cn from "classnames";
import Image from "next/image";
import placeholder from "../../assets/images/placeholder.png";
import Link from "../presets/Link";

interface Props {
    title: string;
    coverImage: {
        node: {
            sourceUrl: string;
        };
    };
    slug?: string;
}

export default function CoverImage({ title, coverImage, slug }: Props) {
    const image = (
        <Image
            width={2000}
            height={1000}
            alt={`Cover Image for ${title}`}
            src={coverImage?.node.sourceUrl || placeholder}
            objectFit="cover"
            className={cn("shadow-small", {
                "hover:shadow-medium transition-shadow duration-200": slug,
            })}
        />
    );
    return (
        <div className="sm:mx-0">
            {slug ? (
                <Link href={`/posts/${slug}`}>
                    <a aria-label={title}>{image}</a>
                </Link>
            ) : (
                image
            )}
        </div>
    );
}
