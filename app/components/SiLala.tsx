"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SiLalaProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function SiLala({ size = 120, className = "", animate = true }: SiLalaProps) {
  return (
    <motion.div
      className={className}
      initial={animate ? { scale: 0, rotate: -180 } : {}}
      animate={animate ? { scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.5, type: "spring" }}
      whileHover={animate ? { scale: 1.1, rotate: 5 } : {}}
      style={{ width: size, height: size, position: 'relative' }}
    >
      <Image
        src="/assets/karakter/lala.png"
        alt="Si Lala"
        width={size}
        height={size}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        priority
      />
    </motion.div>
  );
}

