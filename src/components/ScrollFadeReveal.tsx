import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ScrollFadeRevealProps {
  children: ReactNode;
}

export default function ScrollFadeReveal({ children }: ScrollFadeRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
