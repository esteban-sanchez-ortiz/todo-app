import { TextInputProps } from './TextInput.types';

export const TextInput = ({ value, onChange, className = '', ...props }: TextInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`sketchy-input px-4 py-3 placeholder-gray-500 ${className}`}
      {...props}
    />
  );
};
