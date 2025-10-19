export type BadgeVariant = 'pending' | 'done' | 'default';

export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};
