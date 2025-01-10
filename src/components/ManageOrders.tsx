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

import Link from "next/link";
import { useSession } from "next-auth/react";

import ListBox from "./ListBox";



export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

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

export const columns = [
    { name: "Order ID", uid: "order_id", sortable: true },
    { name: "ชื่อผู้สั่งซื้อ", uid: "user" },
    { name: "สินค้าที่สั่งซื้อ", uid: "product" },
    { name: "รวมจำนวนสินค้า", uid: "total_quantity" },
    { name: "รวมราคาสินค้า", uid: "total_amount" },
    { name: "สถานะสินค้า", uid: "status" },
    // { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["order_id", "user", "product", "total_quantity", "total_amount", "status"];

export default function CartProductList() {
    const { data: session } = useSession();
    const [orderItems, setOrderItems] = useState<any[]>([]);
    // const [selectedStatus, setSelectedStatus] = useState<string>('ToBePaid');

    type OrderItems = (typeof orderItems)[0];

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`/api/order`);
            setOrderItems(res.data)

        } catch (error) {
            console.error("An error occurred while fetching products", error);
        }
    }

    useEffect(() => {
        fetchOrders();
        if (session) {
            fetchOrders();
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

    const pages = Math.ceil(orderItems.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    // const filteredItems = React.useMemo(() => {
    //     let filteredOrderItems = [...orderItems];

    //     if (hasSearchFilter) {
    //             filteredOrderItems = filteredOrderItems.filter((orderItems) =>
    //             orderItems.product.product_name.toLowerCase().includes(filterValue.toLowerCase()),
    //         );
    //     }
    //     return filteredOrderItems;
    // }, [orderItems, filterValue, statusFilter]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return orderItems.slice(start, end);
    }, [page, orderItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {

        return [...items].sort((a: OrderItems, b: OrderItems) => {

            const first = sortDescriptor.column === "price"
                ? a.order_item_id : a[sortDescriptor.column as keyof OrderItems];

            const second = sortDescriptor.column === "price"
                ? b.order_item_id : b[sortDescriptor.column as keyof OrderItems];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);


    // ✦. ── ✦. ── ✦. ลบสินค้าออกจากรถเข็น .✦ ── .✦ ── .✦

    const deleteCartItem = async (cartItemId: number) => {
        try {
            console.log("cartItemId", cartItemId);

            await axios.delete(`/api/cart/${cartItemId}`);
            setOrderItems((prevProducts) =>
                prevProducts.filter((product) => product.order_item_id !== cartItemId)
            );
        } catch (error) {
            console.error("Error deleting cart item:", error);
        }
    }

    // ✦. ── ✦. ── ✦. จัดการสั่งซื้อ .✦ ── .✦ ── .✦

    const handleSubmit = async () => {
        try {
            console.log(selectedIds);

            const res = await axios.post("/api/order", { userId: session?.user?.id, selectedItems: selectedIds });
            console.log("Order created:", res.data);
            alert("Order created successfully!");
            fetchOrders(); // รีเฟรชหน้า Cart
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to create order");
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

    // ✦. ── ✦. ── ✦. จัดการภาพ .✦ ── .✦ ── .✦

    const [imageSrc, setImageSrc] = useState<string | any>("");
    const [imageId, setImageId] = useState(0);

    const handleImageSrc = (src: string, id: number) => {
        setImageSrc(src)
        setImageId(id)
        setModalScreenedImageOpen(true)
    }

    const handleImageChange = () => {
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
                        const res = await axios.post("/api/cart/upload", formData);

                        if (res.data.success) {
                            setImageSrc(res.data.url);
                        }

                        await axios.put(`/api/cart/${imageId}`, { screened_image: res.data.url });
                        fetchOrders();

                    } catch (error) {
                        console.error("Image upload failed:", error);
                    }
                }
            }
        };
        input.click();
    };

    const handleImageDelete = async () => {
        try {

            await axios.put(`/api/cart/${imageId}`, { screened_image: null });
            setImageSrc("");
            fetchOrders();
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const handleStatusChange = async (status: string, order_item_id: number) => {
        try {
            console.log(status, order_item_id);

            await axios.put(`/api/order/status/${order_item_id}`, { status });
            fetchOrders();
        } catch (error) {
            console.error("Error changing status:", error);
        }
    }

    const statusMap: Record<string, string> = {
        "ToBePaid": "ที่ต้องชำระ",
        "ToBeDelivered": "ที่ต้องจัดส่ง",
        "ToBeReceived": "ที่ต้องได้รับ",
        "SuccessfulDelivery": "ส่งสำเร็จ",
        "Canceled": "ยกเลิก",
        "RefundAndReturn": "คืนเงิน/คืนสินค้า",
    };

    // ✦. ── ✦. ── ✦. พวก Modal .✦ ── .✦ ── .✦

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isModalScreenedImageOpen, setModalScreenedImageOpen] = useState(false);

    const closeModal = React.useCallback(() => {
        setModalScreenedImageOpen(false)
    }, []);

    const renderModal = React.useCallback(() => {
        return (
            <Modal
                backdrop="opaque"
                placement="center"
                className=" "
                classNames={{
                    base: "border-1 border-default-200",
                }}
                isOpen={isModalScreenedImageOpen}
                onOpenChange={onOpenChange}
                onClose={closeModal}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 ">
                        เปลี่ยนภาพสกรีน
                    </ModalHeader>
                    <ModalBody className="w-2xl h-2xl mx-auto">
                        <Image
                            isBlurred
                            src={imageSrc || "cart/images/LINE_ALBUM_1122022_240625_2.jpg"}
                            alt="Product Image"
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }, [isModalScreenedImageOpen, imageSrc]);


    const renderCell = React.useCallback((order: OrderItems, columnKey: React.Key) => {
        const cellValue = order[columnKey as keyof OrderItems];

        switch (columnKey) {
            case "user":
                return (
                    <User
                        avatarProps={{ radius: "full", size: "sm", src: order.user.image }}
                        classNames={{
                            description: "text-default-500 line-clamp-1 w-[100px]",
                        }}
                        description={order.user.name}
                        name={order.user.name}
                    >
                        {order.user.name}
                    </User>
                );

            case "product":
                return (
                    <Popover showArrow placement="bottom">
                        <PopoverTrigger className="cursor-pointer">
                            ดูสินค้า
                        </PopoverTrigger>
                        <PopoverContent className="p-1">
                            <Card className="max-w-full border-none bg-transparent" shadow="none">
                                <CardHeader>
                                    รายละเอียดสินค้าที่สั่งซื้อ
                                </CardHeader>
                                <CardBody className="px-3 py-0">
                                    {order.orderitem.map((item: any, index: number) => (
                                        <div key={item.order_item_id} className="p-2 border-b">
                                            <div className="flex flex-row gap-2">
                                                <div className="flex flex-col">
                                                    <p>สินค้า</p>
                                                    <img src={item.product.image} alt={`Product ${item.productId}`} className="w-16 h-16" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <p>Product ID: {item.productId}</p>
                                                    <p>Quantity: {item.quantity}</p>
                                                    <p>Total Price: {item.total_price}</p>

                                                </div>
                                                <div>
                                                    <p>ภาพที่จะสกรีน</p>
                                                    <img src={item.screened_image} alt={`Product ${item.productId}`} className="w-16 h-16" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </CardBody>
                                <CardFooter className="gap-3">

                                </CardFooter>
                            </Card>
                        </PopoverContent>
                    </Popover>
                    // <div className="flex flex-row items-center relative">
                    //     {order.orderitem.map((item: any, index: number) => (

                    //     ))}
                    // </div>
                );
            // case "product":
            //     return (
            //         <div>
            //             {order.orderitem.map((item: any, index: number) => (
            //                 <div key={item.order_item_id} className="p-2 border-b">
            //                     <p>Product ID: {item.productId}</p>
            //                     <p>Quantity: {item.quantity}</p>
            //                     <p>Total Price: {item.total_price}</p>
            //                     <img src={item.screened_image} alt={`Product ${item.productId}`} className="w-16 h-16" />
            //                 </div>
            //             ))}
            //         </div>
            //     );

            case "total_amount":
                return (
                    <span>฿ {new Intl.NumberFormat(
                        "th-TH",
                        {
                            style: "decimal",
                            minimumFractionDigits: 2,
                        }
                    ).format(order.total_amount)}</span>
                );

            // case "screened_image":
            //     return (
            //         <div className="flex">
            //             <div
            //                 onClick={() => handleImageSrc(order.screened_image, order.cart_item_id)}
            //                 className="cursor-pointer"
            //             >
            //                 {order.screened_image ? (
            //                     <Image
            //                         alt={order.orderitem.product.product_name}
            //                         classNames={{
            //                             wrapper: "w-10 h-10",
            //                             img: "object-cover w-full h-full",
            //                         }}
            //                         radius="full"
            //                         src={order.screened_image}
            //                     />
            //                 ) : (
            //                     <span>ยังไม่มีภาพสกรีน</span>
            //                 )}
            //             </div>
            //         </div>
            //     );

            case "status":
                return (
                    <Dropdown
                        classNames={{
                            trigger: "border-none",
                        }}
                    >
                        <DropdownTrigger>
                            <Button className="bg-transparent">{statusMap[order.status]}</Button>
                        </DropdownTrigger>
                        <DropdownMenu onAction={(key) => handleStatusChange(key as string, order.order_id)}>
                            <DropdownItem key="ToBePaid">ที่ต้องชำระ</DropdownItem>
                            <DropdownItem key="ToBeDelivered">ที่ต้องจัดส่ง</DropdownItem>
                            <DropdownItem key="ToBeReceived">ที่ต้องได้รับ</DropdownItem>
                            <DropdownItem key="SuccessfulDelivery">ส่งสำเร็จ</DropdownItem>
                            <DropdownItem key="Canceled">ยกเลิก</DropdownItem>
                            <DropdownItem key="RefundAndReturn">คืนเงิน/คืนสินค้า</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                );

            // ถ้ามีเวลาค่อยทำตรงนี้

            // case "actions":
            //     return (
            //         <div className="relative flex justify-end items-center gap-2">
            //             <Dropdown className="border-1 border-default-200" >
            //                 <DropdownTrigger>
            //                     <Button isIconOnly radius="full" size="sm" variant="light">
            //                         <VerticalDotsIcon className="text-default-400" />
            //                     </Button>
            //                 </DropdownTrigger>
            //                 <DropdownMenu>
            //                     <DropdownItem
            //                         key="delete"
            //                         onPress={() => deleteCartItem(order.order_item_id)}
            //                         startContent={<Cancel size={16} />}
            //                     >
            //                         ลบ
            //                     </DropdownItem>
            //                 </DropdownMenu>
            //             </Dropdown>
            //         </div>
            //     );
            default:
                return cellValue;
        }
    }, [isModalScreenedImageOpen, setImageSrc, onOpenChange, closeModal, setModalScreenedImageOpen]);

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
                        placeholder="ค้นหาชื่อสินค้าในรถเข็น..."
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
                    <span className="text-default-400 text-small">มีสินค้าทั้งหมด {orderItems.length} รายการ</span>
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
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        orderItems.length,
        hasSearchFilter,
    ]);

    const handleDeleteSelected = async () => {
        try {
            const selectedIds = Array.from(normalizedSelectedKeys).map((id: any) => parseInt(id, 10));

            await Promise.all(
                selectedIds.map((id) => axios.delete(`/api/cart/${id}`))
            );

            setOrderItems((prevProducts) =>
                prevProducts.filter((product) => !selectedIds.includes(product.order_item_id))
            );

            setSelectedKeys(new Set([]));
        } catch (error) {
            console.error("Error deleting selected items:", error);
        }
    }

    const normalizedSelectedKeys = React.useMemo(() => {
        if (selectedKeys === "all") {
            // สร้าง Set<string> ที่มี cart_item_id ของสินค้าทั้งหมด
            return new Set(orderItems.map((product) => String(product.order_item_id)));
        }
        return selectedKeys;
    }, [selectedKeys, orderItems]);

    const selectedIds = Array.from(normalizedSelectedKeys).map((id: any) => parseInt(id, 10));

    const calculateTotalPrice = React.useCallback(() => {

        const selectedItems = orderItems.filter((product) =>
            selectedIds.includes(product.order_item_id)
        );

        const totalPrice = selectedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );

        return totalPrice;
    }, [orderItems, selectedKeys]);

    const bottomContent = React.useMemo(() => {
        // const totalPrice = calculateTotalPrice();

        return (
            <div className="py-2 px-2 flex max-sm:flex-col justify-between items-center">
                <div className="max-sm:mb-2">
                    <span className="mr-2 text-small text-default-400">เลือก ({selectedKeys === "all" ? orderItems.length : selectedKeys.size} สินค้า) </span>
                    {/* <Button
                        size="sm"
                        variant="flat"
                        onPress={() => handleDeleteSelected()}
                        startContent={<Cancel size={16} />}
                    >
                        ยกเลิกสินค้า
                    </Button> */}
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
                {/* <div>
                    <span className="mr-2 text-small font-medium text-default-400">
                        {selectedKeys === "all"
                            ? <span> รวม ({orderItems.length} สินค้า) : <span className="text-small font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500">฿ {new Intl.NumberFormat(
                                "th-TH",
                                {
                                    style: "decimal",
                                    minimumFractionDigits: 2,
                                }
                            ).format(totalPrice)}</span></span>
                            : <span> รวม ({selectedKeys.size} สินค้า) : <span className="text-medium font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500">฿ {new Intl.NumberFormat(
                                "th-TH",
                                {
                                    style: "decimal",
                                    minimumFractionDigits: 2,
                                }
                            ).format(totalPrice)}</span></span>

                        }
                    </span>

                    <Button size="sm" onPress={() => handleSubmit()} variant="flat">
                        สั่งซื้อสินค้า
                    </Button>
                </div> */}
            </div>
        );
    }, [selectedKeys, items.length, calculateTotalPrice, page, pages, hasSearchFilter]);



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
                    <TableBody emptyContent={"ไม่มีสินค้า"} items={sortedItems}>
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



// export const QuantityControl = ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) => {
//     const [currentQuantity, setCurrentQuantity] = useState(quantity);
//     const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

//     const updateQuantity = async (newQuantity: number) => {
//         console.log("cartItemId", cartItemId, "newQuantity", newQuantity);

//         if (newQuantity < 0) return;
//         setCurrentQuantity(newQuantity);

//         try {
//             await axios.put(`/api/cart/${cartItemId}`, { quantity: newQuantity });
//         } catch (error) {
//             console.error("Error updating quantity:", error);
//         }
//     };

//     const handleHold = (operation: "increment" | "decrement") => {
//         let speed = 500; // เริ่มต้นที่ 500ms
//         let newQuantity = currentQuantity;

//         const increment = () => {
//             newQuantity = operation === "increment" ? newQuantity + 1 : newQuantity - 1;
//             if (newQuantity < 0) return; // ป้องกันค่าติดลบ
//             setCurrentQuantity(newQuantity);
//             updateQuantity(newQuantity);
//             speed = Math.max(50, speed - 50); // ลดเวลาเพิ่มความเร็ว (ต่ำสุด 50ms)
//             clearInterval(intervalRef.current!);
//             intervalRef.current = setInterval(increment, speed);
//         };

//         increment(); // เรียกฟังก์ชันเพิ่ม/ลดครั้งแรก
//         intervalRef.current = setInterval(increment, speed);
//     };

//     const handleRelease = () => {
//         if (intervalRef.current) {
//             clearInterval(intervalRef.current);
//             intervalRef.current = null;
//         }
//     };

//     return (
//         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//             <button
//                 onMouseDown={() => handleHold("decrement")}
//                 onMouseUp={handleRelease}
//                 onMouseLeave={handleRelease}
//             >
//                 -
//             </button>
//             <span>{new Intl.NumberFormat("th-TH").format(currentQuantity)}</span>
//             <button
//                 onMouseDown={() => handleHold("increment")}
//                 onMouseUp={handleRelease}
//                 onMouseLeave={handleRelease}
//             >
//                 +
//             </button>
//         </div>
//     );
// };

