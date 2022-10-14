import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import {
    createContext,
    Fragment,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

export const NotificationContext = createContext(null);

export const NotificationContextProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);
    const [isShown, setIsShown] = useState(false);

    return (
        <NotificationContext.Provider
            value={{ notification, isShown, setNotification, setIsShown }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

interface Notification {
    message: string;
    type: "success" | "error";
}

export function useNotification() {
    const { notification, isShown, setNotification, setIsShown } =
        useContext(NotificationContext);

    const showNotification = useCallback(({ message, type }: Notification) => {
        setNotification({ message, type });
        setIsShown(true);
    }, []);

    const hideNotification = useCallback(() => {
        setIsShown(false);
    }, []);

    return { notification, isShown, showNotification, hideNotification };
}

export default function Notifications() {
    const { isShown, hideNotification, notification } = useNotification();

    console.log("notification", notification);

    useEffect(() => {
        setTimeout(() => {
            isShown && hideNotification();
        }, 7500);
    }, [isShown]);

    const animationDuration = 0.3;
    const notiAnimations = {
        hidden: {
            opacity: 0,
            x: 100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: animationDuration,
            },
        },
        exit: {
            opacity: 0,
            x: 100,
            transition: {
                duration: animationDuration,
            },
        },
    };

    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <AnimatePresence>
                {isShown ? (
                    <motion.div
                        aria-live="assertive"
                        className="z-[9999] w-full max-w-sm  fixed top-0 right-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
                        variants={notiAnimations}
                        key={isShown}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                            <div className="pointer-events-auto w-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            {notification?.type ===
                                            "success" ? (
                                                <CheckCircleIcon
                                                    className="h-6 w-6 text-green-400"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <XMarkIcon
                                                    className="h-6 w-6 text-red-400"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </div>
                                        <div className="ml-3 w-0 flex-1 pt-0.5">
                                            <p className="text-sm font-medium text-gray-900 capitalize">
                                                {notification?.type}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {notification?.message}
                                            </p>
                                        </div>
                                        <div className="ml-4 flex flex-shrink-0">
                                            <button
                                                type="button"
                                                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={hideNotification}
                                            >
                                                <span className="sr-only">
                                                    Close
                                                </span>
                                                <XMarkIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    );
}
