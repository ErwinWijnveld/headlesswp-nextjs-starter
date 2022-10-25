import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import EmptyState from "../../components/EmptyState";
import Layout from "../../components/layout";
import Container from "../../components/posts/container";
import HeroPost from "../../components/posts/hero-post";
import Intro from "../../components/posts/intro";
import MoreStories from "../../components/posts/more-stories";
import Archive from "../../components/projects/Archive";
import CategoryNav from "../../components/projects/CategoryNav";
import {
    getAllPostsForHome,
    getAllProjectCategoriesWithSlug,
    getAllProjectsForArchive,
    getProjectsForTaxonomy,
} from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import { getWordpressUrl } from "../../lib/helpers";

export default function ProjectCategory({
    projectCategory,
    projectCategories,
    preview,
    optionsMenu,
}) {
    const allProjects = projectCategory?.projects;
    return (
        <Layout preview={preview} optionsMenu={optionsMenu}>
            <div className="container pt-12">
                <Intro title={projectCategory?.name + "."} />
            </div>
            <CategoryNav categories={projectCategories} />
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

export const getStaticProps: GetStaticProps = async ({
    params,
    preview = false,
}) => {
    const data = await getProjectsForTaxonomy(params?.slug, preview);
    const projectCategory = data?.projectCategory;
    const { optionsMenu, projectCategories } = data;

    return {
        props: { projectCategory, optionsMenu, projectCategories, preview },
        revalidate: 10,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const allProjectCategories = await getAllProjectCategoriesWithSlug();

    return {
        paths:
            allProjectCategories.edges.map(
                ({ node }) => `/projectcategories/${node.slug}`
            ) || [],
        fallback: true,
    };
};
