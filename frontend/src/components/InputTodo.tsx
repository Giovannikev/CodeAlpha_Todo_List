"use client"

import type React from "react"
import { useState } from "react"
import  Button  from "@/components/ui/button"
import ListTodos from "./ListTodos"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"

function InputTodo() {
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [refresh, setRefresh] = useState(false)

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const body = { description, priority }
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        console.log("Todo added successfully")
        setDescription("")
        setPriority("medium")
        setRefresh((prev) => !prev)
      } else {
        console.error("Failed to add todo")
      }
    } catch (error) {
      console.error("Error while submitting the form:", error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center  mb-8">Task list</h1>
      <form className="space-y-4" onSubmit={onSubmitForm}>
        <div className="flex gap-4">
          <Input
            placeholder="Add a new task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-grow"
          />
          <Select value={priority} onValueChange={(value) => setPriority(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" disabled={description.trim() === ""}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </form>
      <ListTodos refresh={refresh} />
    </div>
  )
}

export default InputTodo

