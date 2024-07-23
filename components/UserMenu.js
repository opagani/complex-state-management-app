'use client'

import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export function UserMenu({usr}) {
    const {logOut} = useContext(AuthContext)
    const router = useRouter()

    function handleLogOut(evnt) {
        evnt.preventDefault()
        logOut()
        router.push('/')
    }

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost ">
                {usr.username}
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><a onClick={handleLogOut}>Logout</a></li>
            </ul>
        </div>
    )
}