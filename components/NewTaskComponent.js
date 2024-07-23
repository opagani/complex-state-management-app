'use client'
import { AuthContext } from "@/contexts/AuthContext";
import { TasksContext } from "@/contexts/TasksContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export function NewTaskComponent(){ 
    const { register, handleSubmit, reset } = useForm();
    const {addTask} = useContext(TasksContext)
    const {token} = useContext(AuthContext)
    


    const onSubmit = async (data) => {
        let result = await addTask({
            title: data.title,
            description: data.description,
            dueDate: data.dueDate, 
            user_id: token
        })
        console.log(result)
        reset();
    };


    return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label className="block text-gray-700">Task Title</label>
            <input className="input input-bordered w-full" type="text" {...register('title', { required: true })} />
        </div>

        <div>
            <label className="block text-gray-700">Task Description</label>
            <textarea className="textarea textarea-bordered w-full" {...register('description', { required: true })}></textarea>
        </div>

        <div>
            <label className="block text-gray-700">Due Date</label>
            <input className="input input-bordered w-full" type="date" {...register('dueDate', { required: true })} />
        </div>

        <button className="btn btn-primary">Add Task</button>
    </form>
    )

}