export type FloatingBubbleProps = {
  id: number;
  desc: string;
  date: number;
  completed: boolean;
  position?: { x: number; y: number };
  zIndex?: number;
  colorIndex: number;
  completedAt?: number;
  onDelete: () => void;
  onEdit: (newDesc: string) => void;
  onBringToFront: () => void;
};
