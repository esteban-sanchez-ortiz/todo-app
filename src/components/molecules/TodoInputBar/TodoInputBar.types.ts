export type TodoInputBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  placeholder?: string;
  disabled?: boolean;
};
