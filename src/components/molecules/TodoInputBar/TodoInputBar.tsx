import { Button, Icon, TextInput } from '@components/atoms';
import { TodoInputBarProps } from './TodoInputBar.types';

export const TodoInputBar = ({
  value,
  onChange,
  onAdd,
  placeholder = 'Enter todo item',
  disabled = false,
}: TodoInputBarProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      onAdd();
    }
  };

  return (
    <div className="flex gap-3">
      <TextInput
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1"
        disabled={disabled}
      />
      <Button
        onClick={onAdd}
        variant="primary"
        className="px-6 flex items-center gap-2"
        disabled={disabled}
      >
        <Icon name="plus" size="sm" />
        Add
      </Button>
    </div>
  );
};
