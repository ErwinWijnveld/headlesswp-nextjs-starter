import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/layout";
import Container from "../components/posts/container";
import HeroPost from "../components/posts/hero-post";
import Intro from "../components/posts/intro";
import MoreStories from "../components/posts/more-stories";
import { getAllPostsForHome } from "../lib/api";
import { CMS_NAME } from "../lib/constants";

export default function Index({ allPosts: { edges }, preview }) {
    const SAMPLE_DATA = [
        {
            title: "Posts",
            description: "Posts",
            uri: "/posts",
        },
        {
            title: "Sample page",
            description: "Sample page",
            uri: "/sample-page",
        },
    ];
    return (
        <Layout preview={preview}>
            <Head>
                <title>HeadlessWP/Next.js starter</title>
            </Head>
            <Container>
                <Intro />

                <ul className="lis list-decimal text-5xl font-bold pl-10">
                    {SAMPLE_DATA.map((item, index) => (
                        <li key={index}>
                            <Link href={item.uri}>
                                <a>{item.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Container>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
    const allPosts = "await getAllPostsForHome(preview)";

    return {
        props: { allPosts, preview },
        revalidate: 10,
    };
};
