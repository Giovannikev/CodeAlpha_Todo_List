import { useEffect, useState } from "react"
import EditTodo from "./EditTodo"
import Button from "./ui/button"
import { Todo } from "../types/Task"
import {
      Table,
      TableBody,
      TableCaption,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "../components/ui/table"


const ListTodos = () => {
      const [todos, setTodos] = useState<Todo[]>([])
      
      async function deleteTodo(todo_id: string): Promise<void> {
            try {
                  const res = await fetch(`http://localhost:3000/todos/${todo_id}`, {
                        method: "DELETE",
                  });
                  setTodos(todos.filter(todo => todo.todo_id !== todo_id))
                  window.location.href = '/'
            } catch (error: unknown) {
                  console.error(error)
            }
      }
      
      async function getTodos() {
            const res = await fetch("http://localhost:3000/todos")
            const todoArray = await res.json()
            
            setTodos(todoArray)
      }

      useEffect(() => {
            getTodos()
      }, [])
      console.log(todos)

    return(
      <>
            <Table>
              <TableCaption>A list of your Task</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Description</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {
                        todos.map((todo) => (
                              <TableRow key={todo.todo_id}>
                                    <TableCell className="text-left"> {todo.description} </TableCell>
                                    <TableCell className="text-right">
                                          <EditTodo todo={todo}/>
                                    </TableCell>
                                    <TableCell className="text-right">
                                          <Button variant="danger" onClick={() => deleteTodo(String(todo.todo_id))}>Delete</Button>
                                    </TableCell>
                              </TableRow>
                        ))
                  }
              </TableBody>
            </Table>
      </>
    )  
}
export default ListTodos
