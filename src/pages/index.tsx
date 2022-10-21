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
import { getAllPostsForHome, getPageWithPreview } from "../lib/api";
import { CMS_NAME } from "../lib/constants";

export default function Index({ page, optionsMenu, preview }) {
    const router = useRouter();

    if (!router.isFallback && !page?.slug) {
        return (
            <h1 className="flex min-h-screen bg-black items-center justify-center text-center text-white px-[20vw]">
                In your backend, create a page with the slug "home" and publish
                it. Then select A static page (select below) and choose "Home"
                from the dropdown.
            </h1>
        );
        // return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout preview={preview} optionsMenu={optionsMenu}>
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
