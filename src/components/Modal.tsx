import { motion } from "framer-motion";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
    const bgVariants = {
        open: { opacity: 1 },
        closed: { opacity: 0 },
    };

    return (
        <motion.div
            className="fixed top-0 left-0 h-screen w-full p-4 flex items-center justify-center z-50"
            animate={"open"}
            initial={"closed"}
            variants={bgVariants}
        >
            <motion.div
                className="absolute w-full h-full left-0 top-0 bg-slate-800 opacity-70"
                onClick={() => onClose()}
            />
            <div className="bg-white rounded-xl container max-w-3xl p-12 max-h-full relative z-10 overflow-auto">
                {children}
            </div>
        </motion.div>
    );
};
export default Modal;
