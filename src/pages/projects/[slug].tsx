import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import Flexible from "../../components/Flexible";
import Layout from "../../components/layout";
import Image from "../../components/presets/Image";

import {
    getAllProjectsWithSlug,
    getProjectAndMoreProjects,
} from "../../lib/api";

export default function Post({ project, moreProjects, optionsMenu, preview }) {
    const router = useRouter();

    console.log("project", project);

    if (!router.isFallback && !project?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout preview={preview} seo={project?.seo} optionsMenu={optionsMenu}>
            <div className="max-w-4xl container text-center mt-12">
                <span className="block text-center text-lg font-semibold text-slate-600">
                    {project?.projectCategories?.edges[0]?.node?.name}
                </span>
                <h1 className="mb-8">{project?.title}</h1>

                {project?.featuredImage?.node?.sourceUrl && (
                    <div className="h-[300px] w-full relative overflow-hidden rounded-xl mb-8">
                        <Image
                            image={project?.featuredImage?.node}
                            layout="fill"
                        />
                    </div>
                )}
            </div>
            <Flexible flexible={project?.flexibleProject} />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({
    params,
    preview = false,
    previewData,
}) => {
    const data = await getProjectAndMoreProjects(
        params?.slug,
        preview,
        previewData
    );

    // Filter out the main project
    let moreProjects = data?.projects?.edges.filter(
        ({ node }) => node.slug !== params?.slug
    );

    // If there are still 3 projects, remove the last one
    if (moreProjects?.edges?.length > 2) moreProjects.edges.pop();

    return {
        props: {
            preview,
            project: data.project,
            moreProjects: moreProjects,
            optionsMenu: data.optionsMenu,
        },
        revalidate: 10,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const allProjects = await getAllProjectsWithSlug();

    return {
        paths:
            allProjects.edges.map(({ node }) => `/projects/${node.slug}`) || [],
        fallback: true,
    };
};
