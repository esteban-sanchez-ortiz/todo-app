export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';

export type TypographyProps = {
  children: React.ReactNode;
  variant?: TypographyVariant;
  className?: string;
  style?: React.CSSProperties;
};
