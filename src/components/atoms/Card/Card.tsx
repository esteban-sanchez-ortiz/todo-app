import { CardProps } from './Card.types';

export const Card = ({ children, className = '', onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={`sketchy-card bg-white ${className}`}
    >
      {children}
    </div>
  );
};
