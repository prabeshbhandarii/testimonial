"use client"

import Link from "next/link"

export function Dashboard () {
    return (
        <Link className="text-white text-md flex justify-end" href={"/pages/dashboard"}>Go to Dashboard</Link>
    )
}