import { useState } from "react";
import Button from "./ui/button";
import EditTodoModal from "./EditTodoModal";
import { Todo } from "../types/Task";

interface EditTodoProps {
  todo: Todo;
}

const EditTodo: React.FC<EditTodoProps> = ({ todo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Button onClick={handleEditClick} variant="secondary">
        Edit
      </Button>

      {isModalOpen && (
        <EditTodoModal todo={todo} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default EditTodo;
