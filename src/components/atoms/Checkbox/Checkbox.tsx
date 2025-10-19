import { CheckboxProps } from './Checkbox.types';

export const Checkbox = ({ checked, onChange, ...props }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sketchy-checkbox"
      {...props}
    />
  );
};
