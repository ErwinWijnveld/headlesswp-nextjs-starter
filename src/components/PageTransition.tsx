import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTransitionFix } from "../hooks/useTransitionFix";
import { EASE } from "../lib/constants";

const PageTransition = ({ children }) => {
    const router = useRouter();
    const transitionCallback = useTransitionFix();

    const [loaded, setLoaded] = useState(null);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div>
            <AnimatePresence onExitComplete={transitionCallback}>
                <motion.div
                    key={router.asPath}
                    className="absolute inset-0 z-50 bg-white"
                    initial="initialState"
                    animate="animateState"
                    exit="exitState"
                    transition={{
                        duration: 1,
                        ease: EASE,
                    }}
                    onAnimationComplete={() => window.scrollTo(0, 0)}
                    variants={{
                        initialState: {
                            opacity: loaded ? 0 : 1,
                        },
                        animateState: {
                            opacity: 1,
                        },
                        exitState: {
                            opacity: 1,
                        },
                    }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default PageTransition;
