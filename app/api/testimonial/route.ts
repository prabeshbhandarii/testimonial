import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/route";


const testimonialSchema = z.object({
    content: z.string(),
    name: z.string(),
    email: z.string(),
    spaceId: z.string()
})

export async function POST(req: NextRequest){
    try {
        const testimonialBody = await req.json()
        const parsedBody = testimonialSchema.safeParse(testimonialBody)
        const session = await getServerSession(authOptions)
        const authorId = session?.user?.id

        if(!session || !authorId){
            return NextResponse.json({
                msg: "Unauthorized"
            }, { status: 401 })
        }

        if(!parsedBody.success){
            return NextResponse.json({
                msg: "invalid input"
            })
        }
        const response = prisma.testimonial.create({
            data: {
                content: parsedBody.data.content,
                name: parsedBody.data.name,
                email: parsedBody.data.email,
                authorId: authorId,
                spaceId: parsedBody.data.spaceId
            }
        })
        return NextResponse.json({
            msg: "testimonial taken succesfully",
            data: (await response)
        })
    } catch (err) {
        return NextResponse.json({
            err: err
        })
    }
}