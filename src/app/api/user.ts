import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'PUT') {
    console.log('PUT request received:', req);
    try {
        const { name, username, email, tel, address, image } = req.body;
        console.log(name, username, email, tel, address, image);
        
        if (!email) {
            return res.status(200).json({ error: "Email is required" });
        }

        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                name: name,
                username: username,
                email: email,
                tel: tel,
                address: address,
                image: image,
                updatedAt: new Date()
            },
        });

        return res.status(200).json({ message: "User edited successfully", user: updatedUser });
    } catch (error: any) {
        console.error("Error updating user:", error);

        return res.status(500).json( { error: "User could not be edited", details: error.message });
    }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}