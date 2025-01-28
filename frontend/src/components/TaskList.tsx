import  { useEffect, useState } from 'react';
import { Todo } from '../types/Task';
import EditTodo from './EditTodo';
import Button from './ui/button';


const TodoList= () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  //delete todo
  async function deleteTodo(todo_id: string) {
    try {
      const res = await fetch(`http://localhost:3000/todos/${todo_id}`, {
        method: 'DELETE',
      })
      setTodos(todos.filter((todo) => todo.todo_id !== todo_id))
      console.log('Todo deleted : ', res)
    } catch (error) {
      console.log('Error deleting todo:', error)
    }
  }
  
  
  // Get todos from the db
  async function getTodos() {
    try {
      const res = await fetch('http://localhost:3000/todos');
      if (!res.ok) {
        throw new Error('Failed to fetch Todos');
      }
      const todosArray = await res.json();
      setTodos(todosArray);
    } catch (error) {
      console.error('Error fetching Todos:', error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <ul className="list-none p-0">
      {todos.map((todo) => (
        <li key={todo.todo_id} className="flex justify-between items-center border-b py-2">
          <div>
            <input
              type="checkbox"
              checked={todo.isCompleted}
            />
            <span className={todo.isCompleted ? 'line-through ml-2' : 'ml-2'}>
              {todo.description}
            </span>
          </div>
          <div className="flex gap-4">
            <EditTodo todo={todo}/>
            <Button
              onClick={() => deleteTodo(todo.todo_id)}
              variant='danger'
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
