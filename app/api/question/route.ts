// import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";
// import { prisma } from "@/app/lib/db";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/utils/auth";

// const questionBodySchema = z.object({
//     spaceId: z.string(),
//     questions: z.array(
//     z.object({
//         content: z.string()
//     })
//     )
// })

// export async function POST(req: NextRequest){
//     try {
//         const questionBody = await req.json()

//         const parsedBody = questionBodySchema.safeParse(questionBody)
//         if(!parsedBody.success){
//             return NextResponse.json({
//                 msg: "invalid input. " + parsedBody.error
//             })
//         }
//         const actualQuestions = parsedBody.data.questions.map(q => q.content)
//         const response = await prisma.question.create({
//             data: {
//                 spaceId: parsedBody.data.spaceId,
//                 content: actualQuestions
//             }
//         })
//         return(
//             NextResponse.json({
//                 msg: "Questions created successfully",
//                 data: response
//             })
//         )
//     } catch (err) {
//         return NextResponse.json({
//             err: "error creating questions. " + err
//         }, {
//             status: 411
//         })
//     }
// }

// export async function GET(req: NextRequest) {
//     try {
//         const spaceId = req.headers.get('spaceId') || ''
//         const session = await getServerSession(authOptions)
//         if(!session || !session.user?.id){
//             return NextResponse.json({
//                 msg: "unauthorised"
//             }, {status: 401})
//         }
//         const response = await prisma.question.findMany({
//             where:{
//                 spaceId: spaceId
//             }
//         })

//         return NextResponse.json({
//             data: response[0].content
//         })
//     } catch (err) {
//         return NextResponse.json({
//             err: err
//         })
//     }
// }



import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

const questionBodySchema = z.object({
  spaceId: z.string().min(1, "Space ID is required"),
  questions: z.array(
    z.object({
      content: z.string().min(1, "Question content cannot be empty")
    })
  ).min(1, "At least one question is required")
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const questionBody = await req.json();
    const parsedBody = questionBodySchema.safeParse(questionBody);
    
    if (!parsedBody.success) {
      return NextResponse.json(
        { msg: "Invalid input", errors: parsedBody.error.format() },
        { status: 400 }
      );
    }

    const actualQuestions = parsedBody.data.questions.map(q => q.content);
    
    const response = await prisma.question.create({
      data: {
        spaceId: parsedBody.data.spaceId,
        content: actualQuestions,
      }
    });

    return NextResponse.json({
      msg: "Questions created successfully",
      data: response
    });
  } catch (err) {
    console.error("Error creating questions:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const spaceId = req.headers.get('spaceId');
    if (!spaceId) {
      return NextResponse.json(
        { msg: "Space ID is required" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { msg: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await prisma.question.findMany({
      where: {
        spaceId: spaceId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!response.length) {
      return NextResponse.json(
        { msg: "No questions found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: response[0].content });
  } catch (err) {
    console.error("Error fetching questions:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}