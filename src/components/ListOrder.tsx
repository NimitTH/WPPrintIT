"use client";
import React, { SVGProps, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
    Popover, PopoverTrigger, PopoverContent,
    Card, CardHeader, CardBody, CardFooter,
    AvatarGroup, Avatar,
    SortDescriptor,
    useDisclosure,
    ScrollShadow,
    Pagination,
    Selection,
    Tabs, Tab,
    Button,
    Image,
    Input,
    User,
} from "@heroui/react";
import { GalleryIcon, PaymentIcon, CanceledIcon, DeliverIcon, ReceivedIcon, SuccessfulIcon, RefundIcon, PlusIcon, VerticalDotsIcon, SearchIcon, ChevronDownIcon, Cancel } from "@/components/Icon"

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
    { name: "สินค้า", uid: "product" },
    { name: "ภาพที่สกรีน", uid: "orderscreenedimages" },
    { name: "อยากได้เพิ่มเติม", uid: "additional" },
    { name: "จำนวน", uid: "quantity", sortable: true },
    { name: "ราคา", uid: "price", sortable: true },
    { name: "ราคารวม", uid: "total_price", sortable: true },

];

const INITIAL_VISIBLE_COLUMNS = ["product", "orderscreenedimages", "additional", "price", "total_price", "quantity"];

type OrderItems = {
    id: number;
    orderId: number;
    order_id: number;
    order_item_id: number;
    quantity: number;
    productId: number;
    product: {
        product_id: number;
        product_name: string;
        description: string;
        price: number;
        quantity: number;
        stock: number;
        image: string;
    };
    screened_image: string;
    orderscreenedimages: {
        // orderItemId: number;
        screened_image_id: number;
        screened_image_url: string;
    }[];
    additional: string;
    total_price: number;
    status: string;
    cart_item_id: number;
    created_at: string;
    updated_at: string;

}

