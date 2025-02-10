import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import Button from "./ui/button";
import { Todo } from "../types/Task";
import {
  TableBody,
  TableCell,
  TableRow,
} from "../components/ui/table";
import { Trash2 } from 'lucide-react'
import './table.css'

const ListTodos = ({ refresh }: { refresh: boolean }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  async function getTodos() {
    try {
      const res = await fetch("http://localhost:3000/todos");
      if (!res.ok) throw new Error("Failed to fetch todos");

      const todoArray = await res.json();
      setTodos(todoArray); 
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  async function deleteTodo(todo_id: string): Promise<void> {
    try {
      const res = await fetch(`http://localhost:3000/todos/${todo_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== todo_id));
        console.log("Todo deleted successfully");
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getTodos();
  }, [refresh]); 

  const getRowClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-200";
      case "medium":
        return "bg-yellow-200";
      case "low":
        return "bg-green-200";
      default:
        return "";
    }
  };

  return (
    <div className="scroll-container h-[400px] rounded-md border px-4 overflow-auto">
      <table className="relative table-auto border-b min-w-full h-auto">
        <thead className="sticky top-0 right-0 z-20">
          <tr className="bg-gray-100 font-semibold text-gray-600 h-15 border-b rounded-4xl">
            <th className="w-[100px]">Description</th>
            <th className="text-right">Priority</th>
            <th className="text-right">Edit</th>
            <th className="text-right">Delete</th>
          </tr>
        </thead>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.todo_id} className={getRowClass(todo.priority)}>
              <TableCell className="text-left">{todo.description}</TableCell>
              <TableCell className="text-right">{todo.priority}</TableCell>
              <TableCell className="text-right">
                <EditTodo todo={todo} onUpdate={getTodos} /> 
              </TableCell>
              <TableCell className="text-right">
                <Button variant="danger" onClick={() => deleteTodo(todo.todo_id)}>
                  <Trash2 className='h-4 w-4'/>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>
    </div>
  );
};

export default ListTodos;