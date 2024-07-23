import { ObjectId } from "mongodb";
import { getInstance } from "./db";

const bcrypt = require('bcrypt');


async function hashPwd(plainTextPassword) {
    const saltRounds = 10; // Number of salt rounds (recommended to be between 10 and 12)
    const hash = await bcrypt.hash(plainTextPassword, saltRounds) 
    return hash
}

export async function getUserById(id) {
    const dbClient = await getInstance()

    const coll = await dbClient.collection('users')
 
    try {
        let usr = await coll.findOne({_id: new ObjectId(id)})
        //we make sure to return a simple object, so we can later pass it from a server component into a client component
        return JSON.parse(JSON.stringify(usr)) 
    } catch (e) {
        console.log('Error finding user by id. ', id)
        console.log(e)
        return null
    }
}

export async function signUpUser(usr, pwd) {
    const dbClient = await getInstance()

    const coll = await dbClient.collection('users')
    console.log('tryingg to singup user: ', usr, pwd)

    try {
        const user = await coll.findOne({
            username: usr
        })
        console.log(user)
        if(!user){
            let insertRes = await coll.insertOne({
                username: usr,
                pwd: await hashPwd(pwd)
            })
            if(insertRes.insertedId != null) {
                return true
            }
        }
        return false
    } catch (e) {
        console.log("Error while looking for user")
        return null;
    }
}

export async function loginUser(usr, pwd) {
    const dbClient = await getInstance()

    const coll = await dbClient.collection('users')

    try {
        const user = await coll.findOne({
            username: usr,
        })
        if(user.count == 0){
            return null;
        }
        let isPwdCorrect = await bcrypt.compare(pwd, user.pwd)
        if(isPwdCorrect) {
            return user;
        } else {
            return false
        }
    } catch (e) {
        console.log("Error while looking for user")
        console.log(e)
        return null;
    }
}