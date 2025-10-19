type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type SpacerProps = {
  size?: SpacerSize;
  className?: string;
};

const sizeStyles: Record<SpacerSize, string> = {
  xs: 'h-2',
  sm: 'h-4',
  md: 'h-6',
  lg: 'h-8',
  xl: 'h-12',
};

export const Spacer = ({ size = 'md', className = '' }: SpacerProps) => {
  return <div className={`${sizeStyles[size]} ${className}`} />;
};
