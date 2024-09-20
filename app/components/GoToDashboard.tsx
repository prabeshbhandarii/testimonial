"use client"
import Link from "next/link"

export function GoToDashboard () {
    return (
        <Link className="text-white text-md flex justify-end" href={"/pages/dashboard"}>Go to Dashboard</Link>
    )
}