"use client";
import React, { SVGProps, useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor,
    Image,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Avatar,
    Tabs, Tab, Popover, PopoverTrigger, PopoverContent, Card, CardHeader, CardBody, CardFooter,
    AvatarGroup
} from "@nextui-org/react";

import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { useSession } from "next-auth/react";
import ListBox from "./ListManage";


export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

import { EditDocumentIcon } from "./Icon";
import { Icon } from "@iconify/react/dist/iconify.js";

export const GalleryIcon = (props: IconSvgProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="24"
            role="presentation"
            viewBox="0 0 24 24"
            width="24"
            {...props}
        >
            <path
                d="M2.58078 19.0112L2.56078 19.0312C2.29078 18.4413 2.12078 17.7713 2.05078 17.0312C2.12078 17.7613 2.31078 18.4212 2.58078 19.0112Z"
                fill="currentColor"
            />
            <path
                d="M9.00109 10.3811C10.3155 10.3811 11.3811 9.31553 11.3811 8.00109C11.3811 6.68666 10.3155 5.62109 9.00109 5.62109C7.68666 5.62109 6.62109 6.68666 6.62109 8.00109C6.62109 9.31553 7.68666 10.3811 9.00109 10.3811Z"
                fill="currentColor"
            />
            <path
                d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V13.9V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const PaymentIcon = (props: IconSvgProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            focusable="false"
            role="presentation"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            {...props}
        >
            <path
                fill="currentColor"
                d="M6.5 5A4.5 4.5 0 0 0 2 9.5V11h28V9.5A4.5 4.5 0 0 0 25.5 5zM2 22.5V13h28v9.5a4.5 4.5 0 0 1-4.5 4.5h-19A4.5 4.5 0 0 1 2 22.5M21 19a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2z" />
        </svg>
    );
};

export const CanceledIcon = (props: IconSvgProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            focusable="false"
            role="presentation"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41"></path>
        </svg>
    );
};

export const DeliverIcon = (props: IconSvgProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            focusable="false"
            role="presentation"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M1.75 13.325q-.425 0-.712-.287t-.288-.713t.288-.712t.712-.288h3.5q.425 0 .713.288t.287.712t-.288.713t-.712.287zM7 20q-1.25 0-2.125-.875T4 17H2.75q-.5 0-.8-.375t-.175-.85l.225-.95h3.125q1.05 0 1.775-.725t.725-1.775q0-.325-.075-.6t-.2-.55h.95q1.05 0 1.775-.725t.725-1.775t-.725-1.775T8.3 6.175H4.5l.15-.6q.15-.7.688-1.137T6.6 4h10.15q.5 0 .8.375t.175.85L17.075 8H19q.475 0 .9.213t.7.587l1.875 2.475q.275.35.35.763t0 .837L22.15 16.2q-.075.35-.35.575t-.625.225H20q0 1.25-.875 2.125T17 20t-2.125-.875T14 17h-4q0 1.25-.875 2.125T7 20M3.75 9.675q-.425 0-.712-.288t-.288-.712t.288-.712t.712-.288h4.5q.425 0 .713.288t.287.712t-.288.713t-.712.287zM7 18q.425 0 .713-.288T8 17t-.288-.712T7 16t-.712.288T6 17t.288.713T7 18m10 0q.425 0 .713-.288T18 17t-.288-.712T17 16t-.712.288T16 17t.288.713T17 18m-1.075-5h4.825l.1-.525L19 10h-2.375z"
            ></path>
        </svg>
    );
};

