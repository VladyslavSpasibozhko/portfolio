import type { ReactNode } from 'react';
import { Typography } from '@components/atoms/Typography';

interface EmptyStateProps {
  children: ReactNode;
}

export function EmptyState({ children }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <Typography tag="span" className="text-gray-500">
        {children}
      </Typography>
    </div>
  );
}
