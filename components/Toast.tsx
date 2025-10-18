import React from 'react';

export default function Toast({ message }: { message: string }) {
  return (
    <div className="bg-slate-900 text-white px-4 py-2 rounded shadow">{message}</div>
  );
}