export const ReceivedIcon = (props: IconSvgProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            focusable="false"
            role="presentation"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M13.409 2.513a3.75 3.75 0 0 0-2.818 0l-2.19.888l9.592 3.73l3.374-1.303a1.8 1.8 0 0 0-.46-.275zM22 7.191l-9.25 3.574v2.3A6.48 6.48 0 0 1 17.5 11c1.747 0 3.332.689 4.5 1.81zm-10.75 3.574v4.945a6.5 6.5 0 0 0-.25 1.791c0 .621.087 1.222.25 1.79v2.397a4 4 0 0 1-.659-.199l-7.498-3.04A1.75 1.75 0 0 1 2 16.827V7.192zM2.633 5.828L12 9.447l3.917-1.514l-9.543-3.71l-3.281 1.33q-.256.104-.46.275M23 17.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0m-5.458-3.498l.086.015l.063.02l.068.035l.047.032l2.548 2.542l.057.07a.5.5 0 0 1-.695.695l-.07-.057L18 15.707v5.294l-.008.09a.5.5 0 0 1-.402.402l-.09.008l-.09-.008a.5.5 0 0 1-.402-.402L17 21l-.001-5.292l-1.645 1.646l-.07.057a.5.5 0 0 1-.568 0l-.07-.057l-.057-.07a.5.5 0 0 1 0-.568l.057-.07l2.513-2.512l.056-.045l.074-.042l.083-.03l.06-.012l.056-.005z"></path>
        </svg>
    );
};

export const SuccessfulIcon = (props: IconSvgProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            focusable="false"
            role="presentation"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M13.409 2.513a3.75 3.75 0 0 0-2.818 0l-2.19.888l9.592 3.73l3.374-1.303a1.8 1.8 0 0 0-.46-.275zM22 7.191l-9.25 3.574v2.3A6.48 6.48 0 0 1 17.5 11c1.747 0 3.332.689 4.5 1.81zm-10.75 3.574v4.945a6.5 6.5 0 0 0-.25 1.791c0 .621.087 1.222.25 1.79v2.397a4 4 0 0 1-.659-.199l-7.498-3.04A1.75 1.75 0 0 1 2 16.827V7.192zM2.633 5.828L12 9.447l3.917-1.514l-9.543-3.71l-3.281 1.33q-.256.104-.46.275M17.5 23a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11m2.646-7.854a.5.5 0 0 1 .708.707l-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.707l1.646 1.647z"></path>
        </svg>
    );
};

export const RefundIcon = (props: IconSvgProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            focusable="false"
            role="presentation"
            width="24"
            height="24"
            viewBox="0 0 20 20"
            {...props}
        >
            <path
                fill="currentColor"
                d="m17.421 4.992l-3.046 1.219l-7.5-3L8.7 2.48a3.5 3.5 0 0 1 2.6 0l5.757 2.303a1.5 1.5 0 0 1 .364.208m-7.42 2.969l3.028-1.212l-7.5-3l-2.586 1.035a1.5 1.5 0 0 0-.364.208zM2 6.176q0-.166.035-.324L9.5 8.838v3.367a5.5 5.5 0 0 0-.5 2.294c0 .82.18 1.597.5 2.295v.938q-.409-.058-.8-.214l-5.757-2.303A1.5 1.5 0 0 1 2 13.822zm16 0v4.08A5.48 5.48 0 0 0 14.5 9a5.5 5.5 0 0 0-4 1.724V8.838l7.465-2.986q.035.158.035.324m1 8.324a4.5 4.5 0 1 0-9 0a4.5 4.5 0 0 0 9 0m-6.856-.352l.003-.002l2-2a.5.5 0 1 1 .707.707L13.707 14H16.5a.5.5 0 0 1 0 1h-2.793l1.147 1.147a.5.5 0 1 1-.707.707l-2-2a.5.5 0 0 1-.147-.35v-.007a.5.5 0 0 1 .144-.348"></path>
        </svg>
    );
};

export const PlusIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <path d="M6 12h12" />
                <path d="M12 18V6" />
            </g>
        </svg>
    );
};

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                fill="currentColor"
            />
        </svg>
    );
};

export const SearchIcon = (props: IconSvgProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
};

