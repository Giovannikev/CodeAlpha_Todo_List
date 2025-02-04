import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "../components/ui/dialog";
import Button from "./ui/button";
import { Textarea } from '../components/ui/textarea'
import { Todo } from "../types/Task";
import { useState } from "react";

const EditTodo = ({ todo }: { todo: Todo }) => {
  const [description, setDescription] = useState(todo.description);

  const saveTodo = async (id: number): Promise<void> => {
    try {
      const body = { description };
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        console.log("Todo updated successfully");
        setDescription(todo.description)
      } else {
        console.error("Failed to update todo");
      }
    } catch (error: unknown) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
          <DialogDescription>
            Modify the description of your todo and save the changes.
          </DialogDescription>
        </DialogHeader>
        <p className="text-left">Description :</p>
        <div className="grid w-full gap-4">
          <Textarea
            id="todo-description"
            value={description}
            className="col-span-3"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" onClick={() => saveTodo(Number(todo.todo_id))}>
            Save changes
          </Button>
        </div>
        <DialogFooter>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodo;
