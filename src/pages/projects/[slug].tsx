import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Flexible from "../../components/Flexible";
import Layout from "../../components/layout";
import Container from "../../components/posts/container";
import MoreStories from "../../components/posts/more-stories";
import PostBody from "../../components/posts/post-body";
import PostHeader from "../../components/posts/post-header";
import PostTitle from "../../components/posts/post-title";
import SectionSeparator from "../../components/posts/section-separator";
import Tags from "../../components/posts/tags";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";

export default function Post({ post, morePosts, optionsMenu, preview }) {
    const router = useRouter();

    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout preview={preview} seo={post?.seo} optionsMenu={optionsMenu}>
            <div className="container py-24">
                {router.isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                ) : (
                    <>
                        <article>
                            <PostHeader
                                title={post.title}
                                coverImage={post.featuredImage}
                                date={post.date}
                                author={post.author}
                                categories={post.categories}
                            />
                            <Flexible flexible={post?.flexiblePost} />
                            <PostBody content={post.content} />
                            <footer>
                                {post.tags.edges.length > 0 && (
                                    <Tags tags={post.tags} />
                                )}
                            </footer>
                        </article>

                        <SectionSeparator />
                        {morePosts.length > 0 && (
                            <MoreStories posts={morePosts} />
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({
    params,
    preview = false,
    previewData,
}) => {
    const data = await getPostAndMorePosts(params?.slug, preview, previewData);

    // Filter out the main post
    let morePosts = data?.posts?.edges.filter(
        ({ node }) => node.slug !== params?.slug
    );

    // If there are still 3 posts, remove the last one
    if (morePosts?.edges?.length > 2) morePosts.edges.pop();

    return {
        props: {
            preview,
            post: data.post,
            morePosts: morePosts,
            optionsMenu: data.optionsMenu,
        },
        revalidate: 10,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const allPosts = await getAllPostsWithSlug();

    return {
        paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
        fallback: true,
    };
};
