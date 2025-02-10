import React, { useState } from "react"; 
import Button from "./ui/button";
import ListTodos from "./ListTodos";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function InputTodo() {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [refresh, setRefresh] = useState(false); 

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { description, priority };
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Todo added successfully");
        setDescription(""); 
        setPriority("medium");
        setRefresh((prev) => !prev); 
      } else {
        console.error("Failed to add todo");
      }
    } catch (error) {
      console.error("Error  while submitting the form :", error);
    }
  };

  return (
    <div>
      <h1 className="text-center my-5 text-4xl font-semibold">Todo List</h1>
      <div className="flex justify-center">
        <form className="gap-4 justify-between items-center w-full mb-10" onSubmit={onSubmitForm}>
          <div className="flex gap-2">
            <Textarea
              placeholder="Add todo"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-slate-300"
            />
            
            <Select value={priority} onValueChange={(value) => setPriority(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" disabled={description.trim() === ""}>
              Add Task
            </Button>
          </div>
        </form>
      </div>
      
      <div className="">
        <ListTodos refresh={refresh} /> 
      </div>
    </div>
  );
}

export default InputTodo;
