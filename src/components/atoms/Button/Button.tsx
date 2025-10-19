import { ButtonProps } from './Button.types';

const variantStyles = {
  primary: 'text-blue-600 sketchy-button cursor-pointer',
  secondary: 'text-gray-700 sketchy-button cursor-pointer',
  danger: 'text-red-600 sketchy-button cursor-pointer',
  ghost: 'text-gray-700 border-0 shadow-none hover:bg-gray-100 cursor-pointer',
};

export const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold text-lg ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
