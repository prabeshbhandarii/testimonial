"use client"
import AppbarClient from "@/app/components/AppbarClient"
import CreateSpace from "@/app/components/CreateSpace"
import { useState } from "react"
import PrivateRoute from "@/app/components/PrivateRoute"
import CreateSpaceButton from "@/app/components/CreateSpaceButton"
import Footer from "@/app/components/Footer"
import Overview from "@/app/components/Overview"
import Spaces from "@/app/components/Spaces"

export default function Dashboard () {
    const [createSpace, setCreateSpace] = useState(false)
    return (
        <PrivateRoute>
            <AppbarClient />
            <Overview />
            <hr />
            <Spaces />
            { !createSpace && <CreateSpaceButton setCreateSpace={setCreateSpace} /> }
            { createSpace && <CreateSpace /> }
            <hr />
            <Footer />
        </PrivateRoute>
    )
}