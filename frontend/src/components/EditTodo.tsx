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
import { Textarea } from "../components/ui/textarea";
import { Todo } from "../types/Task";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Pencil} from 'lucide-react'

const EditTodo = ({ todo, onUpdate }: { todo: Todo; onUpdate: () => void }) => {
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  
  const [open, setOpen] = useState(false);

  const saveTodo = async (id: number): Promise<void> => {
    try {
      const body = { description, priority };
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        console.log("Todo updated successfully");
        onUpdate();
        setOpen(false); 
      } else {
        console.error("Failed to update todo");
      }
    } catch (error: unknown) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}><Pencil className="h-4 w-4"/> Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
          <DialogDescription>
            Modify the description of your todo and save the changes.
          </DialogDescription>
        </DialogHeader>
        <p className="text-left">Description :</p>
        <div className="w-full gap-4">
          <Textarea
            id="todo-description"
            value={description}
            className="col-span-3"
            onChange={(e) => setDescription(e.target.value)}
          />
          
          <Select value={priority} onValueChange={(value) => setPriority(value)}>
            <SelectTrigger className="w-full mt-4">
              <SelectValue placeholder={priority} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" onClick={() => saveTodo(Number(todo.todo_id))}>
          Save changes
        </Button>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodo;
