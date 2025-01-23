"use client";
import React, { SVGProps, useState, useEffect, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { redirect } from 'next/navigation';
import NextImage from "next/image";
import {
    Popover, PopoverTrigger, PopoverContent, Card, CardHeader, CardBody, CardFooter,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
    Modal, ModalContent, ModalHeader, ModalBody,
    SortDescriptor,
    useDisclosure,
    Pagination,
    Selection,
    Button,
    Input,
    Image,
    User,
} from "@heroui/react";
import ListBox from "./ListBoxManage";
import { GalleryIcon, PaymentIcon, CanceledIcon, DeliverIcon, ReceivedIcon, SuccessfulIcon, RefundIcon, PlusIcon, VerticalDotsIcon, SearchIcon, ChevronDownIcon, Cancel } from "@/components/Icon"

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
    { name: "Order ID", uid: "order_id", sortable: true },
    { name: "ชื่อผู้สั่งซื้อ", uid: "user" },
    { name: "สินค้าที่สั่งซื้อ", uid: "product" },
    { name: "รวมจำนวนสินค้า", uid: "total_quantity", sortable: true },
    { name: "รวมราคาสินค้า", uid: "total_amount", sortable: true },
    { name: "สถานะสินค้า", uid: "status" },
    // { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["order_id", "user", "product", "total_quantity", "total_amount", "status"];

export default function CartProductList() {
    const { data: session, status } = useSession();
    if (status === "unauthenticated") redirect("signin")
    const [orderItems, setOrderItems] = useState([]);
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
    const [rowsPerPage, setRowsPerPage] = useState(20);
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

    const statusOptions = useMemo(() => {
        return [
            { name: "ที่ต้องชำระ", uid: "ToBePaid" },
            { name: "ที่ต้องจัดส่ง", uid: "ToBeDelivered" },
            { name: "ที่ต้องได้รับ", uid: "ToBeReceived" },
            { name: "ส่งสำเร็จ", uid: "SuccessfulDelivery" },
            // {name: "ยกเลิก", uid: "Canceled"},
            // {name: "คืนเงิน/คืนสินค้า", uid: "RefundAndReturn"},
        ]
    }, []);

    const filteredItems = React.useMemo(() => {
        let filteredOrderItems = [...orderItems];

        if (hasSearchFilter) {
            filteredOrderItems = filteredOrderItems.filter((order: any) =>
                order.orderitem.some((item: any) =>
                    item.product.product_name.toLowerCase().includes(filterValue.toLowerCase())
                )
            );
        }

        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredOrderItems = filteredOrderItems.filter((orderItems: any) =>
                Array.from(statusFilter).includes(orderItems.status),
            );
        }

        return filteredOrderItems;
    }, [orderItems, hasSearchFilter, statusFilter, statusOptions.length, filterValue]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {

        return [...items].sort((a: any, b: any) => {

            const first = sortDescriptor.column === "price"
                ? a.order_item_id : a[sortDescriptor.column as keyof OrderItems];

            const second = sortDescriptor.column === "price"
                ? b.order_item_id : b[sortDescriptor.column as keyof OrderItems];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

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

    // const handleImageSrc = (src: string, id: number) => {
    //     setImageSrc(src)
    //     setImageId(id)
    //     setModalScreenedImageOpen(true)
    // }

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

    const handleStatusChange = useCallback(async (status: string, order_item_id: number) => {
        try {
            console.log(status, order_item_id);

            await axios.put(`/api/order/status/${order_item_id}`, { status });
            fetchOrders();
        } catch (error) {
            console.error("Error changing status:", error);
        }
    }, [])

    const statusMap: Record<string, string> = React.useMemo(() => ({
        "ToBePaid": "ที่ต้องชำระ",
        "ToBeDelivered": "ที่ต้องจัดส่ง",
        "ToBeReceived": "ที่ต้องได้รับ",
        "SuccessfulDelivery": "ส่งสำเร็จ",
        // "Canceled": "ยกเลิก",
        // "RefundAndReturn": "คืนเงิน/คืนสินค้า",
    }), []);

    // ✦. ── ✦. ── ✦. พวก Modal .✦ ── .✦ ── .✦

    const { onOpenChange } = useDisclosure();
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

    const downloadImage = async (url: string) => {
        try {
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const blob = await response.blob();
            const link = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);
    
            link.href = objectUrl;
            link.download = url.substring(url.lastIndexOf('/') + 1); // ใช้ชื่อไฟล์จาก URL
            document.body.appendChild(link);
            link.click();
    
            // Cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    };
    


    const renderCell = React.useCallback((order: any, columnKey: React.Key) => {
        switch (columnKey) {
            case "user":
                return (
                    <User
                        avatarProps={{ radius: "full", size: "sm", src: order.user.image }}
                        classNames={{
                            description: "text-default-500 line-clamp-1 w-[100px]",
                        }}
                        description={order.user.email}
                        name={order.user.name}
                    >
                        {order.user.name}
                    </User>
                );

            case "product":
                return (
                    <Popover
                        showArrow
                        placement="bottom"
                        // as={ScrollShadow}
                        className="h-[300px] overflow-auto"
                    >
                        <PopoverTrigger className="cursor-pointer">
                            ดูสินค้า
                        </PopoverTrigger>
                        <PopoverContent className="p-1 border-1 border-default-200">
                            <Card className="max-w-full border-none dark:border-1 dark:border-default-200 bg-transparent" shadow="none">
                                <CardHeader>
                                    รายละเอียดสินค้าที่สั่งซื้อ
                                </CardHeader>
                                <CardBody className="px-3 py-0">
                                    {order.orderitem.map((item: any) => (
                                        <div key={item.order_item_id} className="p-2 border-b-1 border-default-200">
                                            <div className="flex flex-row gap-2">
                                                <div className="flex flex-col">
                                                    <p>สินค้า</p>
                                                    <NextImage
                                                        src={item.product.image}
                                                        
                                                        alt={`Product ${item.productId}`}
                                                        width={100}
                                                        height={100}
                                                        className="w-16 h-16" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <p>Product ID: {item.productId}</p>
                                                    <p>จำนวนสินค้า: {item.quantity}</p>
                                                    <p>ราคารวม: {item.total_price}</p>

                                                </div>
                                                <div>
                                                    <p>ภาพที่จะสกรีน</p>
                                                    <div className="flex flex-wrap gap-2 relative">
                                                        {
                                                            item.orderscreenedimages.length > 1 ? (
                                                                item.orderscreenedimages.map((image: any) => (
                                                                    <NextImage
                                                                        key={image.screened_image_id}
                                                                        src={image.screened_image_url}
                                                                        onClick={() => downloadImage(image.screened_image_url)}
                                                                        alt={`Screened Image ${image.screened_image_id}`}

                                                                        width={100}
                                                                        height={100}
                                                                        className="w-16 h-16 cursor-pointer"
                                                                    />
                                                                ))
                                                            ) : (
                                                                <p>ไม่ได้สกรีน</p>
                                                            )
                                                        }
                                                    </div>
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
                );

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
                        <DropdownMenu onAction={(key) => handleStatusChange(key as string, (order as any).order_id)}>
                            <DropdownItem key="ToBePaid">ที่ต้องชำระ</DropdownItem>
                            <DropdownItem key="ToBeDelivered">ที่ต้องจัดส่ง</DropdownItem>
                            <DropdownItem key="ToBeReceived">ที่ต้องได้รับ</DropdownItem>
                            <DropdownItem key="SuccessfulDelivery">ส่งสำเร็จ</DropdownItem>
                            {/* <DropdownItem key="Canceled">ยกเลิก</DropdownItem>
                            <DropdownItem key="RefundAndReturn">คืนเงิน/คืนสินค้า</DropdownItem> */}
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
                return <span>{order[columnKey as keyof OrderItems]?.toString() || "ไม่ระบุข้อมูล"}</span>;
        }
    }, [statusMap, handleStatusChange]);

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
                        placeholder="ค้นหาออเดอร์ที่สั่งซื้อ..."
                        size="sm"
                        startContent={<SearchIcon className="text-default-300" />}
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />


                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<ChevronDownIcon className="text-small" />}
                                    size="sm"
                                    variant="flat"
                                >
                                    สถานะ
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="single"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        {/* <Dropdown>
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
                        </Dropdown> */}
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
    }, [filterValue, onSearchChange, statusFilter, statusOptions, /* visibleColumns, */ orderItems.length, onRowsPerPageChange]);

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
    //         return new Set(orderItems.map((product: any) => String(product.order_item_id)));
    //     }
    //     return selectedKeys;
    // }, [selectedKeys, orderItems]);

    // const selectedIds = Array.from(normalizedSelectedKeys).map((id: any) => parseInt(id, 10));

    // const calculateTotalPrice = React.useCallback(() => {

    //     const selectedItems = orderItems.filter((product: any) =>
    //         selectedIds.includes(product.order_item_id)
    //     );

    //     const totalPrice = selectedItems.reduce(
    //         (sum, item: any) => sum + item.product.price * item.quantity,
    //         0
    //     );

    //     return totalPrice;
    // }, [orderItems, selectedIds]);

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
                <div></div>
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
    }, [selectedKeys, orderItems.length, hasSearchFilter, page, pages]);



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
                        {(item: any) => (
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