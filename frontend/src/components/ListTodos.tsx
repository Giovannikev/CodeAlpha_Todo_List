import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import Button from "./ui/button";
import { Todo } from "../types/Task";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ScrollArea } from "./ui/scrollArea";

const ListTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <ScrollArea className="h-[400px] rounded-md border p-4 overflow-auto">
      <Table className="relative w-full">
        <TableCaption>A list of your Task</TableCaption>
        <TableHeader className="sticky top-0 shadow-md">
          <TableRow className="text-white font-bold">
            <TableHead className="w-[100px]">Description</TableHead>
            <TableHead className="text-right">Edit</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.todo_id}>
              <TableCell className="text-left">{todo.description}</TableCell>
              <TableCell className="text-right">
                <EditTodo todo={todo} />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="danger" onClick={() => deleteTodo(todo.todo_id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default ListTodos;
