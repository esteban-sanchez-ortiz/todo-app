export type TodoItem = {
  id: number;
  desc: string;
  date: number;
  completed: boolean;
  position?: { x: number; y: number };
  zIndex?: number;
  colorIndex?: number;
  completedAt?: number;
};

export type DoneZoneProps = {
  completedTodos: TodoItem[];
};
