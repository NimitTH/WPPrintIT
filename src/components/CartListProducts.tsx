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
    button,
} from "@nextui-org/react";

import Link from "next/link";
import { useSession } from "next-auth/react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

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
    { name: "ID", uid: "cart_item_id", sortable: true },
    { name: "สินค้า", uid: "product", },
    { name: "ภาพสกรีน", uid: "screened_image", },
    { name: "ราคาต่อชิ้น", uid: "price", sortable: true },
    { name: "จำนวน", uid: "quantity", sortable: true },
    { name: "ราคารวม", uid: "total_price", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["product", "screened_image", "price", "quantity", "total_price", "actions"];

export default function CartProductList() {
    const { data: session } = useSession();
    const [cartProducts, setCartProducts] = useState<any[]>([]);

    type CartProducts = (typeof cartProducts)[0];

    const fetchCartProducts = async () => {
        try {
            if (!session) return; // หยุดถ้า session ยังไม่มีค่า
            const res = await axios.get('/api/cart', { headers: { userId: session?.user.id } });
            setCartProducts(res.data)
        } catch (error) {
            console.error("An error occurred while fetching products", error);
        }
    }

    useEffect(() => {
        fetchCartProducts();
        if (session) {
            fetchCartProducts();
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
        column: "price",
        direction: "ascending",
    });

    const [page, setPage] = useState(1);

    const pages = Math.ceil(cartProducts.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredCartProducts = [...cartProducts];

        if (hasSearchFilter) {
            filteredCartProducts = filteredCartProducts.filter((products) =>
                products.product.product_name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        return filteredCartProducts;
    }, [cartProducts, filterValue, statusFilter]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {

        return [...items].sort((a: CartProducts, b: CartProducts) => {

            const first = sortDescriptor.column === "price"
                ? a.product.price : a[sortDescriptor.column as keyof CartProducts];

            const second = sortDescriptor.column === "price"
                ? b.product.price : b[sortDescriptor.column as keyof CartProducts];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);



    // ✦. ── ✦. ── ✦. อัพเดทค่าจำนวน .✦ ── .✦ ── .✦

    const updateQuantity = async (cartItemId: number, newQuantity: number, price: number) => {
        if (newQuantity < 1) return;
        try {
            let total_price = newQuantity * price;

            await axios.put(`/api/cart/${cartItemId}`, { quantity: newQuantity, total_price: total_price });
            setCartProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.cart_item_id === cartItemId
                        ? { ...product, quantity: newQuantity, total_price: total_price }
                        : product
                )
            );
        } catch (error) {
            console.error("Error updating quantity:", error);
        }

        fetchCartProducts();
    };

    // ✦. ── ✦. ── ✦. ลบสินค้าออกจากรถเข็น .✦ ── .✦ ── .✦

    const deleteCartItem = async (cartItemId: number) => {
        try {
            console.log("cartItemId", cartItemId);

            await axios.delete(`/api/cart/${cartItemId}`);
            setCartProducts((prevProducts) =>
                prevProducts.filter((product) => product.cart_item_id !== cartItemId)
            );
        } catch (error) {
            console.error("Error deleting cart item:", error);
        }
    }

    // ✦. ── ✦. ── ✦. จัดการสั่งซื้อ .✦ ── .✦ ── .✦

    const handleDownloadReceipt = async () => {
        try {
            const res = await axios.get("/api/order/latest", { params: { userId: session?.user?.id } });
            const { order } = res.data;

            const response = await fetch('/api/order/receipt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: order.order_id,
                    items: order.orderitem.map((item: any) => ({
                        productName: item.product.product_name,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    total: order.total_amount,
                    user: { name: session?.user?.name, email: session?.user?.email },
                }),
            });

            if (!response.ok) throw new Error('Failed to generate receipt');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `receipt-${order.order_id}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading receipt:', error);
        }
    };


    const handleSubmit = async () => {
        try {
            console.log(selectedIds);

            const res = await axios.post("/api/order", { userId: session?.user?.id, selectedItems: selectedIds });
            console.log("Order created:", res.data);
            // alert("Order created successfully!");
            setModalReceiptOpen(true);

            fetchCartProducts(); // รีเฟรชหน้า Cart
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
                        fetchCartProducts();

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
            fetchCartProducts();
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    // ✦. ── ✦. ── ✦. พวก Modal .✦ ── .✦ ── .✦

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isModalScreenedImageOpen, setModalScreenedImageOpen] = useState(false);
    const [isModalReceiptOpen, setModalReceiptOpen] = useState(false);

    const closeModal = React.useCallback(() => {
        setModalScreenedImageOpen(false)
    }, []);

    const renderModal = React.useCallback(() => {
        return (
            <>
                <Modal
                    backdrop="opaque"
                    placement="center"
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
                        <ModalFooter>
                            <Button
                                onPress={handleImageChange}
                                radius="sm"
                                variant="flat"
                                startContent={<PlusIcon />}
                            >
                                เพิ่มภาพ
                            </Button>
                            <Button
                                // fullWidth
                                radius="sm"
                                color="danger"
                                onPress={handleImageDelete}
                            // onPress={() => setModalScreenedImageOpen(false)}
                            >
                                ลบภาพ
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Modal

                    backdrop="opaque"
                    placement="center"
                    classNames={{
                        base: "border-1 border-default-200",
                    }}
                    isOpen={isModalReceiptOpen}
                    onOpenChange={onOpenChange}
                    onClose={closeModal}
                >
                    <ModalContent>
                        <ModalHeader>สั่งซื้อสินค้าสำเร็จ</ModalHeader>
                        <ModalBody>
                            ดาวน์โหลดใบเสร็จหรือไม่
                            <Button onPress={handleDownloadReceipt} className="text-background" color="success">
                                ดาวน์โหลดใบเสร็จ
                            </Button>
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={closeModal} color="danger" radius="sm">ปิด</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }, [isModalScreenedImageOpen, imageSrc, isModalReceiptOpen]);


    const renderCell = React.useCallback((cartProduct: CartProducts, columnKey: React.Key) => {
        const cellValue = cartProduct[columnKey as keyof CartProducts];

        switch (columnKey) {
            case "product":
                return (
                    <User
                        as={Link}
                        href={`/products/${cartProduct.product.product_id}`}
                        avatarProps={{ radius: "full", size: "sm", src: cartProduct.product.image }}
                        classNames={{
                            description: "text-default-500 line-clamp-1 w-[100px]",
                        }}
                        description={cartProduct.product.description}
                        name={cartProduct.product.product_name}
                    >
                        {cartProduct.product.product_name}
                    </User>
                );

            case "screened_image":
                return (
                    <div className="flex">
                        <div
                            onClick={() => handleImageSrc(cartProduct.screened_image, cartProduct.cart_item_id)}
                            className="cursor-pointer"
                        >
                            {cartProduct.screened_image ? (
                                <Image
                                    alt={cartProduct.product.product_name}
                                    classNames={{
                                        wrapper: "w-10 h-10",
                                        img: "object-cover w-full h-full",
                                    }}
                                    radius="full"
                                    src={cartProduct.screened_image}
                                />
                            ) : (
                                <div className="relative w-10 h-10 rounded-full bg-foreground ">
                                    <p className="absolute inset-0 flex items-center justify-center text-background"><span>+</span></p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case "price":
                const formattedPrice = new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                }).format(cartProduct.product.price);
                return <span>{formattedPrice}</span>;

            case "quantity":
                return (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => updateQuantity(cartProduct.cart_item_id, cartProduct.quantity - 1, cartProduct.product.price)}
                        >
                            -
                        </button>
                        <span>{new Intl.NumberFormat("th-TH").format(cartProduct.quantity)}</span>
                        <button
                            onClick={() =>
                                updateQuantity(cartProduct.cart_item_id, cartProduct.quantity + 1, cartProduct.product.price)
                            }
                        >
                            +
                        </button>
                    </div>
                );

            case "total_price":
                // const totalPrice = cartProduct.quantity * cartProduct.product.price;
                const formattedTotalPrice = new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                }).format(cartProduct.total_price);
                return <span>{formattedTotalPrice}</span>;

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
                                    onPress={() => deleteCartItem(cartProduct.cart_item_id)}
                                    startContent={<Cancel size={16} />}
                                >
                                    ลบ
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
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
                    <span className="text-default-400 text-small">มีสินค้าทั้งหมด {cartProducts.length} รายการ</span>
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
        cartProducts.length,
        hasSearchFilter,
    ]);

    const handleDeleteSelected = async () => {
        try {
            const selectedIds = Array.from(normalizedSelectedKeys).map((id: any) => parseInt(id, 10));

            await Promise.all(
                selectedIds.map((id) => axios.delete(`/api/cart/${id}`))
            );

            setCartProducts((prevProducts) =>
                prevProducts.filter((product) => !selectedIds.includes(product.cart_item_id))
            );

            setSelectedKeys(new Set([]));
        } catch (error) {
            console.error("Error deleting selected items:", error);
        }
    }

    const normalizedSelectedKeys = React.useMemo(() => {
        if (selectedKeys === "all") {
            // สร้าง Set<string> ที่มี cart_item_id ของสินค้าทั้งหมด
            return new Set(cartProducts.map((product) => String(product.cart_item_id)));
        }
        return selectedKeys;
    }, [selectedKeys, cartProducts]);

    const selectedIds = Array.from(normalizedSelectedKeys).map((id: any) => parseInt(id, 10));

    const calculateTotalPrice = React.useCallback(() => {

        const selectedItems = cartProducts.filter((product) =>
            selectedIds.includes(product.cart_item_id)
        );

        const totalPrice = selectedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );

        return totalPrice;
    }, [cartProducts, selectedKeys]);

    const bottomContent = React.useMemo(() => {
        const totalPrice = calculateTotalPrice();

        return (
            <div className="py-2 px-2 flex max-sm:flex-col justify-between items-center">
                <div className="max-sm:mb-2">
                    <span className="mr-2 text-small text-default-400">เลือก ({selectedKeys === "all" ? cartProducts.length : selectedKeys.size} สินค้า) </span>
                    <Button
                        size="sm"
                        variant="flat"
                        onPress={() => handleDeleteSelected()}
                        startContent={<Cancel size={16} />}
                    >
                        ยกเลิกสินค้า
                    </Button>
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
                        {selectedKeys === "all"
                            ? <span> รวม ({cartProducts.length} สินค้า) : <span className="text-small font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500">฿ {new Intl.NumberFormat(
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
                </div>
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

            <Table
                isCompact
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                className="max-w-screen-xl mx-auto mt-5"
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
                <TableBody emptyContent={"ไม่มีสินค้าในรถเข็น"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.cart_item_id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

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

