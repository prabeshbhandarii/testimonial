"use client"
import CreateSpaceForm from "@/app/components/CreateSpaceForm"
import { useState } from "react"
import CreateSpaceButton from "@/app/components/CreateSpaceButton"
import DashboardComponent from "@/app/components/DashboardComponent"

export default function Dashboard () {
    const [createSpace, setCreateSpace] = useState(false)
    return (
        // <DashboardComponent>
        //     { !createSpace && <CreateSpaceButton setCreateSpace={setCreateSpace} /> }
        //     { createSpace && <CreateSpaceForm /> }
        // </DashboardComponent>
        <>
            { !createSpace && 
                <DashboardComponent>
                    <CreateSpaceButton setCreateSpace={setCreateSpace} />
                </DashboardComponent>
            }
            { createSpace && <CreateSpaceForm /> }
        </>
    )
}