'use client'
import { useContext } from "react"
import { TasksContext } from "@/contexts/TasksContext"
import { format } from "date-fns"
import { ActionButton } from "./ActionButton"
import { ACTIONS } from "@/utils/constants"


export function ListOfTasks({}) {
    const {filtered} = useContext(TasksContext)

    function getCSS(task) {
        return task.done? "badge-primary" : "badge-secondary"
    }
 

    return (
        <>
            {filtered().map((task) => {
                return (
                      <div key={task.id} className="p-4 border rounded shadow-sm grid grid-cols-6">
                        <h3 className="font-bold card-title p-4">
                            {task.title}
                            <div className={"badge " + getCSS(task)}>
                               {task.done ? "Done" : "Pending"}
                            </div>
                        </h3>
                        <p className="p-4 col-span-3">{task.description}</p>
                        <time className="p-4">{format(new Date(task.dueDate), 'PP')}</time>
                        <div className="card-actions justify-end">
                            <ActionButton task={task} action={ACTIONS.markAsDone} />
                            <ActionButton task={task} action={ACTIONS.remove} />
                        </div>
                    </div>
                )
            })
        } 
        </>
    )

}
