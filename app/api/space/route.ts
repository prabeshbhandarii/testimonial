import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/lib/db";

const spaceBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    message: z.string()
})

export async function POST(req: NextRequest){
    try {
        const spaceBody = await req.json()
        spaceBodySchema.safeParse(spaceBody)
        const token = await getToken({req})
        if(!token || !token.sub){
            return NextResponse.json({
                msg: "Token not provided"
            })
        }
        const userId = parseInt(token?.sub)
        const response = await prisma.space.create({
            data: {
                userId: userId,
                name: spaceBody.name,
                description: spaceBody.description,
                message: spaceBody.message
            }
        })
        return(
            NextResponse.json({
                msg: "Space created successfully",
                data: response
            })
        )
    } catch (err) {
        NextResponse.json({
            err: "error creating space. " + err
        }, {
            status: 411
        })
    }
}