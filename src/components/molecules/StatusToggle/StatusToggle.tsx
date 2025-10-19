import { Badge, Checkbox } from '@components/atoms';
import { StatusToggleProps } from './StatusToggle.types';

export const StatusToggle = ({
  checked,
  onChange,
  label,
}: StatusToggleProps) => {
  const badgeVariant = checked ? 'done' : 'pending';
  const badgeText = label || (checked ? '✓ Done' : '○ Todo');

  return (
    <div className="flex items-center gap-3">
      <Checkbox checked={checked} onChange={onChange} />
      <Badge variant={badgeVariant}>{badgeText}</Badge>
    </div>
  );
};
