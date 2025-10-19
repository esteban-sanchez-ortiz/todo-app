import { memo, useState, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Typography, Icon } from '@components/atoms';
import { CompletedTaskItem } from '@components/molecules/CompletedTaskItem';
import { DoneZoneProps } from './DoneZone.types';

export const DoneZone = memo(({ completedTodos }: DoneZoneProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'done-zone',
  });
  const [showDropSuccess, setShowDropSuccess] = useState(false);

  // Trigger success animation when a new completed todo is added
  useEffect(() => {
    if (completedTodos.length > 0) {
      setShowDropSuccess(true);
      const timer = setTimeout(() => {
        setShowDropSuccess(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [completedTodos.length]);

  const taskCountText = completedTodos.length === 0
    ? 'Drag completed tasks here'
    : `${completedTodos.length} task${completedTodos.length !== 1 ? 's' : ''} completed`;

  return (
    <div
      ref={setNodeRef}
      className={`done-zone ${isOver ? 'active' : ''} ${showDropSuccess ? 'drop-success' : ''}`}
    >
      <div className="done-zone-content">
        <div className="done-icon">
          <Icon name="check" size="lg" />
        </div>
        <Typography variant="h3" className="text-gray-700" style={{ color: '#654321' }}>
          Done! 🎉
        </Typography>
        <Typography variant="caption" className="text-gray-600 mb-3" style={{ color: '#8b6f47' }}>
          {taskCountText}
        </Typography>

        {completedTodos.length > 0 && (
          <div className="w-full mt-2 space-y-2">
            {completedTodos.map((todo) => (
              <CompletedTaskItem
                key={todo.id}
                desc={todo.desc}
                completedAt={todo.completedAt ?? Date.now()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

DoneZone.displayName = 'DoneZone';
