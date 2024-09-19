"use client"
import { AppbarClient } from "@/app/components/AppbarClient"
import CreateSpace from "@/app/components/CreateSpace"
import DashboardButton from "@/app/components/DashboardButton"
import { useState } from "react"

export default function Dashboard () {
    const [createSpace, setCreateSpace] = useState(false)
    return (
        <>
            <AppbarClient />
            { !createSpace && <DashboardButton setCreateSpace={setCreateSpace} /> }
            { createSpace && <CreateSpace /> }
        </>
    )
}