export const TestDee = (props: IconSvgProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 32 32" {...props}>
            <rect width="32" height="32" fill="none" />
            <path fill="#fff" d="M4 7a1 1 0 0 0 0 2h2.22l2.624 10.5c.223.89 1.02 1.5 1.937 1.5h12.47c.903 0 1.67-.6 1.907-1.47L27.75 10h-2.094l-2.406 9H10.78L8.157 8.5A1.984 1.984 0 0 0 6.22 7zm18 14c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m-9 0c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m3-14v5h-3l4 4l4-4h-3V7zm-3 16c.564 0 1 .436 1 1s-.436 1-1 1s-1-.436-1-1s.436-1 1-1m9 0c.564 0 1 .436 1 1s-.436 1-1 1s-1-.436-1-1s.436-1 1-1" />
        </svg>
    );
};

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }: IconSvgProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...otherProps}
        >
            <path
                d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};
export const Cancel = ({ size = 24, width, height, ...otherProps }: IconSvgProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="none"
            focusable="false"
            role="presentation"
            width={size || width}
            height={size || height}
            viewBox="0 0 24 24"
            {...otherProps}
        >
            <path
                fill="currentColor"
                d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path>
        </svg>
    );
};

const schema = z.object({
    id: z.number(),
    username: z.string().min(1, "ต้องมีชื่อผู้ใช้").max(100),
    name: z.string().max(100),
    tel: z
        .string()
        .min(1, "ต้องมีเบอร์")
        .min(10, "เบอร์ต้องมีความยาว 10 ตัวขึ้นไป"),
    email: z.string().min(1, "ต้องมีอีเมล์").email("อีเมล์ไม่ถูกต้อง"),
    address: z.string().max(100),
});

type Schema = z.infer<typeof schema>;

