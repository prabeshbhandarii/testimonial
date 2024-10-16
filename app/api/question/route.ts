import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

const questionBodySchema = z.object({
    spaceId: z.string(),
    questions: z.array(
    z.object({
        content: z.string()
    })
    )
})

export async function POST(req: NextRequest){
    try {
        const questionBody = await req.json()

        const parsedBody = questionBodySchema.safeParse(questionBody)
        if(!parsedBody.success){
            return NextResponse.json({
                msg: "invalid input. " + parsedBody.error
            })
        }
        const actualQuestions = parsedBody.data.questions.map(q => q.content)
        const response = await prisma.question.create({
            data: {
                spaceId: parsedBody.data.spaceId,
                content: actualQuestions
            }
        })
        return(
            NextResponse.json({
                msg: "Questions created successfully",
                data: response
            })
        )
    } catch (err) {
        return NextResponse.json({
            err: "error creating questions. " + err
        }, {
            status: 411
        })
    }
}

export async function GET(req: NextRequest) {
    try {
        const spaceId = req.headers.get('spaceId') || ''
        const session = await getServerSession(authOptions)
        if(!session || !session.user?.id){
            return NextResponse.json({
                msg: "unauthorised"
            }, {status: 401})
        }
        const response = await prisma.question.findMany({
            where:{
                spaceId: spaceId
            }
        })

        return NextResponse.json({
            data: response[0].content
        })
    } catch (err) {
        return NextResponse.json({
            err: err
        })
    }
}