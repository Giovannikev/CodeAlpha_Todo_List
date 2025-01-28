import { useState, useEffect } from 'react';
import { Todo } from '../types/Task';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Get todos from the db
  const getTodos = async () => {
    try {
      const res = await fetch('http://localhost:3000/todos');
      if (!res.ok) throw new Error('Failed to fetch Todos');
      const todosArray = await res.json();
      setTodos(todosArray);
    } catch (error) {
      console.error('Error fetching Todos:', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (todo_id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${todo_id}`, {
        method: 'DELETE',
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== todo_id));
      console.log('Todo deleted:', res);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return { todos, deleteTodo };
};
