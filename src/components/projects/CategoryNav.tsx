import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function CategoryNav({ categories }) {
    const { nodes } = categories;
    const router = useRouter();

    const categoryNav = [
        {
            name: "All",
            uri: "/projects",
            current: router.pathname === "/projects",
        },
        ...nodes,
    ];

    categoryNav.map((category) => {
        // add current true to item if it matches the current page
        if (category.uri === router.asPath + "/") {
            category.current = true;
        }
    });

    return (
        <div className="container max-w-7xl">
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={categoryNav?.find((tab) => tab.current).name}
                >
                    {categoryNav?.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <nav className="flex space-x-4" aria-label="Tabs">
                    {categoryNav?.map((tab, index) => (
                        <Link href={tab.uri} key={index}>
                            <a
                                className={classNames(
                                    tab.current
                                        ? "bg-indigo-100 text-indigo-700"
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
