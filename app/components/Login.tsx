"use client"
import { signIn } from "next-auth/react"

export const Login = ()=>{
    return (
        <button className="text-white text-lg" onClick={() => signIn()}>SignIn</button>
    )
}