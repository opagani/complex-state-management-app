'use client'

import { TasksContext } from "@/contexts/TasksContext"
import { useContext, useEffect, useState } from "react"

export function TaskStatusIndicator({task}) {
    const {tasks} = useContext(TasksContext)
    const [done, setDone] = useState(task.done)

    function getCSS() {
        return done? "badge-primary" : "badge-secondary"
    }

    useEffect(() => {
        let current = tasks.find( t => t.id == task.id)
        setDone(current.done)
    }, [tasks])

    return (
        <div className={"badge " + getCSS()}>{
            done ? "Done" : "Pending"
        }</div>
    )
    
}