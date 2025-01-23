"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react";
import axios from "axios";
import type { NavbarProps } from "@heroui/react";
import { cn } from "@heroui/react";
import {
    Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User,
    Divider,
    Button,
    Badge,
    Link,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { ThemeSwitch } from "./ThemeSwitcher";
import { AcmeLogo } from "@/components/Icon";
import { CartIcon, SearchIcon, ProductIcon, ProfileIcon, OrderIcon, PasswordIcon, SignOut } from "@/components/Icon"

export default function NavBar(props: NavbarProps) {
    const { data: session, status } = useSession()
    const [cart, setCart] = useState<any[]>([])

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (!session) return;
                const res = await axios.get('/api/cart', { headers: { userId: session?.user.id } });
                setCart(res.data)
            } catch (error) {
                console.error("An error occurred while fetching products", error);
            }
        }

        if (session) {
            fetchCart();
        }
        if (window.location.hash === "#_=_") {
            window.history.replaceState(null, "", window.location.pathname);
        }
    }, [session]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInvisible, setIsInvisible] = useState<boolean>();

    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    const menuItems = [
        { name: "สินค้า", href: "/products", icon: <ProductIcon /> },
        {
            name: "รถเข็น", href: "/cart",
            icon: <Badge
                content={cart.length}
                shape="circle"
                size="sm"
                color="danger"
                showOutline={false}
                isInvisible={cart.length > 0 ? isInvisible : !isInvisible}
            >
                <CartIcon />
            </Badge>
        },
        { name: "รายการสั่งซื้อ", href: "/order", icon: <OrderIcon /> },
        { name: "จัดการบัญชี", href: "/profile", icon: <ProfileIcon /> },
        { name: "จัดการรหัสผ่าน", href: "/password", icon: <PasswordIcon /> },
    ];
    return (
        <Navbar
            {...props}
            classNames={{
                base: cn("border-default-100", {
                    "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
                }),
                wrapper: "w-full justify-center",
                item: "hidden md:flex",
            }}
            height="60px"
            maxWidth="xl"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            {/* Left Content */}
            <NavbarBrand className="flex gap-2">
                <div className="rounded-full bg-foreground text-background">
                    <AcmeLogo />
                </div>
                <p className="font-semibold mr-2">WPPrintIT</p>
            </NavbarBrand>

            {/* Center Content */}
            <NavbarContent justify="center" className=" hidden md:flex">
                {menuItems.slice(0, 3).map((item, index) => (
                    <NavbarItem key={index}>
                        <Link
                            href={item.href}
                            aria-current={isActive(item.href) ? "page" : undefined}
                            className={
                                isActive(item.href)
                                    ? "text-current font-black"
                                    : "text-default-500"
                            }
                            size="sm"
                        >
                            <span className="mr-2">{item.icon}</span>
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Right Content */}
            <NavbarContent className="hidden md:flex" justify="end">
                <NavbarItem className="ml-2 !flex gap-2">
                    {status === 'authenticated' && session.user ? (
                        <>
                            <ThemeSwitch />
                            <Dropdown>
                                <DropdownTrigger>
                                    <User
                                        as="button"
                                        key={session.user.image}
                                        avatarProps={{
                                            isBordered: true,

                                            src: session.user.image,
                                            // src: !session.user.image ? null : session.user.image,
                                        }}
                                        className="transition-transform"
                                        description={session.user.email}
                                        name={session.user.name}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="User Actions" variant="flat">
                                    <DropdownItem key="profile" href="/profile">
                                        จัดการบัญชี
                                    </DropdownItem>
                                    <DropdownItem key="password" href="/password">
                                        เปลี่ยนรหัสผ่าน
                                    </DropdownItem>
                                    <DropdownItem key="logout" color="danger" onPress={() => signOut({ callbackUrl: '/' })}>
                                        ออกจากระบบ
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>
                    ) : (
                        <>
                            <ThemeSwitch type={2} />
                            <Button className="text-default-500" as={Link} href="/signin" radius="full" variant="light">
                                เข้าสู่ระบบ
                            </Button>
                            <Button
                                className="bg-foreground font-medium text-background"
                                color="secondary"
                                endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                                radius="full"
                                variant="flat"
                                as={Link} href="/signup"
                            >
                                ลงทะเบียน
                            </Button>
                        </>
                    )}
                </NavbarItem>
            </NavbarContent>

            <NavbarMenuToggle className="text-default-400 md:hidden" />
            <NavbarMenu
                className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 
                shadow-medium backdrop-blur-sm backdrop-saturate-200 
                dark:bg-default-100/90"
            >
                {status === 'authenticated' && session.user ? (
                    <NavbarMenuItem >
                        {menuItems.map((item, index) => (
                            <div key={`${item}-${index}`}>
                                <Link
                                    className={isActive(item.href) ? "my-2 w-full text-background" : "my-2 w-full text-default-500"}
                                    href={item.href}
                                    size="md"
                                >
                                    <span className="mr-2">{item.icon}</span>
                                    {item.name}
                                </Link>
                                {index < menuItems.length - 1 && <Divider className="opacity-50" />}
                            </div>
                        ))}
                        <Divider className="opacity-50" />
                        <div
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="mt-2 flex items-center gap-2 text-medium text-danger-500 cursor-pointer"
                        >
                            <SignOut />
                            ออกจากระบบ
                        </div>
                    </NavbarMenuItem>
                ) : (
                    <>
                        <NavbarMenuItem>
                            <Button fullWidth as={Link} href="/signin" variant="faded">
                                เข้าสู่ระบบ
                            </Button>
                        </NavbarMenuItem>
                        <NavbarMenuItem >
                            <Button fullWidth as={Link} className="bg-foreground text-background" href="/signup">
                                ลงทะเบียน
                            </Button>
                        </NavbarMenuItem>
                    </>
                )}
                <NavbarMenuItem>
                    <Divider className="opacity-50" />
                    <ThemeSwitch type={1} />
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
};