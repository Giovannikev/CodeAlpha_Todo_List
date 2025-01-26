import { useState } from "react";
import Button  from './ui/button'
import { Todo } from "../types/Task";

interface EditTodoProps {

  todo: Todo;

}
const EditTodo: React.FC<EditTodoProps> = ({ todo }) => {

  const editText = async (todo_id: string) => {
    try {
      const body = { description}
      const res = await fetch(`http://localhost:3000/todos/${todo_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      
      window.location.href = "/"
    } catch (error) {
      console.log('Error updating todo: ',error)
    }
  }
  
  const [description, setDescription]= useState(todo.description)
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Edit Button */}
      <Button
        onClick={handleEditClick}
        variant="secondary"
      >
        Edit
      </Button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50/90">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Edit Todo</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="todo" className="block text-sm font-medium text-gray-700 mb-2">
                  Todo Description
                </label>
                <input
                  type="text"
                  id="todo"
                  name="todo"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  onClick={handleCloseModal}
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => editText(todo.todo_id)}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;
