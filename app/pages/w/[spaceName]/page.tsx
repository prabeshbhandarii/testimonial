"use client"
import ScriptDisplay from "@/app/components/ScriptDisplay";
import { usePathname } from "next/navigation";

export default function Page(){
    const url = usePathname()
    const spaceName = url.split('/')[3]
    return(
        <ScriptDisplay spaceName={spaceName} />
    )
}
