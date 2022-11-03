import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout';
import Container from '../../components/posts/container';
import HeroPost from '../../components/posts/hero-post';
import Intro from '../../components/posts/intro';
import MoreStories from '../../components/posts/more-stories';
import { CMS_NAME } from '../../lib/constants';
import { getAllPostsForHome } from '../../lib/queries/posts';

export default function Index({ allPosts: { edges }, preview, optionsMenu }) {
    const heroPost = edges[0]?.node;
    const morePosts = edges.slice(1);

    return (
        <Layout preview={preview} optionsMenu={optionsMenu}>
            <Head>
                <title>Posts</title>
            </Head>
            <div className="py-12 container">
                <Intro title="Posts." />
                {heroPost && (
                    <HeroPost
                        title={heroPost.title}
                        coverImage={heroPost.featuredImage}
                        date={heroPost.date}
                        author={heroPost.author}
                        slug={heroPost.slug}
                        excerpt={heroPost.excerpt}
                    />
                )}
                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
    const data = await getAllPostsForHome(preview);

    const allPosts = data?.posts;
    const { optionsMenu } = data;

    return {
        props: { allPosts, optionsMenu, preview },
        revalidate: 10,
    };
};
