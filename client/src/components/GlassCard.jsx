import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", hover = true, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: 'easeOut' }}
            whileHover={hover ? { y: -4 } : {}}
            className={`pro-card p-6 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
