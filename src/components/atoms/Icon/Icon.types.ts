export type IconName = 'check' | 'trash' | 'edit' | 'plus' | 'x';
export type IconSize = 'sm' | 'md' | 'lg';

export type IconProps = {
  name: IconName;
  size?: IconSize;
  className?: string;
};
