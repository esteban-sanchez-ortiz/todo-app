import { Button, Icon } from '@components/atoms';
import { ItemActionsProps } from './ItemActions.types';

export const ItemActions = ({ onDelete, onEdit }: ItemActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onEdit}
        variant="ghost"
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        aria-label="Edit"
      >
        <Icon name="edit" size="md" />
      </Button>
      <Button
        onClick={onDelete}
        variant="ghost"
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="Delete"
      >
        <Icon name="trash" size="md" />
      </Button>
    </div>
  );
};
