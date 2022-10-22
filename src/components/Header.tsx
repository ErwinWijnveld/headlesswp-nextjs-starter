import { Disclosure, Menu, Transition } from "@headlessui/react";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import logo from "../assets/images/logo.svg";
import { useOptions } from "../hooks/useOptions";

/**
 * Filler content for the navigation menu.
 */

const user = {
    name: "Floyd Miles",
    email: "floy.dmiles@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
    {
        link: {
            url: "/",
            title: "Home",
            target: "_self",
        },
    },
    {
        link: {
            url: "/sample-page",
            title: "Sample page",
            target: "_self",
        },
    },
    {
        link: {
            url: "/posts",
            title: "Posts",
            target: "_self",
        },
    },
    {
        link: {
            url: "/projects",
            title: "Projects",
            target: "_self",
        },
    },
];
const breadcrumbs = [
    { name: "Projects", href: "#", current: false },
    { name: "Project Nero", href: "#", current: true },
];
const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];

const settings = [
    {
        name: "Public access",
        description:
            "This project would be available to anyone who has the link",
    },
    {
        name: "Private to Project Members",
        description: "Only members of this project would be able to access",
    },
    {
        name: "Private to you",
        description: "You are the only one able to access this project",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Header() {
    const [selected, setSelected] = useState(settings[0]);

    const options = useOptions();
    const header = options?.header;

    const mainNavigation = header?.menuItems ?? navigation;

    return (
        <>
            <Disclosure as="nav" className="bg-indigo-500" aria-label="Global">
                {({ open }) => (
                    <>
                        <div className="container">
                            <div className="flex h-16 justify-between">
                                <div className="flex items-center px-2 lg:px-0">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Link href={"/"}>
                                            <a className="h-10 w-10 relative">
                                                <Image
                                                    src={
                                                        header?.logo
                                                            ? header?.logo
                                                                  ?.sourceUrl
                                                            : logo
                                                    }
                                                    alt="Logo"
                                                    layout={"fill"}
                                                    objectFit={"contain"}
                                                    priority
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="hidden lg:ml-8 lg:flex lg:space-x-4">
                                        {mainNavigation.map((item, index) => (
                                            <Link
                                                href={item?.link?.url}
                                                target={item?.link?.target}
                                                key={index}
                                            >
                                                <a className="rounded-md py-2 px-3 text-sm font-medium text-white hover:bg-indigo-400">
                                                    {item?.link?.title}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-1 items-center justify-center px-2 md:px-0 lg:ml-6 lg:justify-end">
                                    <div className="w-full max-w-lg lg:max-w-xs">
                                        <label
                                            htmlFor="search"
                                            className="sr-only"
                                        >
                                            Search
                                        </label>
                                        <div className="relative text-white focus-within:text-gray-400">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <MagnifyingGlassIcon
                                                    className="h-5 w-5 flex-shrink-0"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <input
                                                id="search"
                                                name="search"
                                                className="block w-full rounded-md border-transparent bg-indigo-400 py-2 pl-10 pr-3 text-base leading-5 placeholder-white focus:border-white focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                                                placeholder="Search"
                                                type="search"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center lg:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-indigo-200 hover:bg-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>

                                {/* Profile */}
                                {/* <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                    <button
                                        type="button"
                                        className="flex-shrink-0 rounded-full bg-indigo-500 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500"
                                    >
                                        <span className="sr-only">
                                            Notificaitons
                                        </span>
                                        <BellIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>

                                    <Menu
                                        as="div"
                                        className="relative ml-4 flex-shrink-0"
                                    >
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-indigo-500 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500">
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={user.imageUrl}
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div> */}
                            </div>
                        </div>

                        <Disclosure.Panel className="lg:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {mainNavigation.map((item, index) => (
                                    <Link
                                        href={item?.link?.url}
                                        target={item?.link?.target}
                                        key={index}
                                    >
                                        <Disclosure.Button className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-400 hover:text-white">
                                            {item?.link?.title}
                                        </Disclosure.Button>
                                    </Link>
                                ))}
                            </div>

                            {/* Profile */}

                            {/* <div className="border-t border-indigo-500 pt-4 pb-3">
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={user.imageUrl}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-white">
                                            {user.name}
                                        </div>
                                        <div className="text-sm font-medium text-indigo-200">
                                            {user.email}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="ml-auto flex-shrink-0 rounded-full bg-indigo-500 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500"
                                    >
                                        <span className="sr-only">
                                            View notifications
                                        </span>
                                        <BellIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                                <div className="mt-3 px-2">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md py-2 px-3 text-base font-medium text-indigo-200 hover:bg-indigo-400 hover:text-white"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </div> */}
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            {/* Breadcrumb */}
            {/* <nav
                className="hidden border-b border-gray-200 bg-white lg:flex"
                aria-label="Breadcrumb"
            >
                <ol
                    role="list"
                    className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
                >
                    <li className="flex">
                        <div className="flex items-center">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <HomeIcon
                                    className="h-5 w-5 flex-shrink-0"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Home</span>
                            </a>
                        </div>
                    </li>
                    {breadcrumbs.map((item) => (
                        <li key={item.name} className="flex">
                            <div className="flex items-center">
                                <svg
                                    className="h-full w-6 flex-shrink-0 text-gray-200"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 24 44"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                <a
                                    href={item.href}
                                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                >
                                    {item.name}
                                </a>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav> */}
        </>
    );
}
