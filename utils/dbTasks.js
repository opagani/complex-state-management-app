import { ObjectId } from "mongodb";
import { getInstance } from "./db";

export async function createTask(task) {
    const dbClient = await getInstance()

    const coll = await dbClient.collection('tasks')
 
    try {
        let dbTask = await coll.insertOne(task)
        if(dbTask.insertedId != null) {
            return true
        }
        return false
    } catch (e) {
        console.log("Error while creating  the task")
        console.log(e)
    }
}


export async function getUserTasks(user_id) {
    const dbClient = await getInstance()

    const coll = await dbClient.collection('tasks')
 
    try {
        let tasks = await coll.find({user_id})
        return tasks.toArray()

    } catch (e) {
        console.log("Error while creating  the task")
        console.log(e)
    }
}