import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { getS3Url } from "@/lib/s3";
import { useClerk } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
    const {userId} = await auth()
    if(!userId){
        return NextResponse.json({error:"unauthorized"} , {status: 401})
    }
    try{
        const body = await req.json()
        const {title, description, file_key, postType} = body

        const upload = await db.insert(posts).values({
            userId,
            title,
            description,
            postType,
            fileUrl: getS3Url(file_key),
        })

        return NextResponse.json({message: "success"}, {status: 200})
    }
    catch(err){

    }
}