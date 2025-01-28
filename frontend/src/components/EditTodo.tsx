import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      DialogFooter,
} from "../components/ui/dialog"
import Button from "./ui/button"
import { Input } from "./ui/input"
import { Todo } from "../types/Task"
import { useState } from "react"
    

const EditTodo = ({todo}: {todo: Todo}) => {
      console.log(todo)
      const [description, setDescription] = useState(todo.description)
      console.log(description)
      

      const saveTodo = async (id: number): Promise<void> => {
            try {
                  const body = { description }
                  const res = await fetch(`http://localhost:3000/todos/${id}`, {
                        method: 'PUT',
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(body)
                  })
                  window.location.href = '/'
            } catch (error: unknown) {
                  console.log(error)
            }
      }
      
      return(
            <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit todo</DialogTitle>
                    </DialogHeader>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <p className="text-right">
                              Description
                        </p>
                        <Input id="username" value={description} className="col-span-3" onChange={e => setDescription(e.target.value)} />
                      </div>
                    <DialogFooter>
                      <Button type="submit" onClick={() => saveTodo(Number(todo.todo_id))}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
            </Dialog>
      )
}
export default EditTodo