export const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "ชื่อผู้ใช้", uid: "user" },
    // { name: "จำนวนเงิน", uid: "money" },
    { name: "Role", uid: "role" },
    { name: "สถานะ", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["id", "user", "product", "money", "role", "status", "actions"];

export default function CartProductList() {
    const { data: session } = useSession();
    const [users, setUsers] = useState<any[]>([]);

    type Users = (typeof users)[0];

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`/api/user`);
            setUsers(res.data)
        } catch (error) {
            console.error("An error occurred while fetching products", error);
        }
    }

    useEffect(() => {
        fetchUsers();
        if (session) {
            fetchUsers();
        }
    }, [session])

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );
    const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "order_id",
        direction: "ascending",
    });

    const [page, setPage] = useState(1);

    const pages = Math.ceil(users.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        return filteredUsers;
    }, [users, hasSearchFilter, filterValue]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {

        return [...items].sort((a: Users, b: Users) => {

            const first = sortDescriptor.column === "price"
                ? a.order_item_id : a[sortDescriptor.column as keyof Users];

            const second = sortDescriptor.column === "price"
                ? b.order_item_id : b[sortDescriptor.column as keyof Users];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);


    // ✦. ── ✦. ── ✦. ลบสินค้าออกจากรถเข็น .✦ ── .✦ ── .✦

    // const deleteCartItem = async (cartItemId: number) => {
    //     try {
    //         console.log("cartItemId", cartItemId);

    //         await axios.delete(`/api/cart/${cartItemId}`);
    //         setUsers((prevProducts) =>
    //             prevProducts.filter((product) => product.order_item_id !== cartItemId)
    //         );
    //     } catch (error) {
    //         console.error("Error deleting cart item:", error);
    //     }
    // }

    // ✦. ── ✦. ── ✦. จัดการสั่งซื้อ .✦ ── .✦ ── .✦


    

    // ✦. ── ✦. ── ✦. จัดการภาพ .✦ ── .✦ ── .✦

    const [imageSrc, setImageSrc] = useState<string | any>("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleImageChange = (id: number) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];

                if (file) {
                    const formData = new FormData();
                    formData.append("image", file);

                    try {
                        const res = await axios.post("/api/upload", formData);

                        if (res.data.success) {
                            setImageSrc(res.data.url);
                        }

                        await axios.put(`/api/user/${id}`, { image: res.data.url });
                        fetchUsers();

                    } catch (error) {
                        console.error("Image upload failed:", error);
                    }
                }
            }
        };
        input.click();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDeleteUser = async (id: number, role: string) => {
        try {
            if (role === "ADMIN") {
                alert("แอดมินไม่สามารถลบแอดมินได้");
                return;
            }
            await axios.delete(`/api/user/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    // const handleDeleteSelected = async () => {
    //     try {
    //         const selectedIds = Array.from(normalizedSelectedKeys).map((id: any) => parseInt(id, 10));

    //         await Promise.all(
    //             selectedIds.map((id) => axios.delete(`/api/cart/${id}`))
    //         );

    //         setCartProducts((prevProducts) =>
    //             prevProducts.filter((product) => !selectedIds.includes(product.cart_item_id))
    //         );

    //         setSelectedKeys(new Set([]));
    //     } catch (error) {
    //         console.error("Error deleting selected items:", error);
    //     }
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleRoleChange = async (key: string, id: number, role: string) => {
        try {
            if (key === "USER" && role === "ADMIN") {
                alert("แอดมินไม่สามารถเปลี่ยนสิทธิเป็นผู้ใช้งานได้");
                return;
            }
            await axios.put(`/api/user/role/${id}`, { role: key });
            fetchUsers();
        } catch (error) {
            console.error("Error changing role:", error);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleStatusChange = async (key: string, id: number, role: string) => {
        console.log(key, id, role);
        try {
            if (key === "suspended" && role === "ADMIN") {
                alert("แอดมินไม่สามารถระงับการใช้งานได้");
                return;
            }
            await axios.put(`/api/user/status/${id}`, { status: key });
            fetchUsers();
        } catch (error) {
            console.error("Error changing status:", error);
        }
    }



    // ✦. ── ✦. ── ✦. พวก Modal .✦ ── .✦ ── .✦

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isModalScreenedImageOpen, setModalScreenedImageOpen] = useState(false);

    const [isModalEditUserOpen, setModalEditUserOpen] = useState(false);

    const closeModal = React.useCallback(() => {
        setModalScreenedImageOpen(false)
        setModalEditUserOpen(false)
    }, []);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    const [userId, setUserId] = useState<number>(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleEditUser = async (id: number, username: string, name: string, tel: string, email: string, address: string, image: string) => {
        setModalEditUserOpen(true);
        setUserId(id);
        setValue("id", id);
        setValue("username", username);
        setValue("name", name);
        setValue("tel", tel);
        setValue("email", email);
        setValue("address", address);
        setImageSrc(image);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
        try {
            console.log(data);
            await axios.put("/api/user", { ...data });
            fetchUsers();
            setModalEditUserOpen(false);
            alert("แก้ไขข้อมูลผู้ใช้งานเรียบร้อย");
        } catch (error) {
            console.error(error);
        }
    };

    const renderModal = React.useCallback(() => {
        return (
            <>
                <Modal
                    backdrop="opaque"
                    placement="center"

                    classNames={{
                        base: "border-1 border-default-200",
                    }}
                    isOpen={isModalEditUserOpen}
                    onOpenChange={onOpenChange}
                    onClose={closeModal}
                >
                    <ModalContent>
                        <ModalHeader className="flex flex-col gap-1 ">
                            แก้ไขข้อมูลผู้ใช้งาน
                        </ModalHeader>
                        <form
                            className="flex flex-col gap-3"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <ModalBody className="w-full">

                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative group w-40 h-40">
                                        <Avatar
                                            size="lg"
                                            src={imageSrc || ""}
                                            alt="Profile Picture"
                                            className="border w-full h-full text-large"
                                        />
                                        <div onClick={() => handleImageChange(userId)} className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300    ">
                                            <Icon icon="mingcute:pencil-fill" width="24" height="24" className="text-xl text-white"></Icon>
                                        </div>
                                    </div>

                                </div>

                                <Controller
                                    name="username"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Username"
                                            labelPlacement="outside"
                                            placeholder="กรอกชื่อผู้ใช้ของคุณ"
                                            isInvalid={!!errors.username}
                                            errorMessage={errors.username?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="ชื่อ"
                                            labelPlacement="outside"
                                            placeholder="กรอกชื่อของคุณ"
                                            isInvalid={!!errors.name}
                                            errorMessage={errors.name?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="tel"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="เบอร์โทร"
                                            labelPlacement="outside"
                                            placeholder="กรอกเบอร์ของคุณ"
                                            maxLength={10}
                                            isInvalid={!!errors.tel}
                                            errorMessage={errors.tel?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="อีเมล์"
                                            labelPlacement="outside"
                                            placeholder="กรอกอีเมล์ของคุณ"
                                            isInvalid={!!errors.email}
                                            errorMessage={errors.email?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="ที่อยู่"
                                            labelPlacement="outside"
                                            placeholder="กรอกที่อยู่ของคุณ"
                                            isInvalid={!!errors.address}
                                            errorMessage={errors.address?.message}
                                        />
                                    )}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button disabled={isSubmitting} fullWidth color="primary" type="submit">
                                    บันทีก
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>

            </>
        )
    }, [isModalEditUserOpen, onOpenChange, closeModal, handleSubmit, onSubmit, imageSrc, control, isSubmitting, handleImageChange, userId, errors.username, errors.name, errors.tel, errors.email, errors.address]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const statusMap: Record<string, string> = {
        "approve": "อนุมัติ",
        "suspended": "ระงับการใช้งาน",
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const roleMap: Record<string, string> = {
        "USER": "ผู้ใช้งาน",
        "ADMIN": "แอดมิน",
    };



    const renderCell = React.useCallback((user: Users, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof Users];

        switch (columnKey) {
            case "user":
                return (
                    <User
                        avatarProps={{ radius: "full", size: "sm", src: user.image }}
                        classNames={{
                            description: "text-default-500 line-clamp-1 w-[100px]",

                        }}
                        description={user.email}
                        name={user.name}
                    >
                        {user.name}
                    </User>
                );

            // case "money":
            //     return (
            //         <span>{new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(user.money)}</span>
            //     )

            case "role":
                return (
                    <Dropdown
                        className="border-1 border-default-200"
                        classNames={{
                            trigger: "border-none",
                        }}
                    >
                        <DropdownTrigger>
                            {roleMap[user.role]}
                        </DropdownTrigger>
                        <DropdownMenu onAction={(key) => handleRoleChange(key as string, user.id, user.role)}>
                            <DropdownItem key="USER">ผู้ใช้งาน</DropdownItem>
                            <DropdownItem key="ADMIN">แอดมิน</DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
                );

            case "status":
                return (
                    <Dropdown
                        className="border-1 border-default-200"
                        classNames={{
                            trigger: "border-none",
                        }}
                    >
                        <DropdownTrigger>{statusMap[user.status]}</DropdownTrigger>
                        <DropdownMenu onAction={(key) => handleStatusChange(key as string, user.id, user.role)}>
                            <DropdownItem key="approve">อนุมัติ</DropdownItem>
                            <DropdownItem key="suspended">ระงับการใช้งาน</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                );

            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="border-1 border-default-200" >
                            <DropdownTrigger>
                                <Button isIconOnly radius="full" size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-400" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    key="delete"
                                    onPress={() => handleEditUser(user.id, user.username, user.name, user.tel, user.email, user.address, user.image)}
                                    startContent={<EditDocumentIcon size={16} />}
                                >
                                    แก้ไขข้อมูลผู้ใช้
                                </DropdownItem>
                                <DropdownItem
                                    key="delete"
                                    onPress={() => handleDeleteUser(user.id, user.role)}
                                    startContent={<Cancel size={16} />}
                                >
                                    ลบผู้ใช้งาน
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [roleMap, statusMap, handleRoleChange, handleStatusChange, handleEditUser, handleDeleteUser]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            console.log("value", value);

            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="ค้นหาชื่อผู้ใช้งาน..."
                        size="sm"
                        startContent={<SearchIcon className="text-default-300" />}
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />


                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="">
                                <Button
                                    endContent={<ChevronDownIcon className="text-small" />}
                                    size="sm"
                                    variant="flat"
                                >
                                    คอลัมน์
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">มีผู้ใช้งานทั้งหมด {users.length} รายการ</span>
                    <label className="flex items-center text-default-400 text-small">
                        จำนวนแถวต่อหน้า:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [filterValue, visibleColumns, onSearchChange, onRowsPerPageChange, users.length]);

    // const handleDeleteSelected = async () => {
    //     try {
    //         const selectedIds = Array.from(normalizedSelectedKeys).map((id: any) => parseInt(id, 10));

    //         await Promise.all(
    //             selectedIds.map((id) => axios.delete(`/api/cart/${id}`))
    //         );

    //         setOrderItems((prevProducts) =>
    //             prevProducts.filter((product) => !selectedIds.includes(product.order_item_id))
    //         );

    //         setSelectedKeys(new Set([]));
    //     } catch (error) {
    //         console.error("Error deleting selected items:", error);
    //     }
    // }

    const normalizedSelectedKeys = React.useMemo(() => {
        if (selectedKeys === "all") {
            // สร้าง Set<string> ที่มี cart_item_id ของสินค้าทั้งหมด
            return new Set(users.map((user) => String(user.order_item_id)));
        }
        return selectedKeys;
    }, [selectedKeys, users]);

    const selectedIds = Array.from(normalizedSelectedKeys).map((id: any) => parseInt(id, 10));

    // const calculateTotalPrice = React.useCallback(() => {

    //     const selectedItems = users.filter((user) =>
    //         selectedIds.includes(product.order_item_id)
    //     );

    //     const totalPrice = selectedItems.reduce(
    //         (sum, item) => sum + item.product.price * item.quantity,
    //         0
    //     );

    //     return totalPrice;
    // }, [orderItems, selectedKeys]);

    const bottomContent = React.useMemo(() => {
        // const totalPrice = calculateTotalPrice();

        return (
            <div className="py-2 px-2 flex max-sm:flex-col justify-between items-center">
                <div className="max-sm:mb-2">
                    <span className="mr-2 text-small text-default-400">เลือก ({selectedKeys === "all" ? users.length : selectedKeys.size} ผู้ใช้งาน) </span>
                </div>
                <Pagination
                    showControls

                    classNames={{
                        cursor: "bg-foreground-100/100 text-background",
                        base: "flex flex-start"
                    }}
                    className="items-start max-sm:order-first"
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <div>
                    {/* <Button size="sm" onPress={() => deleteUser(selectedIds)} variant="flat">
                        ลบผู้ใช้งาน
                    </Button> */}
                </div>
            </div>
        );
    }, [selectedKeys, users.length, hasSearchFilter, page, pages]);

    const deleteUser = async (id: number) => {
        console.log("deleteUser");
    }


    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-full", "max-w-full", "shadow-none", "bg-background"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]/tr:first:before:rounded-none",
                "group-data-[first=true]/tr:last:before:rounded-none",
                // middle
                "group-data-[middle=true]/tr:before:rounded-none",
                // last
                "group-data-[last=true]/tr:first:before:rounded-none",
                "group-data-[last=true]/tr:last:before:rounded-none",
            ],
        }),
        [],
    );

    return (
        <>
            <div className="mt-5 mx-auto max-w-screen-xl flex">
                <ListBox />
                <Table
                    isCompact
                    aria-label="Example table with custom cells, pagination and sorting"
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"

                    checkboxesProps={{
                        classNames: {
                            wrapper: "after:bg-foreground after:text-background text-background",
                        },
                    }}
                    classNames={classNames}
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    topContent={topContent}
                    topContentPlacement="outside"
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={column.uid === "actions" ? "center" : "start"}
                                allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={"ไม่มีผู้ใช้งาน"} items={sortedItems}>
                        {(item) => (
                            <TableRow key={item.order_id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>


            {renderModal()}
        </>
    );
}