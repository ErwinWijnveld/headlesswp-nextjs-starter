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
            <AnimatePresence
                exitBeforeEnter
                onExitComplete={transitionCallback}
            >
                <motion.div
                    key={router.asPath}
                    initial="initialState"
                    animate="animateState"
                    exit="exitState"
                    transition={{
                        duration: 0.75,
                        ease: EASE,
                    }}
                    onAnimationComplete={() => window.scrollTo(0, 0)}
                    variants={{
                        initialState: {
                            opacity: loaded ? 0 : 1,
                            clipPath:
                                "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                        },
                        animateState: {
                            opacity: 1,
                            clipPath:
                                "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                            transition: {
                                duration: 0.3,
                            },
                        },
                        exitState: {
                            opacity: 1,
                            clipPath:
                                "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
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
