import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export default function Input({ label, className = '', ...rest }: Props) {
  return (
    <div>
      {label && <label className="block text-sm text-slate-300 mb-1">{label}</label>}
      <input className={`input-dark ${className}`} {...rest} />
    </div>
  );
}
