import { Icon, Typography } from '@components/atoms';
import { EmptyStateProps } from './EmptyState.types';

export const EmptyState = ({
  icon = 'check',
  title,
  description,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center transform rotate-1">
      <div className="mb-6 text-gray-400">
        <Icon name={icon} size="lg" />
      </div>
      <Typography variant="h2" className="mb-3 text-gray-700">
        {title}
      </Typography>
      {description && (
        <Typography variant="body" className="text-gray-500 max-w-md">
          {description}
        </Typography>
      )}
    </div>
  );
};
