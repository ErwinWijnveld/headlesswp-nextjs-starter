import { GetStaticProps } from "next";
import Head from "next/head";
import EmptyState from "../../components/EmptyState";
import Layout from "../../components/layout";
import Container from "../../components/posts/container";
import HeroPost from "../../components/posts/hero-post";
import Intro from "../../components/posts/intro";
import MoreStories from "../../components/posts/more-stories";
import Archive from "../../components/projects/Archive";
import { getAllPostsForHome, getAllProjectsForArchive } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import { getWordpressUrl } from "../../lib/helpers";

export default function Index({ allProjects, preview, optionsMenu }) {
    console.log(allProjects);
    return (
        <Layout preview={preview} optionsMenu={optionsMenu}>
            <div className="container pt-12">
                <Intro />
            </div>
            {allProjects?.nodes?.length > 0 ? (
                <Archive projects={allProjects} />
            ) : (
                <EmptyState
                    title={"No projects"}
                    description={"Get started by creating a new project."}
                    button={{
                        title: "New Project",
                        url: `${getWordpressUrl(
                            process.env.NEXT_PUBLIC_WORDPRESS_URL
                        )}/wp-admin/post-new.php?post_type=project`,
                        target: "_blank",
                    }}
                />
            )}
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
    const data = await getAllProjectsForArchive(preview);

    const allProjects = data?.projects;
    const { optionsMenu } = data;

    return {
        props: { allProjects, optionsMenu, preview },
        revalidate: 10,
    };
};
