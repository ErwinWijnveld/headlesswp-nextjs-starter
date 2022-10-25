import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Flexible from "../components/Flexible";
import Layout from "../components/layout";
import HomepageNav from "../components/presets/HomepageNav";
import { useNotification } from "../hooks/useNotification";
import { getPageWithPreview } from "../lib/api";

export default function Index({ page, optionsMenu, preview }) {
    const router = useRouter();
    const { showNotification } = useNotification();

    useEffect(() => {
        if (!router.isFallback && !page?.slug) {
            showNotification({
                message: "Please create a homepage.",
                type: "error",
            });
            return;
        }
        showNotification({
            message: "Homepage linked successfully!",
            type: "success",
        });
        return;
    }, []);

    if (!router.isFallback && !page?.slug) {
        return <HomepageNav isPage={false} />;
        // return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout preview={preview} optionsMenu={optionsMenu}>
            {/* Remove homepagenav when you start developing */}
            <HomepageNav isPage={true} />

            <Flexible flexible={page?.flexiblePage} />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({
    params,
    preview = false,
    previewData,
}) => {
    const data = await getPageWithPreview("/", preview, previewData);

    return {
        props: {
            preview,
            page: data.page,
            optionsMenu: data.optionsMenu,
        },
        revalidate: 10,
    };
};
