import NavBar from '../../components/NavBar'
import { NewTaskComponent } from "@/components/NewTaskComponent";
import { ListOfTasks } from "@/components/ListOfTasks.1";
import { TasksProvider } from '@/contexts/TasksContext';
import { TaskFilter } from '@/components/TaskFilter';




export default async function List() {
    return (
        <div className="bg-white p-6  shadow-xl card bg-base-96 w-4/5 mx-auto">
            <NavBar /> 
            <TasksProvider>
                <NewTaskComponent />
                <TaskFilter />
                <ListOfTasks  />
            </TasksProvider >
        </div>
    );
}