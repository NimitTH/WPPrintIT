import { prisma } from "@/lib/prisma"
import bcryptjs from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { name, username, email, password, tel, address, image } = await req.json()
        const hashedPassword = bcryptjs.hashSync(password, 10)
        
        const NewUser = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword,
                tel,
                address,
                image,
                updatedAt: new Date()
            }
        })
        console.log(NewUser);
        
        return NextResponse.json({ message: 'User created', NewUser })
    } catch (error) {
        return NextResponse.json({ error: 'User could not be created' }, { status: 500 })
    }
}