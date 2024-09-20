"use client"
import { signOut } from "next-auth/react"

export const Logout = ()=>{
    return (
        <button className="text-white text-md" onClick={() => signOut()}>Logout</button>
    )
}