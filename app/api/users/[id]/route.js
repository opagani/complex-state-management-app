
import { getUserById } from "@/utils/dbUsers"
import {  NextResponse } from "next/server"

export async function GET(req, {params}) {
    const uid = params.id


    try {
        let usr = await getUserById(uid)
        return NextResponse.json({
            user: usr,
            success: true
        })
    } catch(e) {
        return NextResponse.json({
            success: false,
            error: e
        })
    }
}