import React from "react";
import { motion } from "framer-motion";

export const TweenTransition = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};
