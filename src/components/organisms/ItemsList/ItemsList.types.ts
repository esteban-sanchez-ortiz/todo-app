export type TodoItem = {
  id: number;
  desc: string;
  date: number;
  completed: boolean;
};

export type ItemsListProps = {
  items: TodoItem[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onToggle: (id: number) => void;
};
