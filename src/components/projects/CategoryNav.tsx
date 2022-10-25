import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function CategoryNav({ categories }) {
    if (!categories?.nodes) {
        return null;
    }
    const nodes = categories?.nodes;
    const router = useRouter();
    const asPath = useRef(router.asPath);
    const pathName = useRef(router.pathname);

    const categoryNav = [
        {
            name: "All",
            uri: "/projects",
            current: pathName.current === "/projects",
        },
        ...nodes,
    ];

    categoryNav.map((category) => {
        // add current true to item if it matches the current page
        if (category.uri === asPath.current + "/") {
            category.current = true;
        }
    });

    return (
        <div className="container max-w-7xl">
            <div>
                <nav className="flex space-x-4" aria-label="Tabs">
                    {categoryNav?.map((tab, index) => (
                        <Link href={tab.uri} key={index}>
                            <a
                                className={classNames(
                                    tab.current
                                        ? "bg-indigo-100 text-slate-700"
                                        : "text-gray-500 hover:text-gray-700",
                                    "px-3 py-2 font-medium text-sm rounded-md"
                                )}
                                aria-current={tab.current ? "page" : undefined}
                            >
                                {tab.name}
                            </a>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
