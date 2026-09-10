import { useState, type ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

const sideClasses = {
  top: 'bottom-full mb-2',
  bottom: 'top-full mt-2',
  left: 'right-full mr-2',
  right: 'left-full ml-2',
};

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={`absolute z-50 px-2 py-1 text-sm rounded whitespace-nowrap ${sideClasses[side]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
