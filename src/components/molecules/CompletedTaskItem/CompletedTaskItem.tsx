import { memo, useState, useEffect } from 'react';
import { Typography } from '@components/atoms';
import { CircularTimer } from '@components/atoms/CircularTimer';
import { CompletedTaskItemProps } from './CompletedTaskItem.types';

export const CompletedTaskItem = memo(({
  desc,
  completedAt,
  maxLength = 20,
}: CompletedTaskItemProps) => {
  const [, setTick] = useState(0);

  // Update timer every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const elapsed = Date.now() - completedAt;
  const timeRemaining = Math.max(0, 15000 - elapsed);
  const progress = 1 - timeRemaining / 15000;

  const truncatedDesc = desc.length > maxLength
    ? `${desc.substring(0, maxLength)}...`
    : desc;

  return (
    <div className="done-item" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <CircularTimer
          progress={progress}
          timeRemaining={timeRemaining}
        />
        <Typography
          variant="caption"
          className="text-gray-700 line-through"
          style={{ color: '#654321', flex: 1 }}
        >
          {truncatedDesc}
        </Typography>
      </div>
    </div>
  );
});

CompletedTaskItem.displayName = 'CompletedTaskItem';
