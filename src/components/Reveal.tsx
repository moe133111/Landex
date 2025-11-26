"use client";

import { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
};

export function Reveal({ children, delay = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.6,
        ease: [0.22, 0.61, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
