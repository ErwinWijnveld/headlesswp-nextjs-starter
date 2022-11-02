import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Flexible from "../components/Flexible";
import Layout from "../components/layout";
import { getAllPagesWithSlug, getPageWithPreview } from "../lib/api";

export default function Page({ page, preview, optionsMenu }) {
    const router = useRouter();

    if (!router.isFallback && !page?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout preview={preview} optionsMenu={optionsMenu}>
            <div className="container max-w-5xl py-12">
                <h1 className=" font-bold text-6xl mb-8">{page?.title}</h1>
                {page?.content && (
                    <div
                        className="content"
                        dangerouslySetInnerHTML={{ __html: page?.content }}
                    />
                )}
            </div>
            <Flexible flexible={page?.flexiblePage} />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({
    params,
    preview = false,
    previewData,
}) => {
    const data = await getPageWithPreview(params?.slug, preview, previewData);

    return {
        props: {
            preview,
            page: data.page,
            optionsMenu: data.optionsMenu,
        },
        revalidate: 10,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const allPages = await getAllPagesWithSlug();

    return {
        paths: allPages.edges.map(({ node }) => `/${node.slug}`) || [],
        fallback: false,
    };
};
