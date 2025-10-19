import { memo, useState, useRef, useEffect, useCallback } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { DateBadge, DeleteButton } from '@components/atoms';
import { FloatingBubbleProps } from './FloatingBubble.types';

export const FloatingBubble = memo(({
  id,
  desc,
  date,
  completed,
  position,
  zIndex,
  colorIndex,
  onDelete,
  onEdit,
  onBringToFront,
}: FloatingBubbleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: String(id),
    });

  // Bring to front when drag starts
  const handleDragStart = useCallback(() => {
    onBringToFront();
  }, [onBringToFront]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    if (contentRef.current) {
      const newText = contentRef.current.innerText.trim();
      if (newText && newText !== desc) {
        onEdit(newText);
      }
      setIsEditing(false);
    }
  }, [desc, onEdit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      contentRef.current?.blur();
    } else if (e.key === 'Escape') {
      if (contentRef.current) {
        contentRef.current.innerText = desc;
      }
      contentRef.current?.blur();
    }
  }, [desc]);

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  }, [onDelete]);

  useEffect(() => {
    if (isEditing && contentRef.current) {
      contentRef.current.focus();
      // Select all text
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isEditing]);

  const style = {
    position: 'absolute' as const,
    left: position?.x ?? 0,
    top: position?.y ?? 0,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : (zIndex ?? 1),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`floating-bubble ${completed ? 'completed' : 'pending'}`}
      data-color-index={colorIndex}
      onMouseDown={handleDragStart}
      {...attributes}
      {...listeners}
    >
      <DateBadge date={date} />
      <DeleteButton onClick={handleDeleteClick} />

      <div className="bubble-content">
        <div
          ref={contentRef}
          className={`bubble-header ${completed ? 'line-through' : ''}`}
          contentEditable={isEditing}
          suppressContentEditableWarning
          onDoubleClick={handleDoubleClick}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{ cursor: isEditing ? 'text' : 'pointer' }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
});

FloatingBubble.displayName = 'FloatingBubble';
