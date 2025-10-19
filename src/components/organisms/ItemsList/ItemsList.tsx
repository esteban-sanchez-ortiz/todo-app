import { Card, Typography } from '@components/atoms';
import { EmptyState, ItemActions, StatusToggle } from '@components/molecules';
import { ItemsListProps } from './ItemsList.types';

export const ItemsList = ({
  items,
  onDelete,
  onEdit,
  onToggle,
}: ItemsListProps) => {
  if (items.length === 0) {
    return (
      <EmptyState
        icon="check"
        title="No todos yet! 📝"
        description="Start adding your awesome tasks and watch this space come alive! ✨"
      />
    );
  }

  const handleCardClick = (
    e: React.MouseEvent,
    itemId: number
  ) => {
    // Don't toggle if clicking on action buttons
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('input[type="checkbox"]')
    ) {
      return;
    }
    onToggle(itemId);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card
          key={item.id}
          onClick={(e) => handleCardClick(e, item.id)}
          className="p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <StatusToggle
                checked={item.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggle(item.id);
                }}
              />
              <div className="flex-1 min-w-0">
                <Typography
                  variant="body"
                  className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-900'} break-words`}
                >
                  {item.desc}
                </Typography>
                <Typography variant="caption" className="text-gray-600 mt-1">
                  📅 {new Date(item.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Typography>
              </div>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <ItemActions
                onEdit={() => onEdit(item.id)}
                onDelete={() => onDelete(item.id)}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
