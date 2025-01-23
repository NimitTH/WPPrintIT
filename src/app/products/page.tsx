import NavBar from "@/components/NavBar"
import ProductList from "@/components/ListProduct";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function page() {
    const session = await auth();
    if (!session) redirect("/signin")
    if (session.user.status === "suspended") redirect("/suspended")
    return (
        <div>
            <NavBar />
            <ProductList />
        </div>
    )
}
