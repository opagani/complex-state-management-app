import { createTask, getUserTasks } from "@/utils/dbTasks"
import { NextResponse } from "next/server"



/* API endpoint that receives a new tasks 
and saves it into the database */
export async function POST(req) {

    let task = await req.json()


    let taskResp = await createTask(task)

    if(taskResp) {
        return NextResponse.json({
            success: true
        })
    } else {
        return NextResponse.json({
            success: false, 
            error: "Error while creating the task"
        })
    }
}

/* This endpoint returns the initial list of tasks
from the database */
export async function GET(req) {
    let user_id = req.nextUrl.searchParams.get('userId')

    let tasks = await getUserTasks(user_id)

    if(Array.isArray(tasks)) {
        return NextResponse.json({
            success: true,
            tasks
        })
    } else {
        return NextResponse.json({
            success: false,
            error: "Error getting the list of tasks for user :" + user_id
        })
    }
}