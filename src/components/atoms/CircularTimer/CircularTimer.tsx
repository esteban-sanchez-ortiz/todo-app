import { memo } from 'react';
import { CircularTimerProps } from './CircularTimer.types';

export const CircularTimer = memo(({
  progress,
  timeRemaining,
  size = 32,
  strokeWidth = 2.5,
  color = '#dc2626',
}: CircularTimerProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * progress;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg
        style={{ transform: 'rotate(-90deg)' }}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '0.65rem',
          fontWeight: 'bold',
          color,
          fontFamily: 'Gloria Hallelujah, cursive',
        }}
      >
        {Math.ceil(timeRemaining / 1000)}
      </div>
    </div>
  );
});

CircularTimer.displayName = 'CircularTimer';
