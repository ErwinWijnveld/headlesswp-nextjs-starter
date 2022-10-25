import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import Flexible from "../../components/Flexible";
import Layout from "../../components/layout";
import Image from "../../components/presets/Image";
import Archive from "../../components/projects/Archive";

import {
    getAllProjectsWithSlug,
    getProjectAndMoreProjects,
} from "../../lib/api";

export default function Post({ project, moreProjects, optionsMenu, preview }) {
    const router = useRouter();

    if (!router.isFallback && !project?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    console.log(moreProjects);

    return (
        <Layout preview={preview} seo={project?.seo} optionsMenu={optionsMenu}>
            <div className="max-w-4xl container text-center mt-12">
                {project?.projectCategories?.nodes[0]?.name && (
                    <Link
                        href={
                            project?.projectCategories?.nodes[0]?.uri ||
                            "/projects"
                        }
                    >
                        <a className="block text-center text-lg font-semibold text-slate-600">
                            {project?.projectCategories?.nodes[0]?.name}
                        </a>
                    </Link>
                )}
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
            <h2 className="container max-w-7xl mb-0">Other Projects:</h2>
            <Archive projects={moreProjects} />
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
    let moreProjects = {
        nodes: data?.projects?.nodes.filter(
            (node) => node.slug !== params?.slug
        ),
    };

    // If there are still 4 projects, remove the last one
    if (moreProjects?.nodes?.length > 3) moreProjects.nodes.pop();

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
