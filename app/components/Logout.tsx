"use client"
import { signOut } from "next-auth/react"

export const Logout = ()=>{
    return (
        <button className="text-white text-lg" onClick={() => signOut()}>Logout</button>
    )
}