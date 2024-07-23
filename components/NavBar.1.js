'use client'
import Cookies from 'js-cookie'
import { UserMenu } from "./UserMenu"
import { useEffect, useState } from 'react'


/* this logic is needed to get the data from the database. 
We can't directly query  the DB from here
*/
async function getUserById(uid) {

    try {
        let resp = await fetch('/api/users/' + uid)
        let respObj = await resp.json()

        return respObj.user

    } catch (e) {
        console.log(e)
        return false
    }
}

export default function NavBar() {
    const [user, setUser] = useState(null)

    useEffect(() => { //we can only request the loading of the data once the component properly is properly mounted
        async function load() {
            let loggedInUserId = Cookies.get('logged')
            if(loggedInUserId) { 
                setUser(await getUserById(loggedInUserId))
            }
        }
        load()
    }, [])
    

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Task Manager</a>
            </div>
            <div className="flex-none gap-2">
                {!user && "Loading..." /*we need a loading state to make sure the user gets a better UX*/  }
                {user && <UserMenu usr={user} />}
            </div>
        </div>
    )
}