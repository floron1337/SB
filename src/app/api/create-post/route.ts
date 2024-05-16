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
    /*
    const clerk = useClerk()
    
    if(!clerk.user){
        return NextResponse.json({error:"unauthorized"} , {status: 401})
    }
    
    try{
        const body = await req.json()
        const {file_key, file_name} = body
        await loadS3intoPinecone(file_key)

        const chat_id = await db.insert(chats).values({
            fileKey: file_key,
            pdfName: file_name,
            pdfUrl: getS3Url(file_key),
            userId,
        }).returning({
            insertedId: chats.id
        })

        return NextResponse.json({
            chat_id: chat_id[0].insertedId
        }, {status: 200})
    }
    catch(error){
        console.error(error);
        return NextResponse.json(
            { error: "internal server error" },
            { status: 500 }
        )
    }
    */
}