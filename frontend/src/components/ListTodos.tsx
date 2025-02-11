"use client"

import { useEffect, useState, useCallback } from "react"
import EditTodo from "./EditTodo"
import Button from "@/components/ui/button"
import type { Todo } from "@/types/Task"
import { Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const ListTodos = ({ refresh }: { refresh: boolean }) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const getTodos = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/todos")
      if (!res.ok) throw new Error("Failed to fetch todos")

      const todoArray = await res.json()
      setTodos(todoArray)
    } catch (error) {
      console.error("Error fetching todos:", error)
    }
  }, [])

  async function deleteTodo(todo_id: string): Promise<void> {
    try {
      const res = await fetch(`http://localhost:3000/todos/${todo_id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== todo_id))
        console.log("Todo deleted successfully")
      } else {
        console.error("Failed to delete todo")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    getTodos()
  }, [refresh, getTodos])

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo.todo_id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full bg-white rounded-lg shadow-md p-4 space-x-4 flex items-center justify-between"
          >
            <div className="flex-grow">
              <p className="text-lg text-left font-medium text-gray-800 max-xl:text-md">{todo.description}</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-2 ${getPriorityColor(todo.priority)}`}
              >
                {todo.priority}
              </span>
            </div>
            <div className="flex space-x-2">
              <EditTodo todo={todo} onUpdate={getTodos} />
              <Button variant="danger" onClick={() => deleteTodo(todo.todo_id)}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ListTodos

