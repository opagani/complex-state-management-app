'use client'
import { useContext, useState } from "react"
import { TasksContext } from "@/contexts/TasksContext"
import { TaskItem } from "./TaskItem"

export function ListOfTasks({initial}) {
    const {filtered, setInitialList} = useContext(TasksContext)

    useEffect(() => {
        setInitialList(initial)
    }, [])



    return (
        <>
            {filtered().map((task) => <TaskItem task={task} key={task.id}/>)}
        </>
    )

}
