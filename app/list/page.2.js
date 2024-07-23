import NavBar from '../../components/NavBar'
import { NewTaskComponent } from "@/components/NewTaskComponent";
import { ListOfTasks } from "@/components/ListOfTasks.1";
import { TasksProvider } from '@/contexts/TasksContext';
import { TaskFilter } from '@/components/TaskFilter';
import { cookies } from 'next/headers';
import { getUserTasks } from '@/utils/dbTasks';




export default async function List() {
    let user_id = await cookies().get("logged")

    let tasks = await getUserTasks(user_id.value)

    tasks = tasks.map( t => JSON.parse(JSON.stringify(t)))

    return (
        <div className="bg-white p-6  shadow-xl card bg-base-96 w-4/5 mx-auto">
            <NavBar /> 
            <TasksProvider>
                <NewTaskComponent />
                <TaskFilter />
                <ListOfTasks initial={tasks} />
            </TasksProvider >
        </div>
    );
}