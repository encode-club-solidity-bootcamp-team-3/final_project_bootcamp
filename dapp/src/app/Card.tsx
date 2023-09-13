import { PropsWithChildren } from 'react';

export default function Card({ children }: PropsWithChildren) {
  return (
    <div className="rounded-lg border border-gray-200 shadow-md p-4 flex flex-col gap-4 bg-white">
      {children}
    </div>
  );
}
