import { BadgeProps, BadgeVariant } from './Badge.types';

const variantStyles: Record<BadgeVariant, string> = {
  pending: 'bg-amber-50 text-amber-900',
  done: 'bg-emerald-50 text-emerald-900',
  default: 'bg-gray-50 text-gray-900',
};

export const Badge = ({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) => {
  return (
    <span
      className={`sketchy-badge inline-flex items-center px-3 py-1 rounded text-sm ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
