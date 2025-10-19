export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
