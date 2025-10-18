import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv: any = motion.div;

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <MotionDiv
      className={`glass-card ${className}`}
      whileHover={{ translateY: -4, transition: { duration: 0.18 } }}
      whileTap={{ translateY: 0 }}
      initial={{ opacity: 1 }}
    >
      {children}
    </MotionDiv>
  );
}
