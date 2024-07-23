import { signUpUser } from "@/utils/dbUsers"
import { NextResponse } from "next/server"
import {cookies} from 'next/headers'



export async function POST(req) {
    let {username, pwd} = await req.json()

    let usr = await signUpUser(username, pwd)
    console.log(usr)
    if(!usr) {
        return NextResponse.json({
            error: true,
            message: ""
        })
    } else {
        cookies().set("logged", usr._id)
        return NextResponse.json({
            error: false,
            message: "Log-in successful"
        })
    }
}