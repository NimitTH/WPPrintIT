// import { prisma } from '@/lib/prisma'
// import { NextResponse, type NextRequest } from 'next/server';

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         const { category_name } = await req.json()
//         const EditCategory = await prisma.productCategory.update({
//             where: { id: Number(params.id) },
//             data: { category_name }
//         })
//         return NextResponse.json(EditCategory)
//     } catch (error) {
//         console.log(error);
//     }
// }

// export async function DELETE({ params }: { params: { id: string } }) {
//     try {
//         return NextResponse.json(
//             await prisma.productCategory.delete({
//                 where: { id: Number(params.id) }
//             })
//         )
//     } catch (error) {
//         console.log(error);
//     }
// }