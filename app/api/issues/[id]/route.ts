import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// interface Props{
//     params: {params: {id: string}}
// }

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    const { assignedToUserId, title, description } = body;

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({ where: { id: body.assignedToUserId } })

        if (!user)
            return NextResponse.json(
                { error: 'Invalid User' },
                { status: 404 }
            )
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue)
        return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 })

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            assignedToUserId
        }
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

    prisma.issue.delete({
        where: { id: issue.id }
    });

    return NextResponse.json({}, { status: 200 })
}