export default function CartProductList() {
    const { data: session } = useSession();
    const [orderItems, setOrderItems] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('ToBePaid');

    // type OrderItems = (typeof orderItems)[0]

    const fetchOrders = useCallback(async (status?: string) => {
        try {
            if (!session) return;
            const query = status ? `?status=${status}` : "";
            const res = await axios.get(`/api/order/${session?.user.id}${query}`);
            setOrderItems(res.data)

        } catch (error) {
            console.error("An error occurred while fetching products", error);
        }
    }, [session])

    console.log(orderItems);

    const [openPopovers, setOpenPopovers] = useState<Record<number, boolean>>({});


    useEffect(() => {
        fetchOrders(selectedStatus);
        if (session) {
            fetchOrders(selectedStatus);
        }
    }, [session, selectedStatus, fetchOrders, openPopovers])

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );
    // const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "price",
        direction: "ascending",
    });

    const [page, setPage] = useState(1);

    const pages = Math.ceil(orderItems.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredOrderItems = [...orderItems];

        if (hasSearchFilter) {
            filteredOrderItems = filteredOrderItems.filter((orderItems: OrderItems) =>
                orderItems.product.product_name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        return filteredOrderItems;
    }, [orderItems, hasSearchFilter, filterValue]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

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
                prevProducts.filter((product: OrderItems) => product.id !== cartItemId)
            );
        } catch (error) {
            console.error("Error deleting cart item:", error);
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

    const [imageSrc, setImageSrc] = useState<string>("");
    const [imageId, setImageId] = useState(0);

    const handleImageSrc = useCallback((src: string, id: number) => {
        setImageSrc(src)
        setImageId(id)
        setModalScreenedImageOpen(true)
    }, [])


    console.log(orderItems);

    // const handleImageChange = () => {
    //     const input = document.createElement("input");
    //     input.type = "file";
    //     input.accept = "image/*";
    //     input.onchange = async (e: Event) => {
    //         const target = e.target as HTMLInputElement;
    //         if (target.files && target.files[0]) {
    //             const file = target.files[0];

    //             if (file) {
    //                 const formData = new FormData();
    //                 formData.append("image", file);

    //                 try {
    //                     const res = await axios.post("/api/cart/upload", formData);

    //                     if (res.data.success) {
    //                         setImageSrc(res.data.url);
    //                     }

    //                     await axios.put(`/api/cart/${imageId}`, { screened_image: res.data.url });
    //                     fetchOrders();

    //                 } catch (error) {
    //                     console.error("Image upload failed:", error);
    //                 }
    //             }
    //         }
    //     };
    //     input.click();
    // };

    // const handleImageDelete = async () => {
    //     try {

    //         await axios.put(`/api/cart/${imageId}`, { screened_image: null });
    //         setImageSrc("");
    //         fetchOrders();
    //     } catch (error) {
    //         console.error("Error deleting image:", error);
    //     }
    // };

    // ✦. ── ✦. ── ✦. พวก Modal .✦ ── .✦ ── .✦

    const { /* isOpen, onOpen,*/ onOpenChange } = useDisclosure();
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
    }, [isModalScreenedImageOpen, onOpenChange, closeModal, imageSrc]);


    const renderCell = useCallback((order: OrderItems, columnKey: React.Key) => {
        console.log(order);

        switch (columnKey) {

            case "product":
                return (
                    <User
                        as={Link}
                        href={`/products/${order.product.product_id}`}
                        avatarProps={{ radius: "full", size: "sm", src: order.product.image }}
                        classNames={{
                            description: "text-default-500 line-clamp-1 w-[100px]",
                        }}
                        description={order.product.description}
                        name={order.product.product_name}
                    >
                        {order.product.product_name}
                    </User>
                );

            case "orderscreenedimages":
                if (!order.orderscreenedimages || order.orderscreenedimages.length === 0) {
                    return <span>ไม่สกรีนภาพ</span>;
                }

                return (

                    <Popover
                        isOpen={!!openPopovers[order.order_item_id]}
                        onOpenChange={(open) =>
                            setOpenPopovers((prev) => ({
                                ...prev,
                                [order.order_item_id]: open,
                            }))
                        }
                        showArrow
                        backdrop="opaque"
                        classNames={{
                            base: [
                                "before:bg-default-200",
                            ],
                            content: [
                                "py-3 px-4 border border-default-200",
                                "bg-gradient-to-br from-white to-default-300",
                                "dark:from-default-100 dark:to-default-50",
                            ],
                        }}
                        placement="right"
                    >
                        <PopoverTrigger>
                            <AvatarGroup
                                isBordered
                                max={2}
                                total={order.orderscreenedimages.length}
                            >
                                {order.orderscreenedimages.map((image: any) => (
                                    <Avatar
                                        key={image.screened_image_id}
                                        src={image.screened_image_url}
                                    />
                                ))}
                            </AvatarGroup>
                        </PopoverTrigger>
                        <PopoverContent>
                            <AvatarGroup isGrid max={99}>
                                {order.orderscreenedimages.map((image: any) => (
                                    <Avatar
                                        key={image.screened_image_id}
                                        alt={`Image ${image.screened_image_id}`}
                                        onClick={() => {
                                            handleImageSrc(image.screened_image_url, image.screened_image_id)
                                            setOpenPopovers((prev) => ({
                                                ...prev,
                                                [order.order_item_id]: false,
                                            }));
                                        }}
                                        src={image.screened_image_url}

                                    />
                                ))}
                            </AvatarGroup>
                        </PopoverContent>
                    </Popover>
                );

            case "additional":
                if (!order.additional || order.additional === "") {
                    return <span>ไม่มีเพิ่มเติม</span>;
                }
                return (
                    <span>{order.additional}</span>
                )

            case "quantity":
                return (
                    <div className="flex">
                        <span>{new Intl.NumberFormat(
                            "th-TH",
                            {
                                style: "decimal",
                                minimumFractionDigits: 0,
                            }
                        ).format(order.quantity)}</span>
                    </div>
                );

            case "price":
                return (
                    <div className="flex">
                        <span>{new Intl.NumberFormat(
                            "th-TH",
                            {
                                style: "decimal",
                                minimumFractionDigits: 2,
                            }
                        ).format(order.product.price)}</span>
                    </div>
                );

            case "total_price":
                return (
                    <div className="flex">
                        <span>{new Intl.NumberFormat(
                            "th-TH",
                            {
                                style: "decimal",
                                minimumFractionDigits: 2,
                            }
                        ).format(order.total_price)}</span>
                    </div>
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
                return <span>{order[columnKey as keyof OrderItems]?.toString() || "ไม่ระบุข้อมูล"}</span>;
        }
    }, [openPopovers, handleImageSrc]);

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
                        placeholder="ค้นหาชื่อสินค้า..."
                        size="sm"
                        startContent={<SearchIcon className="text-default-300" />}
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />


                    {/* <div className="flex gap-3">
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
                    </div> */}
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
    }, [filterValue, /* visibleColumns, */ onSearchChange, onRowsPerPageChange, orderItems.length]);

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

    // const normalizedSelectedKeys = React.useMemo(() => {
    //     if (selectedKeys === "all") {
    //         // สร้าง Set<string> ที่มี cart_item_id ของสินค้าทั้งหมด
    //         return new Set(orderItems.map((product: OrderItems) => String(product.order_item_id)));
    //     }
    //     return selectedKeys;
    // }, [selectedKeys, orderItems]);

    // const selectedIds = Array.from(normalizedSelectedKeys).map((id: any) => parseInt(id, 10));

    // const calculateTotalPrice = React.useCallback(() => {

    //     const selectedItems = orderItems.filter((product: OrderItems) =>
    //         selectedIds.includes(product.order_item_id)
    //     );

    //     const totalPrice = selectedItems.reduce(
    //         (sum: number, item: OrderItems) => sum + item.product.price * item.quantity,
    //         0
    //     );

    //     return totalPrice;
    // }, [orderItems, selectedIds]);

    const bottomContent = React.useMemo(() => {
        // const totalPrice = calculateTotalPrice();

        return (
            <div className="py-2 px-2 flex max-sm:flex-col justify-between items-center">
                <div className="max-sm:mb-2">
                    <span className="mr-2 text-small text-transparent text-default-400">เลือก ({selectedKeys === "all" ? orderItems.length : selectedKeys.size} สินค้า) </span>
                    {/* <Button
                        size="sm"
                        variant="flat"
                        onPress={() => handleDeleteSelected()}
                        startContent={<Cancel size={16} />}
                        className="bg-transparent text-transparent"
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
                <div>
                    <span className="mr-2 text-small font-medium text-default-400">
                        รวมราคาสินค้าทั้งหมด : <span className="text-small font-semibold text-transparent bg-clip-text bg-[linear-gradient(to_right,theme(colors.emerald.400),theme(colors.green.500),theme(colors.teal.300),theme(colors.cyan.400),theme(colors.blue.300),theme(colors.sky.500),theme(colors.blue.400))] bg-[length:200%_auto] animate-gradient">฿ {new Intl.NumberFormat(
                            "th-TH",
                            {
                                style: "decimal",
                                minimumFractionDigits: 2,
                            }
                        ).format(orderItems.reduce((sum: number, item: OrderItems) => sum + item.product.price * item.quantity, 0))}</span>
                    </span>
                </div>
            </div>
        );
    }, [selectedKeys, orderItems, hasSearchFilter, page, pages]);



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
            <div className="mx-auto max-w-screen-xl flex flex-col mt-2">
                <Tabs
                    aria-label="Options"
                    classNames={{
                        tabList: "gap-8 w-full relative rounded-none p-0 border-b border-divider",
                        cursor: "w-full bg-[#22d3ee]",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-[#06b6d4]",

                    }}
                    color="primary"
                    variant="underlined"
                    selectedKey={selectedStatus}
                    onSelectionChange={(key) => setSelectedStatus(key as string)}
                >
                    <Tab
                        key="ToBePaid"
                        title={
                            <div className="flex items-center space-x-2">
                                <PaymentIcon />
                                <span>ที่ต้องชำระ</span>
                            </div>
                        }
                    />
                    <Tab
                        key="ToBeDelivered"
                        title={
                            <div className="flex items-center space-x-2">
                                <DeliverIcon />
                                <span>ที่ต้องจัดส่ง</span>
                            </div>
                        }
                    />
                    <Tab
                        key="ToBeReceived"
                        title={
                            <div className="flex items-center space-x-2">
                                <ReceivedIcon />
                                <span>ที่ต้องได้รับ</span>
                            </div>
                        }
                    />
                    <Tab
                        key="SuccessfulDelivery"
                        title={
                            <div className="flex items-center space-x-2">
                                <SuccessfulIcon />
                                <span>สำเร็จ</span>
                            </div>
                        }
                    />
                    {/* <Tab
                        key="Canceled"
                        title={
                            <div className="flex items-center space-x-2">
                                <CanceledIcon />
                                <span>ยกเลิก</span>
                            </div>
                        }
                    />
                    <Tab
                        key="RefundAndReturn"
                        title={
                            <div className="flex items-center space-x-2">
                                <RefundIcon />
                                <span>คืนเงิน / คืนสินค้า</span>
                            </div>
                        }
                    /> */}
                </Tabs>
            </div>

            <Table
                isCompact
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                className="mx-auto max-w-screen-xl mt-5"
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
                    {(item: OrderItems) => (
                        <TableRow key={item.order_item_id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {renderModal()}
        </>
    );
}