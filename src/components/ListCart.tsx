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
    Avatar, AvatarGroup,
    SortDescriptor,
    useDisclosure,
    Pagination,
    Selection,
    Button,
    Image,
    Input,
    User,
} from "@heroui/react"
import { PlusIcon, VerticalDotsIcon, SearchIcon, ChevronDownIcon, Cancel } from "@/components/Icon"

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
    { name: "ID", uid: "cart_item_id", sortable: true },
    { name: "สินค้า", uid: "product", },
    { name: "ภาพที่สกรีน", uid: "screenedimages", },
    { name: "อยากได้เพิ่มเติม", uid: "additional" },
    { name: "ราคาต่อชิ้น", uid: "price", sortable: true },
    { name: "จำนวน", uid: "quantity", sortable: true },
    { name: "ราคารวม", uid: "total_price", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["product", "screenedimages", "additional", "price", "quantity", "total_price", "actions"];

export default function CartProductList() {
    const { data: session } = useSession();
    const [cartProducts, setCartProducts] = useState<CartProducts[]>([]);

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );

    const normalizedSelectedKeys = React.useMemo(() => {
        if (selectedKeys === "all") {
            // สร้าง Set<string> ที่มี cart_item_id ของสินค้าทั้งหมด
            return new Set(cartProducts.map((product) => String(product.cart_item_id)));
        }
        return selectedKeys;
    }, [selectedKeys, cartProducts]);
    const selectedIds = Array.from(normalizedSelectedKeys).map((id: any) => parseInt(id, 10));

    // type CartProducts = (typeof cartProducts);

    type CartProducts = {
        cart_item_id: number;
        screened_image: string;
        screenedimages: {
            screened_image_id: number;
            screened_image_url: string;
        }[];
        additional: string;
        quantity: number;
        total_price: number;
        product: {
            product_id: number;
            product_name: string;
            price: number;
            image: string;
            description: string;
        };
    };



    const fetchCartProducts = useCallback( async () => {
        try {
            if (!session) return; // หยุดถ้า session ยังไม่มีค่า
            const res = await axios.get('/api/cart', { headers: { userId: session?.user.id } });
            const data: CartProducts[] = res.data;
            setCartProducts(data)
        } catch (error) {
            console.error("An error occurred while fetching products", error);
        }
    }, [session])

    console.log(cartProducts);
    

    const [openPopovers, setOpenPopovers] = useState<Record<number, boolean>>({});

    useEffect(() => {
        fetchCartProducts();
        if (session) {
            fetchCartProducts();
        }
    }, [session, openPopovers, fetchCartProducts])

    
    // const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "cart_item_id",
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
    }, [cartProducts, filterValue, hasSearchFilter]);

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

    const updateQuantity = useCallback(async (cartItemId: number, newQuantity: number, price: number) => {
        if (newQuantity < 1) return;
        try {
            const total_price = newQuantity * price;

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
    }, [fetchCartProducts]);

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

    const handleDownloadReceipt =  useCallback(async () => {
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
                    user: {
                        name: session?.user?.name,
                        email: session?.user?.email,
                        phone: session?.user?.tel,
                        address: session?.user?.address
                    },
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
    }, [session?.user?.address, session?.user?.email, session?.user?.id, session?.user.tel, session?.user?.name]);

    const handleSubmit = useCallback( async () => {

        try {

            if (session?.user.address === "" || session?.user.address === null) {
                alert("กรุณาใส่ที่อยู่ของคุณก่อน")
                return;
            }

            if (session?.user.tel === "" || session?.user.tel === null) {
                alert("กรุณาใส่เบอร์ของคุณก่อน")
                return;
            }

            const res = await axios.post("/api/order", { userId: session?.user?.id, selectedItems: selectedIds });
            console.log("Order created:", res.data);
            // alert("Order created successfully!");
            setModalReceiptOpen(true);

            fetchCartProducts(); // รีเฟรชหน้า Cart
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to create order");
        }
    }, [fetchCartProducts, selectedIds, session?.user.address, session?.user?.id, session?.user.tel])

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
    //                     fetchCartProducts();

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
    //         fetchCartProducts();
    //     } catch (error) {
    //         console.error("Error deleting image:", error);
    //     }
    // };

    // ✦. ── ✦. ── ✦. พวก Modal .✦ ── .✦ ── .✦

    const { onOpenChange } = useDisclosure();
    const [isModalScreenedImageOpen, setModalScreenedImageOpen] = useState(false);
    const [isModalReceiptOpen, setModalReceiptOpen] = useState(false);

    const closeModal = React.useCallback(() => {
        setModalScreenedImageOpen(false)
        setModalReceiptOpen(false)
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
                            ภาพที่สกรีน
                        </ModalHeader>
                        <ModalBody className="w-2xl h-2xl mx-auto">
                            <Image
                                isBlurred
                                src={imageSrc || "cart/images/LINE_ALBUM_1122022_240625_2.jpg"}
                                alt="Product Image"
                            />
                        </ModalBody>
                        <ModalFooter>
                            {/* <Button
                                onPress={handleImageChange}
                                radius="sm"
                                variant="flat"
                                startContent={<PlusIcon />}
                            >
                                เพิ่มภาพ
                            </Button> */}
                            {/* <Button
                                // fullWidth
                                radius="sm"
                                color="danger"
                                onPress={handleImageDelete}
                            // onPress={() => setModalScreenedImageOpen(false)}
                            >
                                ลบภาพ
                            </Button> */}
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
                            <div className="flex justify-center items-center">
                                <Image className="w-full h-full mx-auto" src="https://media.tenor.com/bi6I4XsPH3sAAAAi/kitty-fancy.gif" alt="receipt" />
                            </div>
                            <span>
                                ดาวน์โหลดใบเสร็จหรือไม่
                            </span>
                            <Button onPress={handleDownloadReceipt} className="text-white" variant="shadow" color="success">
                                ดาวน์โหลดใบเสร็จ
                            </Button>
                        </ModalBody>
                        <ModalFooter>
                            {/* <Button onPress={closeModal} color="danger" radius="sm">ปิด</Button> */}
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }, [isModalScreenedImageOpen, onOpenChange, closeModal, imageSrc, /* handleImageChange, handleImageDelete, */ isModalReceiptOpen, handleDownloadReceipt])

    console.log(cartProducts);
    
    const renderCell = React.useCallback((cartProduct: CartProducts, columnKey: React.Key) => {
        console.log(cartProduct);
        switch (columnKey) {
            case "product":
                return (
                    <User
                        as={Link}
                        href={`/product/${cartProduct.product.product_id}`}
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

            case "screenedimages":
                if (!cartProduct.screenedimages || cartProduct.screenedimages.length === 0) {
                    return <span>ไม่สกรีนภาพ</span>;
                }

                return (

                    <Popover
                        isOpen={!!openPopovers[cartProduct.product.product_id]}
                        onOpenChange={(open) =>
                            setOpenPopovers((prev) => ({
                                ...prev,
                                [cartProduct.product.product_id]: open,
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
                                total={cartProduct.screenedimages.length}
                            >
                                {cartProduct.screenedimages.map((image: any) => (
                                    <Avatar
                                        key={image.screened_image_id}
                                        src={image.screened_image_url}
                                    />
                                ))}
                            </AvatarGroup>
                        </PopoverTrigger>
                        <PopoverContent>
                            <AvatarGroup isGrid max={99}>
                                {cartProduct.screenedimages.map((image: any) => (
                                    <Avatar
                                        key={image.screened_image_id}
                                        alt={`Image ${image.screened_image_id}`}
                                        onClick={() => {
                                            handleImageSrc(image.screened_image_url, image.screened_image_id)
                                            setOpenPopovers((prev) => ({
                                                ...prev,
                                                [cartProduct.product.product_id]: false,
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
                return <span>{cartProduct.additional === "" || cartProduct.additional === null ? "ไม่มีเพิ่มเติม" : cartProduct.additional}</span>

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
                return <span>{cartProduct[columnKey as keyof CartProducts]?.toString() || "ไม่ระบุข้อมูล"}</span>;
        }
    }, [updateQuantity, openPopovers, handleImageSrc]);

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
    }, [filterValue, /* visibleColumns, */ onSearchChange, onRowsPerPageChange, cartProducts.length]);

    

    const handleDeleteSelected = useCallback( async () => {
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
    }, [normalizedSelectedKeys])

    

    

    const calculateTotalPrice = React.useCallback(() => {

        const selectedItems = cartProducts.filter((product) =>
            selectedIds.includes(product.cart_item_id)
        );

        const totalPrice = selectedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );

        return totalPrice;
    }, [cartProducts, selectedIds]);

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
    }, [calculateTotalPrice, selectedKeys, cartProducts.length, hasSearchFilter, page, pages, handleDeleteSelected, handleSubmit]);



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
            {/* <Button onPress={handleDownloadReceipt} className="text-white" variant="shadow" color="success">
                ดาวน์โหลดใบเสร็จ
            </Button> */}
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

