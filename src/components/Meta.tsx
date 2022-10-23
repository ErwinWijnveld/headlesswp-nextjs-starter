import parse from "html-react-parser";
import Head from "next/head";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "../lib/constants";

interface MetaProps {
    seo: {
        fullHead: string;
    };
}

export default function Meta({ seo }: any) {
    const yoastHead = seo?.fullHead && parse(seo?.fullHead);
    return <Head>{yoastHead}</Head>;
}
