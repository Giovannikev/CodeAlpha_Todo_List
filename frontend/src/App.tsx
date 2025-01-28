import './App.css'
import TaskList from './components/TaskList'
import EditTodoForm from './components/EditTodoForm'
import { Todo } from './types/Task';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState<Todo[]>([]);

  const addTask = (task: Todo) => {
    setTasks([...tasks, task]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.todo_id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.todo_id !== id));
  };
  
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <EditTodoForm addTask={addTask} />
        <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
    </>
  )
}

export default App
