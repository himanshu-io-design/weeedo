import React from 'react';
import { cn } from './ui/utils';

interface AnimatedProps {
  delay?: number;
  className?: string;
}

export default function Animated({ children, delay = 500, className }: React.PropsWithChildren<AnimatedProps>) {
  return (
    <div
      className={cn('animate-appear-soft', className)}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

