import DefaultImage from "next/image";
import React from "react";

interface ImageProps {
    image?: {
        sourceUrl: string;
        altText: string;
        mediaDetails?: {
            width: number;
            height: number;
        };
    };
    [key: string]: any;
}

const Image = (props: ImageProps) => {
    const { image, ...rest } = props;

    const newProps = {
        ...rest,
        src: image?.sourceUrl,
        alt: image?.altText,
        blurDataURL: image?.sourceUrl,
        loader: ({ src }) => src,
    };

    return <DefaultImage {...newProps} />;
};

export default Image;
