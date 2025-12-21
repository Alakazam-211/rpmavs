import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  target?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function GlassButton({ 
  children, 
  href, 
  onClick, 
  variant = 'secondary',
  className = '',
  target,
  type = 'button'
}: GlassButtonProps) {
  const baseClasses = `px-6 py-3 rounded-full font-semibold transition-all duration-200 min-h-[44px] flex items-center justify-center gap-2 cursor-pointer ${
    variant === 'primary' ? 'glass-button-primary text-white' : 'glass-button text-gray-800'
  } ${className}`;

  if (href && type === 'button') {
    return (
      <Link href={href} target={target} className="inline-block">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={baseClasses}
        >
          {children}
        </motion.button>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={baseClasses}
    >
      {children}
    </motion.button>
  );
}








