import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/db";
import { authOptions } from "@/app/utils/auth";

export async function GET(req: NextRequest){
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id
        const spaceName = req.headers.get('spaceName') || ''

        if(!session || !session.user?.id){
            return NextResponse.json({
                msg: "Unauthorized"
            }, { status: 401 })
        }

        const response = await prisma.space.findFirst({
            where: {
                userId: userId,
                name: spaceName
            }
        })
        return NextResponse.json({
            data: response
        })
    } catch (err) {
        return NextResponse.json({
            msg: "could not find the space for this user"
        })
    }
}