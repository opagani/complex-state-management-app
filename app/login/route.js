import { loginUser } from "@/utils/dbUsers"
import { NextResponse } from "next/server"
import {cookies} from 'next/headers'

export async function POST(req) {

    let {username, pwd} = await req.json()

    let usr = await loginUser(username, pwd)
    if(!usr) {
        return NextResponse.json({
            error: true,
            message: "Username or password incorrect"
        })
    } else {
        cookies().set("logged", usr._id)
        return NextResponse.json({
            error: false,
            message: "Log-in successful"
        })
    }
 
}