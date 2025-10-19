import { memo } from 'react';
import { Icon } from '../Icon';
import { DeleteButtonProps } from './DeleteButton.types';

export const DeleteButton = memo(({
  onClick,
  className = '',
  ariaLabel = 'Delete',
}: DeleteButtonProps) => {
  return (
    <button
      className={`bubble-delete ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon name="x" size="sm" />
    </button>
  );
});

DeleteButton.displayName = 'DeleteButton';
