import React, { useState } from 'react';
import { Todo } from '../types/Task';
import Button  from './ui/button'

interface Props {
  addTask: (task: Todo) => void;
}

const TaskForm: React.FC<Props> = () => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const text = { description }
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(text),
      })
      console.log(response)
      window.location.href = '/'
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
      ></textarea>
      <Button type="submit">
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;
