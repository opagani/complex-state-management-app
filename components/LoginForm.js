'use client'
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

function getFormTarget(login) {
    return !login ? '/api/signup' : '/login'
}

export function LoginForm({signup=false}) {
    let usrRef = useRef()
    let pwdRef = useRef()
    let router = useRouter()
    let [error, setError] = useState('')
    let [isLogin, setIsLogin] = useState(!signup)

    let API_URL = getFormTarget(isLogin)

    function toggleTarget(evnt) {
        evnt.preventDefault()
        setIsLogin(!isLogin)
    }

    useEffect(() => {
        API_URL = getFormTarget(isLogin)
        setError('')
    }, [isLogin])

    async function handleLogin(evnt) {
        evnt.preventDefault()

        if(usrRef.current.value == '' || pwdRef.current.value == '') {
            setError("Both username and password are mandatory")
            return false;
        }

        try {
            let resp = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    username: usrRef.current.value,
                    pwd: pwdRef.current.value
                })
            })
            let jsonResp = await resp.json()
            if(jsonResp.error) {
                setError(jsonResp.message)
            } else {
                setError('')
                router.push("/list")
            }
        } catch (e) {
            setError("Unexpected error")
        }
    }
    return (
        <form className="flex flex-col"  onSubmit={handleLogin}>
          <input 
            type="text"
            className="input w-full max-w-sx my-5"
            name="username"
            placeholder="Username"
            ref={usrRef}
            />
          <input 
            type="password"
            className="input w-full max-w-sx"
            name="pwd"
            placeholder="Password"
            ref={pwdRef}
            />
          <button className="btn btn-primary my-5">{
            isLogin ? "Log-in" : 'Sign-up'
          }
            </button>
            <a href="#" onClick={toggleTarget}>{!isLogin ? "Log-in" : "Sign-up"} instead</a>
          { (error != '') && <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>}
        </form>
    )
}
