import { GetStaticProps } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Flexible from "../components/Flexible";
import Hero from "../components/Hero";
import Layout from "../components/layout";
import Container from "../components/posts/container";
import HeroPost from "../components/posts/hero-post";
import Intro from "../components/posts/intro";
import MoreStories from "../components/posts/more-stories";
import HomepageNav from "../components/presets/HomepageNav";
import { getAllPostsForHome, getPageWithPreview } from "../lib/api";
import { CMS_NAME } from "../lib/constants";

export default function Index({ page, optionsMenu, preview }) {
    const router = useRouter();

    if (!router.isFallback && !page?.slug) {
        return <HomepageNav isPage={false} />;
        // return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout preview={preview} optionsMenu={optionsMenu}>
            {/* Remove homepagenav when you start developing */}
            <HomepageNav isPage={false} />

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
