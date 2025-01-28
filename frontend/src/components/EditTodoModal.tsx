import EditTodoForm from "./EditTodoForm";
import { Todo } from "../types/Task";

interface EditTodoModalProps {
  todo: Todo;
  onClose: () => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50/90">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Edit Todo</h2>
        <EditTodoForm todo={todo} onClose={onClose} />
      </div>
    </div>
  );
};

export default EditTodoModal;
