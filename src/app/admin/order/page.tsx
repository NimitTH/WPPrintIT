import ManageOrders from "@/components/ManageOrders";
import Navbar from "@/components/NavBar";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function OrderPage() {
    // const session = await auth();
    // if (session?.user?.role === "USER") redirect("/products")
    return (
        <div>
            <Navbar />
            <ManageOrders />
        </div>
    )
}