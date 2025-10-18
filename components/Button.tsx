import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' };

export default function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  const base = variant === 'primary' ? 'btn-primary' : 'px-3 py-1';
  return (
    <button className={`${base} ${className}`} {...rest}>
      {children}
    </button>
  );
}
