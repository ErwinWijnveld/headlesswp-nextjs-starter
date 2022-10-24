import parse from "html-react-parser";
import Head from "next/head";

export default function Meta({ seo }: any) {
    const yoastHead = seo?.fullHead && parse(seo?.fullHead);
    return <Head>{yoastHead}</Head>;
}
