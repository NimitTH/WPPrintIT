"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "@/types/index"
import axios from "axios";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
    Popover, PopoverTrigger, PopoverContent,
    Card, CardHeader, CardBody, CardFooter,
    Avatar, AvatarGroup,
    SortDescriptor,
    useDisclosure,
    Pagination,
    Selection,
    ChipProps,
    Tabs, Tab,
    Button,
    Input,
    Image,
    Chip,
    User,
} from "@heroui/react";
import ListBox from "./ListBoxManage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { EditDocumentIcon, VerticalDotsIcon, SearchIcon, ChevronDownIcon, Cancel } from '@/components/Icon';

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "ชื่อผู้ใช้", uid: "user" },
    // { name: "จำนวนเงิน", uid: "money" },
    // { name: "Role", uid: "role" },
    { name: "สถานะ", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];
const INITIAL_VISIBLE_COLUMNS = ["id", "user", "product", "money", /* "role", */ "status", "actions"];

export default function ManageUsers() {
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

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        return filteredUsers;
    }, [users, hasSearchFilter, filterValue]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {

        return [...items].sort((a: Users, b: Users) => {

            const first = sortDescriptor.column === "price"
                ? a.order_item_id : a[sortDescriptor.column as keyof Users];

            const second = sortDescriptor.column === "price"
                ? b.order_item_id : b[sortDescriptor.column as keyof Users];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    // ✦. ── ✦. ── ✦. จัดการภาพ .✦ ── .✦ ── .✦

    const [imageSrc, setImageSrc] = useState<string | any>("");

    const handleImageChange = useCallback((id: number) => {
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

                        await axios.put(`/api/user/image/${id}`, { image: res.data.url });
                        fetchUsers();

                    } catch (error) {
                        console.error("Image upload failed:", error);
                    }
                }
            }
        };
        input.click();
    }, []);

    // ✦. ── ✦. ── ✦. ลบผู้ใช้ .✦ ── .✦ ── .✦

    const handleDeleteUser = useCallback(async (id: number, role: string) => {
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
    }, [])

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

    // ✦. ── ✦. ── ✦. เปลี่ยนบทบาท .✦ ── .✦ ── .✦

    // const roleMap: Record<string, string> = useMemo(() => ({
    //     "USER": "ผู้ใช้งาน",
    //     "ADMIN": "แอดมิน",
    // }), []);

    // const handleRoleChange = useCallback(async (key: string, id: number, role: string) => {
    //     try {
    //         if (key === "USER" && role === "ADMIN") {
    //             alert("แอดมินไม่สามารถเปลี่ยนสิทธิเป็นผู้ใช้งานได้");
    //             return;
    //         }
    //         await axios.put(`/api/user/role/${id}`, { role: key });
    //         fetchUsers();
    //     } catch (error) {
    //         console.error("Error changing role:", error);
    //     }
    // }, []);

    // ✦. ── ✦. ── ✦. เปลี่ยนสถานะ .✦ ── .✦ ── .✦

    const statusMap: Record<string, string> = useMemo(() => ({
        "approve": "อนุมัติ",
        "suspended": "ระงับการใช้งาน",
    }), []);

    const handleStatusChange = useCallback(async (status: string, id: number, role: string) => {
        if (status === "suspended" && role === "ADMIN") {
            alert("แอดมินไม่สามารถระงับการใช้งานได้");
            return;
        }
        try {
            await axios.put(`/api/user/status/${id}`, { status });
            fetchUsers();
        } catch (error) {
            console.error("Error changing status:", error);
        }
    }, []);

    // ✦. ── ✦. ── ✦. พวก Modal .✦ ── .✦ ── .✦

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    const [userId, setUserId] = useState<number>(0);

    const handleEditUser = useCallback(async (id: number, username: string, name: string, tel: string, email: string, address: string, image: string) => {
        setModalEditUserOpen(true);
        setUserId(id);
        setValue("id", id);
        setValue("username", username);
        setValue("name", name);
        setValue("tel", tel);
        setValue("email", email);
        setValue("address", address);
        setImageSrc(image);
    }, [setValue])

    const onSubmit: SubmitHandler<Schema> = useCallback(async (data: Schema) => {
        try {
            console.log(data);
            await axios.put("/api/user", { ...data });
            fetchUsers();
            setModalEditUserOpen(false);
            alert("แก้ไขข้อมูลผู้ใช้งานเรียบร้อย");
        } catch (error) {
            console.error(error);
        }
    }, []);

    const { onOpenChange } = useDisclosure();
    const [isModalEditUserOpen, setModalEditUserOpen] = useState(false);

    const closeModal = useCallback(() => {
        setModalEditUserOpen(false);
    }, []);

    const renderModal = useCallback(() => {
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

    const renderCell = useCallback((user: Users, columnKey: React.Key) => {
        switch (columnKey) {
            case "user":
                return (
                    <User
                        avatarProps={{ radius: "full", size: "sm", src: user.image }}
                        classNames={{
                            description: "text-default-500 line-clamp-1 w-[100px]"
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

            // case "role":
            //     return (
            //         <Dropdown
            //             className="border-1 border-default-200"
            //             classNames={{
            //                 trigger: "border-none",
            //             }}
            //         >
            //             <DropdownTrigger>
            //                 {roleMap[user.role]}
            //             </DropdownTrigger>
            //             <DropdownMenu onAction={(key) => handleRoleChange(key as string, (user as any).id, user.role)}>
            //                 <DropdownItem key="USER">ผู้ใช้งาน</DropdownItem>
            //                 <DropdownItem key="ADMIN">แอดมิน</DropdownItem>

            //             </DropdownMenu>
            //         </Dropdown>
            //     );

            case "status":
                return (
                    <Dropdown
                        className="border-1 border-default-200"
                        classNames={{
                            trigger: "border-none",
                        }}
                    >
                        <DropdownTrigger>{statusMap[user.status]}</DropdownTrigger>
                        <DropdownMenu onAction={(key) => handleStatusChange(key as string, (user as any).id, user.role)}>
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
                return <span>{user[columnKey as keyof Users]?.toString() || "ไม่ระบุข้อมูล"}</span>;
        }
    }, [/*roleMap*/, statusMap, /*handleRoleChange,*/ handleStatusChange, handleEditUser, handleDeleteUser]);

    const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = useMemo(() => {
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
    }, [filterValue, /* visibleColumns, */ onSearchChange, onRowsPerPageChange, users.length]);

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

    // const normalizedSelectedKeys = useMemo(() => {
    //     if (selectedKeys === "all") {
    //         return new Set(users.map((user) => String(user.order_item_id)));
    //     }
    //     return selectedKeys;
    // }, [selectedKeys, users]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex max-sm:flex-col justify-between items-center">
                <div className="max-sm:mb-2">
                    <span className="mr-2 text-small text-default-400">
                        เลือก ({selectedKeys === "all" ? users.length : selectedKeys.size} ผู้ใช้งาน)
                    </span>
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

    // const deleteUser = async (id: number) => {
    //     console.log("deleteUser");
    // }

    const classNames = useMemo(
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
        }), []
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