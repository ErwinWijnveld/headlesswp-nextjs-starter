import Link from "next/link";
import Image from "../presets/Image";

const Card = ({ project }) => {
    const projectCategories = project?.projectCategories?.nodes || null;
    console.log("projectCategories", project);
    const projectCategory = projectCategories[0];

    return (
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="flex-shrink-0">
                <Link href={`/projects/${project?.slug}`}>
                    <a className="h-48 w-full relative block">
                        <Image
                            image={project.featuredImage?.node}
                            objectFit="cover"
                            layout={"fill"}
                        />
                    </a>
                </Link>
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                    <p className="text-sm font-medium text-slate-400 m-0">
                        <Link href={projectCategory?.uri || "/projects"}>
                            <a className="hover:underline">
                                {projectCategory?.name || "Overige"}
                            </a>
                        </Link>
                    </p>
                    <Link href={`/projects/${project?.slug}`}>
                        <a className="mt-2 block">
                            <p className="text-xl font-semibold text-gray-900">
                                {project?.title}
                            </p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: project?.excerpt,
                                }}
                                className="mt-3 text-base text-gray-500"
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Card;
