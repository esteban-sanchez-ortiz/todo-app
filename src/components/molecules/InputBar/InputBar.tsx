import { Button } from '@components/atoms';

export const InputBar = () => {
  const handleAddButton = () => {
    console.log('Add button clicked');
  };

  return (
    <div>
      <input type="text" placeholder="Enter todo item" />
      <Button onClick={handleAddButton}>Add</Button>
    </div>
  );
};
