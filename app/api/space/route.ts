import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/db";
import { authOptions } from "../auth/[...nextauth]/route";

const spaceBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    message: z.string()
})

export async function POST(req: NextRequest){
    try {
        const spaceBody = await req.json()
        const parsedBody = spaceBodySchema.safeParse(spaceBody)

        if(!parsedBody.success){
            return NextResponse.json({
                msg: "invalid input"
            })
        }

        const session = await getServerSession(authOptions)
        if(!session || !session.user?.id){
            return NextResponse.json({
                msg: "Unauthorized"
            }, { status: 401 })
        }
        const userId = session.user.id

        const response = await prisma.space.create({
            data: {
                userId: userId,
                name: parsedBody.data.name,
                description: parsedBody.data.description,
                message: parsedBody.data.message
            }
        })
        const spaceId = response.id

        return(
            NextResponse.json({
                msg: "Space created successfully",
                data: response
            })
        )
    } catch (err) {
        console.error(err)
        return (
            NextResponse.json({
            err: "error creating space. " + err
        }, {
            status: 500
        })
    )
    }
}