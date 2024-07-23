'use client'

import { TasksContext } from "@/contexts/TasksContext"
import { ACTIONS } from "@/utils/constants"
import { useContext, useState } from "react"



export function ActionButton({task, action}) {
    const {markTaskAsDone, removeTask} = useContext(TasksContext)
    const [taskDone, setTaskDone] = useState(task.done)
    const buttonCSS = action == ACTIONS.markAsDone ? "primary" : "secondary"

    function handleActionClick(evt) {
        evt.preventDefault()
        if(action == ACTIONS.markAsDone) {
            markTaskAsDone(task)
            setTaskDone(true)
            return
        }

        if(action == ACTIONS.remove) {
            removeTask(task)
        }
    }

    function displayButtonText(){
        if(action == ACTIONS.markAsDone) {
            return taskDone ? "Finished" : "Close"
        }
        if(action == ACTIONS.remove) {
            return "Remove"
        }
    }



    return (
        <button className={"btn btn-" + buttonCSS} onClick={handleActionClick}>{displayButtonText()}</button>
    )
}