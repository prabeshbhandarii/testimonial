"use client"
import ScriptDisplay from "@/app/components/ScriptDisplay";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SpaceData{
    id: string,
    name: string, 
    description: string, 
    message: string;
  }

export default function Page(){
    const url = usePathname()
    const spaceName = url.split('/')[2]
    return(
        <ScriptDisplay spaceName={spaceName} />
    )
}