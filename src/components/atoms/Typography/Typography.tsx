import { JSX } from 'react';
import { TypographyProps, TypographyVariant } from './Typography.types';

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-5xl font-bold text-gray-900',
  h2: 'text-4xl font-bold text-gray-900',
  h3: 'text-3xl font-bold text-gray-900',
  h4: 'text-xl font-bold text-gray-900',
  body: 'text-lg text-gray-800 font-medium',
  caption: 'text-base text-gray-600',
};

const variantTags: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'p',
  caption: 'span',
};

export const Typography = ({
  children,
  variant = 'body',
  className = '',
  style,
}: TypographyProps) => {
  const Tag = variantTags[variant];

  return (
    <Tag className={`${variantStyles[variant]} ${className}`} style={style}>
      {children}
    </Tag>
  );
};
