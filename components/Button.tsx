'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: ButtonProps) {
  // Padding lebih besar di mobile untuk mudah di-klik
  const baseClasses =
    'inline-flex items-center justify-center rounded-2xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 text-base sm:text-lg md:text-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-3 sm:border-4 border-white min-h-[44px] sm:min-h-[48px]';
  
  const variantClasses = {
    primary: 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl active:bg-green-700',
    secondary: 'bg-blue-400 text-white hover:bg-blue-500 shadow-md hover:shadow-lg active:bg-blue-600',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl active:bg-red-700',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  const buttonStyle = { fontFamily: 'var(--font-baloo)' };

  const buttonContent = (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-full h-full flex items-center justify-center"
    >
      {children}
    </motion.div>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} style={buttonStyle}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled} style={buttonStyle}>
      {buttonContent}
    </button>
  );
}
