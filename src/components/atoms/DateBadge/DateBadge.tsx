import { memo } from 'react';
import { DateBadgeProps } from './DateBadge.types';

export const DateBadge = memo(({ date, className = '' }: DateBadgeProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`bubble-date ${className}`}>
      {formattedDate}
    </div>
  );
});

DateBadge.displayName = 'DateBadge';
