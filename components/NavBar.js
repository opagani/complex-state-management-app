import { getUserById } from "@/utils/dbUsers"
import { cookies } from "next/headers"
import { UserMenu } from "./UserMenu"


export default async function NavBar() {

    let loggedInUserId = cookies().get('logged')
    let user = null
    if(loggedInUserId) { 
        user = await getUserById(loggedInUserId.value)
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Task Manager</a>
            </div>
            <div className="flex-none gap-2">
                <UserMenu usr={user} />
            </div>
        </div>
    )
}