import { prisma } from "@/lib/prisma"
import bcryptjs from "bcryptjs"
import { log } from "console"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const { name, username, email, password, tel, address, image } = await req.json()
        log({ name, username, email, password, tel, address, image })
        const hashedPassword = bcryptjs.hashSync(password, 10)
        
        const NewUser = await prisma.user.create({
            data: {
                name: name,
                username: username,
                email: email,
                password: hashedPassword,
                tel: tel,
                address: address,
                image: image,
                updatedAt: new Date()
            }
        })
        console.log(NewUser);
        
        return NextResponse.json({ message: 'User created', NewUser })
    } catch (error) {
        return NextResponse.json({ error: 'User could not be created' }, { status: 500 })
    }
}