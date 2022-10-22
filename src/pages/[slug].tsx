import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Flexible from "../components/Flexible";
import Layout from "../components/layout";
import Container from "../components/posts/container";
import Header from "../components/posts/header";
import MoreStories from "../components/posts/more-stories";
import PostBody from "../components/posts/post-body";
import PostHeader from "../components/posts/post-header";
import PostTitle from "../components/posts/post-title";
import SectionSeparator from "../components/posts/section-separator";
import Tags from "../components/posts/tags";
import { getAllPagesWithSlug, getPageWithPreview } from "../lib/api";
import { CMS_NAME } from "../lib/constants";

export default function Page({ page, preview, optionsMenu }) {
    const router = useRouter();

    if (!router.isFallback && !page?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout preview={preview} optionsMenu={optionsMenu}>
            <h1 className="container py-12 font-bold text-6xl">
                {page?.title}
            </h1>
            <Flexible flexible={page?.flexible} />
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
        fallback: true,
    };
};
