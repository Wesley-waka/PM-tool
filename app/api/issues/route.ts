import {NextRequest} from 'next/server';
import {z} from 'zod';
import prisma from '@/prisma/client';



export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(),{status: 400});

    const newIssue = prisma.issue.create({
        data: {title: body.title,description: body.description}
    });

    return NextResponse.json(newIssue,{status: 200})
}