/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          sky: colors.sky,
          teal: colors.teal,
          rose: colors.rose,
        },
      },
    },
  }
  ```
*/
import {
    AcademicCapIcon,
    BanknotesIcon,
    CheckBadgeIcon,
    ClockIcon,
    DocumentCheckIcon,
    DocumentDuplicateIcon,
    DocumentIcon,
    DocumentTextIcon,
    FolderOpenIcon,
    HomeIcon,
    NewspaperIcon,
    PencilSquareIcon,
    ReceiptRefundIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function HomepageNav({ isPage }) {
    const actions = [
        {
            title: "Homepage",
            href: "/",
            icon: HomeIcon,
            iconForeground: "text-indigo-700",
            iconBackground: "bg-indigo-100",
            text: 'In your backend, create a page with the slug "home" and publish it. Go to Settings -> select A static page and choose "Home" from the dropdown.',
        },
        {
            title: "Sample page",
            href: "/sample-page",
            icon: DocumentTextIcon,
            iconForeground: "text-indigo-700",
            iconBackground: "bg-indigo-100",
            text: "Sample page created in your wordpress backend. Go to Pages -> Sample page -> Add content row, add some content and publish it.",
        },
        {
            title: "Posts",
            href: "/posts",
            icon: DocumentDuplicateIcon,
            iconForeground: "text-fuchsia-700",
            iconBackground: "bg-fuchsia-100",
            text: "These are your standard wordpress posts, create some new posts in your wordpress backend, give them a thumbnail and publish them.",
        },
        {
            title: "Hello World!",
            href: "/posts/hello-world",
            icon: NewspaperIcon,
            iconForeground: "text-fuchsia-700",
            iconBackground: "bg-fuchsia-100",
            text: "Sample post created in your wordpress backend. Go to Posts -> Hello world! -> Add content row, add some content + thumbnail and publish it.",
        },
        {
            title: "Projects",
            href: "/projects",
            icon: FolderOpenIcon,
            iconForeground: "text-purple-700",
            iconBackground: "bg-purple-100",
            text: 'This is a custom post type "Projects", create a project in your wordpress backend, add some content and publish it.',
        },
        {
            title: "Preview drafts",
            href: `/api/preview-page?secret=HeadlessPreviewSecret&slug=privacy-policy`,
            icon: PencilSquareIcon,
            iconForeground: "text-purple-700",
            iconBackground: "bg-purple-100",
            text: `To preview posts, pages and projects that are in draft mode, click on this box and view the link`,
        },
    ];
    return (
        <div className=" overflow-hidden rounded-lg bg-gray-200 min-h-screen flex items-center py-12">
            <div className="sm:grid sm:grid-cols-2 sm:gap-px container">
                {!isPage && (
                    <div
                        className={classNames(
                            "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 col-span-2 rounded-tl-lg rounded-tr-lg sm:rounded-tr-none sm:rounded-tr-lg"
                        )}
                    >
                        <h1 className="text-sm text-gray-500 text-center max-w-3xl mx-auto mb-0">
                            You haven't added a Homepage, In your backend, go to
                            pages and create a page with the slug "home" and
                            publish it. Go to Settings {`${"->"}`} select A
                            static page and choose "Home" from the dropdown.
                        </h1>
                    </div>
                )}
                {actions.map((action, actionIdx) => (
                    <div
                        key={action.title}
                        className={classNames(
                            actionIdx === 0 && isPage
                                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                                : "",
                            actionIdx === 1 && isPage ? "sm:rounded-tr-lg" : "",
                            actionIdx === actions.length - 2
                                ? "sm:rounded-bl-lg"
                                : "",
                            actionIdx === actions.length - 1
                                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                                : "",
                            "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
                        )}
                    >
                        <div>
                            <span
                                className={classNames(
                                    action.iconBackground,
                                    action.iconForeground,
                                    "rounded-lg inline-flex p-3 ring-4 ring-white"
                                )}
                            >
                                <action.icon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-lg font-medium">
                                <Link
                                    href={action.href}
                                    className="focus:outline-none"
                                >
                                    <a className="focus:outline-none">
                                        {/* Extend touch target to entire panel */}
                                        <span
                                            className="absolute inset-0"
                                            aria-hidden="true"
                                        />
                                        {action.title}
                                    </a>
                                </Link>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                {action.text}
                            </p>
                        </div>
                        <span
                            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                            aria-hidden="true"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
