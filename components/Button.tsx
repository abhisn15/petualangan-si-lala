'use client';

import Link from 'next/link';

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
  const baseClasses =
    'inline-flex items-center justify-center rounded-2xl px-8 py-4 text-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-md hover:shadow-lg',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

