"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import React from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
    Alert,
    Button, ButtonGroup,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
    Input,
    Pagination,
    type Selection,
    SortDescriptor,
    Select, SelectItem,
    Avatar,
    Chip
} from "@nextui-org/react";

import { Icon } from "@iconify/react";
import { PlusIcon, VerticalDotsIcon, SearchIcon1, ChevronDownIcon, EditIcon, DeleteIcon, DeleteIcon1 } from "@/components/Icon";
import ListBox from "@/components/ListBox";
import { log } from "console";

type Props = {}

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
    { name: "ID", uid: "product_id", sortable: true },
    { name: "รูป", uid: "image" },
    { name: "ชื่อ", uid: "product_name", sortable: true },
    { name: "รายละเอียด", uid: "description" },
    { name: "หมวดหมู่", uid: "category" },
    // { name: "ขนาด", uid: "size", sortable: true },
    { name: "ราคา", uid: "price", sortable: true },
    { name: "จำนวนสินค้า", uid: "stock", sortable: true },
    { name: "actions", uid: "actions" },
];
const INITIAL_VISIBLE_COLUMNS = ["product_id", "image", "product_name", "price", "category", "stock", "actions"];

const schemaCategory = z.object({
    name: z.string({
        required_error: "ใส่ชื่อหมวดหมู่ดิ",
    })
        .min(1, "ชื่อหมวดหมู่ต้องมากกว่า 1 อักษร")
        .max(20, "หมวดหมู่อะไรยาวขนาดนั้น")
});

const schemaSize = z.object({
    name: z.string({
        required_error: "ใส่ชื่อหมวดหมู่ดิ",
    })
        .min(1, "ชื่อหมวดหมู่ต้องมากกว่า 1 อักษร")
        .max(20, "หมวดหมู่อะไรยาวขนาดนั้น")
});

const schemaColor = z.object({
    name: z.string({
        required_error: "ใส่ชื่อหมวดหมู่ดิ",
    })
        .min(1, "ชื่อหมวดหมู่ต้องมากกว่า 1 อักษร")
        .max(20, "หมวดหมู่อะไรยาวขนาดนั้น")
});

const schemaProduct = z.object({
    product_name: z.string()
        .max(100, "ชื่อสินค้าต้องไม่เกิน 100 ตัวอักษร"),
    description: z.string()
        .max(100, "คำอธิบายต้องไม่เกิน 100 ตัวอักษร"),
    categories: z.string().array(),
    price: z.number()
        .min(1, "ตั้งราคาต่ำเกิน"),
    stock: z.number()
});
type SchemaProduct = z.infer<typeof schemaProduct>;


type SchemaCategory = z.infer<typeof schemaCategory>;
type SchemaSize = z.infer<typeof schemaSize>;
type SchemaColor = z.infer<typeof schemaColor>;

export default function TableProduct({ }: Props) {
    const [products, setProduct] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    type Product = (typeof products)[0]

    useEffect(() => {

        fetchProduct();
        fetchCategories();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await axios.get("/api/products");
            setProduct(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get("/api/products/categories");
            setCategories(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const [description, setDescription] = useState("")
    const [isVisible, setIsVisible] = useState(false);

    const {
        control: controlCategory,
        handleSubmit: handleSubmitCategory,
        reset: resetCategory,
        formState: { errors: errorsCategory, isSubmitting: isSubmittingCategory },
    } = useForm<SchemaCategory>({
        resolver: zodResolver(schemaCategory),
    });

    const {
        control: controlSize,
        handleSubmit: handleSubmitSize,
        reset: resetSize,
        formState: { errors: errorsSize, isSubmitting: isSubmittingSize },
    } = useForm<SchemaSize>({
        resolver: zodResolver(schemaSize),
    });

    const {
        control: controlColor,
        handleSubmit: handleSubmitColor,
        reset: resetColor,
        formState: { errors: errorsColor, isSubmitting: isSubmittingColor },
    } = useForm<SchemaColor>({
        resolver: zodResolver(schemaColor),
    });

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const closeModal = () => {
        setProfileImage(null);
        setModalEditProductOpen(false);
        setModalDeleteProductOpen(false)

        setModalAddProductOpen(false);
        setModalAddCategoryOpen(false);
        setModalAddSizeOpen(false);
        setModalAddColorOpen(false);
    };

    // ꧁𓊈𒆜 ──────────────────────────────────── เพิ่มสินค้า ──────────────────────────────────── 𒆜𓊉꧂

    const {
        control: controlProduct,
        handleSubmit: handleSubmitProduct,
        reset: resetProduct,
        formState: { errors: errorsProduct, isSubmitting: isSubmittingProduct },
    } = useForm<SchemaProduct>({
        resolver: zodResolver(schemaProduct),
    });

    const onProductSubmit: SubmitHandler<SchemaProduct> = async (product: SchemaProduct) => {
        try {
            console.log(product);

            await axios.post("/api/products", { ...product, image: profileImage });
            resetProduct()
            await fetchProduct()
            closeModal()
            // setIsVisible(true) // แสดง alert
            // setDescription("เพิ่มสินค้าสำเร็จ " + product.product_name + " สำเร็จ")
            // setTimeout(() => {
            //     setIsVisible(false)
            // }, 5000)
        } catch (error) {
            console.error(error);
        }
    };

    const onCategorySubmit: SubmitHandler<SchemaCategory> = async (data: SchemaCategory) => {
        try {
            console.log(data.name);
            await axios.post("/api/products/categories", { ...data });
            closeModal()
            await fetchCategories();
            resetCategory()
            setIsVisible(true) // แสดง alert
            // setDescription("เพิ่มสินค้าสำเร็จ " + data.name + " สำเร็จ")
            setTimeout(() => {
                setIsVisible(false)
            }, 5000)
        } catch (error) {
            console.error(error);
        }
    };

    const onSizeSubmit: SubmitHandler<SchemaSize> = async (size: SchemaSize) => {
        try {
            await axios.post("/api/products/sizes", { ...size });
            resetSize()
            closeModal()
            setIsVisible(true) // แสดง alert
            // setDescription("เพิ่มสินค้าสำเร็จ " + size.name + " สำเร็จ")
            setTimeout(() => {
                setIsVisible(false)
            }, 5000)
        } catch (error) {
            console.error(error);
        }
    };

    const onColorSubmit: SubmitHandler<SchemaColor> = async (color: SchemaColor) => {
        try {
            await axios.post("/api/products/colors", { ...color });
            resetColor()
            closeModal()
            setIsVisible(true) // แสดง alert
            // setDescription("เพิ่มสินค้าสำเร็จ " + color.name + " สำเร็จ")
            setTimeout(() => {
                setIsVisible(false)
            }, 5000)
        } catch (error) {
            console.error(error);
        }
    };

    // ꧁𓊈𒆜 ──────────────────────────────────── แก้ไข้สินค้า ──────────────────────────────────── 𒆜𓊉꧂

    const {
        control: controlEditProduct,
        handleSubmit: handleSubmitEditProduct,
        setValue: setValueEditProduct,
        formState: { errors: errorsEditProduct, isSubmitting: isSubmittingEditProduct },
    } = useForm<SchemaProduct>({
        resolver: zodResolver(schemaProduct),
    });

    const onEditProductSubmit: SubmitHandler<SchemaProduct> = async (product: SchemaProduct) => {
        console.log(product);

        try {
            console.log(product.categories);
            await axios.put("/api/products", { ...product, image: profileImage, product_id: productEditId });
            await fetchProduct()
            closeModal()
        } catch (error) {
            console.error(error);
        }
    };

    const [isModalEditProductOpen, setModalEditProductOpen] = useState(false);
    const [values, setValues] = useState<Selection>(new Set([]));
    const [productEditId, setProductEditId] = useState(null)

    const handleEditProduct = (product: Product) => {
        setModalEditProductOpen(true);

        setProductEditId(product.product_id)
        setValueEditProduct("product_name", product.product_name);
        setValueEditProduct("description", product.description);

        const categoryNames = product.category.map((category: any) => category.name);
        // console.log("Categories to set:", categoryNames);
        setValues(new Set(categoryNames));
        setValueEditProduct("categories", categoryNames);

        setValueEditProduct("price", product.price);
        setValueEditProduct("stock", product.stock);
        setProfileImage(product.image);
    };

    const ModalEditProduct = useMemo(() => {
        return (
            <Modal
                isKeyboardDismissDisabled={true}
                isOpen={isModalEditProductOpen}
                onOpenChange={onOpenChange}
                onClose={closeModal}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">แก้ไข้สินค้า</ModalHeader>
                            <form onSubmit={handleSubmitEditProduct(onEditProductSubmit)} >
                                <ModalBody className="flex flex-col gap-3">

                                    <div className="flex flex-col items-center gap-4">
                                        <div className="relative group w-40 h-40">
                                            <Avatar

                                                size="lg"
                                                src={profileImage || ""}
                                                alt="Profile Picture"
                                                className="border w-full h-full text-large"
                                            />
                                            <div
                                                className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                onClick={handleImageChange}
                                            >
                                                <Icon icon="mingcute:pencil-fill" width="24" height="24" className="text-xl text-white"></Icon>
                                            </div>
                                        </div>
                                    </div>

                                    <Controller
                                        name="product_name"
                                        control={controlEditProduct}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="ชื่อสินค้า"
                                                labelPlacement="outside"
                                                placeholder="ตั้งชื่อสินค้าของคุณ"
                                                isInvalid={!!errorsEditProduct.product_name}
                                                errorMessage={errorsEditProduct.product_name?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="description"
                                        control={controlEditProduct}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="รายละเอียดสินค้า"
                                                labelPlacement="outside"
                                                placeholder="ตั้งรายละเอียดสินค้าของคุณ"
                                                isInvalid={!!errorsEditProduct.description}
                                                errorMessage={errorsEditProduct.description?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="categories"
                                        control={controlEditProduct}
                                        render={({ field }) => (
                                            <Select
                                                label="หมวดหมู่สินค้า"
                                                fullWidth
                                                labelPlacement="outside"
                                                placeholder="เลือกหมวดหมู่สินค้าของคุณ"
                                                selectionMode="multiple"
                                                selectedKeys={values}
                                                onSelectionChange={(keys) => {
                                                    console.log("Selected keys:", Array.from(keys));
                                                    setValues(new Set(keys));
                                                    field.onChange(Array.from(keys) as string[]);
                                                }}
                                            >
                                                {categories.map((category) => (
                                                    <SelectItem key={category.name} value={category.name}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                    <Controller
                                        name="price"
                                        control={controlEditProduct}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="number"
                                                label="ราคา"
                                                labelPlacement="outside"
                                                placeholder="ตั้งราคาของคุณ"
                                                isInvalid={!!errorsEditProduct.price}
                                                errorMessage={errorsEditProduct.price?.message}
                                                value={field.value !== undefined ? String(field.value) : ""}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="stock"
                                        control={controlEditProduct}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="number"
                                                label="จำนวนสินค้า (Stock)"
                                                labelPlacement="outside"
                                                placeholder="ตั้งจำนวนสินค้าของคุณ"
                                                isInvalid={!!errorsEditProduct.stock}
                                                errorMessage={errorsEditProduct.stock?.message}
                                                value={field.value !== undefined ? String(field.value) : ""}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        )}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        ปิด
                                    </Button>
                                    <Button disabled={isSubmittingEditProduct} color="primary" type="submit">
                                        เพิ่มสินค้า
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>

        )
    }, [
        isModalEditProductOpen, onOpenChange, closeModal, isSubmittingEditProduct, controlEditProduct, errorsEditProduct,
        categories, values
    ]);

    // ꧁𓊈𒆜 ──────────────────────────────────── ลบสินค้า ──────────────────────────────────── 𒆜𓊉꧂

    const onDeleteProduct = async () => {
        try {
            if (!productDeleteId) throw new Error("Product ID is not set");
            await axios.delete(`/api/products/${productDeleteId}`);
            await fetchProduct();
            closeModal();
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    const [isModalDeleteProductOpen, setModalDeleteProductOpen] = useState(false);
    const [productDeleteId, setProductDeleteId] = useState(null)
    const handleDeleteProduct = (product: any) => {
        if (!product?.product_id) {
            console.error("Product ID is missing");
            return;
        }
        setProductDeleteId(product.product_id);
        setModalDeleteProductOpen(true);
    };

    const ModalDeleteProduct = useMemo(() => {
        return (
            <>
                <Modal
                    isKeyboardDismissDisabled={true}
                    isOpen={isModalDeleteProductOpen}
                    onOpenChange={onOpenChange}
                    onClose={closeModal}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">ยืนยันลบสินค้า</ModalHeader>
                                <ModalBody className="flex flex-row gap-3">
                                    <p>
                                        คุณต้องการลบสินค้าชิ้นนี้
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        ยกเลิก
                                    </Button>
                                    <Button
                                        onPress={onDeleteProduct}
                                        isDisabled={!productDeleteId}
                                        color="primary" type="submit"
                                    >
                                        ลบ
                                    </Button>
                                </ModalFooter>

                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>

        )
    }, [isModalDeleteProductOpen, onOpenChange, closeModal, onDeleteProduct, productDeleteId])

    // ꧁𓊈𒆜 ──────────────────────────────────── จัดการภาพ ──────────────────────────────────── 𒆜𓊉꧂

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const handleImageChange = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];
                // console.log("Selected file:", file);

                if (file) {
                    const formData = new FormData();
                    formData.append("image", file);

                    try {
                        const res = await axios.post("/api/products/upload", formData);
                        console.log(res);

                        if (res.data.success) {
                            setProfileImage(res.data.url);
                        }
                    } catch (error) {
                        console.error("Image upload failed:", error);
                    }
                }
            }
        };
        input.click();
    }

    // ꧁𓊈𒆜 อื่นๆ 𒆜𓊉꧂

    const [page, setPage] = useState(1);

    const [filterValue, setFilterValue] = useState("");
    const hasSearchFilter = Boolean(filterValue);

    const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const filteredItems = useMemo(() => {
        let filteredProducts = [...products];

        if (hasSearchFilter) {
            filteredProducts = filteredProducts.filter((product) =>
                product.product_name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredProducts;
    }, [products, filterValue, statusFilter]);

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "product_id",
        direction: "ascending",
    });
    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Product, b: Product) => {
            const first = a[sortDescriptor.column as keyof Product] as number;
            const second = b[sortDescriptor.column as keyof Product] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = useCallback((product: Product, columnKey: React.Key) => {
        const cellValue = product[columnKey as keyof Product];
        console.log("cellValue", cellValue);

        switch (columnKey) {
            case "image":
                return (
                    <Avatar
                        isBordered
                        className="w-14 h-14 text-large"
                        radius="sm"
                        src={product.image}
                    />
                );
            case "category":
                return (
                    <div className="max-w-48">
                        {product.category.map((category: any) => (
                            <Chip key={category.category_id} radius="full" size="sm" className="mr-1 mb-1">
                                {category.name}
                            </Chip>
                        ))}
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Action event example">
                                <DropdownItem
                                    key="edit"
                                    onPress={() => handleEditProduct(product)}
                                    startContent={<EditIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />}
                                >
                                    แก้ไข
                                </DropdownItem>
                                <DropdownItem
                                    key="delete"
                                    onPress={() => handleDeleteProduct(product)}
                                    startContent={<DeleteIcon className="text-xl text-danger pointer-events-none flex-shrink-0" />}
                                    variant="flat" color="danger"
                                >
                                    ลบ
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return (cellValue)
        }
    }, []
    );

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
        }, []
    );

    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const onClear = useCallback(() => {
        setFilterValue("");
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

    
    
    const [selectedOption, setSelectedOption] = useState<Selection>(new Set(["addproduct"]));
    const selectedOptionValue = Array.from(selectedOption)[0];

    const labelsMap: Record<string, string> = {
        addproduct: "เพิ่มสินค้า",
        category: "หมวดหมู่",
        addcategory: "เพิ่มหมวดหมู่",
        editcategory: "แก้ไข้หมวดหมู่",
        deletecategory: "ลบหมวดหมู่",
        size: "ขนาด",
        addsize: "เพิ่มขนาด",
        editsize: "แก้ไขขนาด",
        deletesize: "ลบขนาด",
        color: "สี",
        addcolor: "เพิ่มสี",
        editcolor: "แก้ไขสี",
        deletecolor: "ลบสี",
    };
    
    const [selectedKeys, setSelectedKeys] = useState<Set<string> | any>(new Set([]));
    const selectedKeysSet = new Set(selectedKeys);
    console.log(selectedKeysSet);
    
    const handleDeleteSelected = async () => {
        const selectedArray = Array.from(selectedKeys);
        try {
            await axios.delete("/api/products/", { data: { ids: selectedArray } });
            await fetchProduct();
            setSelectedKeys(new Set());
            closeModal();
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    const handleDeleteAll = async () => {
        try {
            await axios.delete("/api/products/all");
            await fetchProduct();
            setSelectedKeys(new Set());
            closeModal();
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    const [isModalAddProductOpen, setModalAddProductOpen] = useState(false);
    const [isModalAddCategoryOpen, setModalAddCategoryOpen] = useState(false);
    const [isModalAddSizeOpen, setModalAddSizeOpen] = useState(false);
    const [isModalAddColorOpen, setModalAddColorOpen] = useState(false);

    
    const [isModalEditCategoryOpen, setModalEditCategoryOpen] = useState(false);
    const [isModalEditSizeOpen, setModalEditSizeOpen] = useState(false);
    const [isModalEditColorOpen, setModalEditColorOpen] = useState(false);

    const [isModalDeleteCategoryOpen, setModalDeleteCategoryOpen] = useState(false);
    const [isModalDeleteSizeOpen, setModalDeleteSizeOpen] = useState(false);
    const [isModalDeleteColorOpen, setModalDeleteColorOpen] = useState(false);

    const handleDropdownSelection = (key: string) => {
        switch (key) {
            case "addproduct":
                setModalAddProductOpen(true);
                break;
            default:
                break;
        }
    };

    const handleSelection = (key: string) => {
        switch (key) {
            case "addcategory":
                setModalAddCategoryOpen(true);
                break;
            case "addsize":
                setModalAddSizeOpen(true);
                break;
            case "addcolor":
                setModalAddColorOpen(true);
                break;
            default:
                break;
        }
    };
    
    const topContent = useMemo(() => {

        console.log(selectedOptionValue);

        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="ค้นหาตามชื่อสินค้า..."
                        startContent={<SearchIcon1 />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        {selectedKeysSet.size > 0 && (
                            <>
                                {selectedKeys === "all" || selectedKeys.size === filteredItems.length ? (
                                    <Button color="danger" startContent={<DeleteIcon1 className="text-xl pointer-events-none flex-shrink-0" />} onPress={handleDeleteAll}>
                                        ลบสินค้าทั้งหมด {selectedKeys.size}
                                    </Button>
                                ) : (
                                    <Button
                                        color="danger"
                                        startContent={<DeleteIcon1 className="text-xl text-white pointer-events-none flex-shrink-0" />}
                                        onPress={handleDeleteSelected}
                                    >
                                        ลบสินค้า {selectedKeys.size}
                                    </Button>
                                )}

                            </>
                        )}
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<ChevronDownIcon className="text-small" />}
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

                        <ButtonGroup color="primary" >
                            <Button onPress={() => handleDropdownSelection(selectedOptionValue as string)} startContent={<PlusIcon />}>
                                {
                                    selectedOptionValue === "category" ? (
                                        <>
                                            <Dropdown placement="bottom-end">
                                                <DropdownTrigger>
                                                    หมวดหมู่สินค้า
                                                </DropdownTrigger>
                                                <DropdownMenu
                                                    aria-label="Merge options"
                                                    selectedKeys={selectedOption}
                                                    selectionMode="single"
                                                    onSelectionChange={(key) => handleSelection(Array.from(key)[0] as string)}
                                                >
                                                    <DropdownItem key="addcategory">เพิ่มหมวดหมู่สินค้า</DropdownItem>
                                                    <DropdownItem key="editcategory">แก้ไขหมวดหมู่สินค้า</DropdownItem>
                                                    <DropdownItem key="deletecategory">ลบหมวดหมู่สินค้า</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </>
                                    ) : selectedOptionValue === "size" ? (
                                        <>
                                            <Dropdown placement="bottom-end">
                                                <DropdownTrigger>
                                                    ขนาดสินค้า
                                                </DropdownTrigger>
                                                <DropdownMenu
                                                    aria-label="Merge options"
                                                    selectedKeys={selectedOption}
                                                    selectionMode="single"
                                                    onSelectionChange={(key) => handleSelection(Array.from(key)[0] as string)}
                                                >
                                                    <DropdownItem key="addsize">เพิ่มหมวดหมู่สินค้า</DropdownItem>
                                                    <DropdownItem key="editsize">แก้ไขหมวดหมู่สินค้า</DropdownItem>
                                                    <DropdownItem key="deletesize">ลบหมวดหมู่สินค้า</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </>
                                    ) : selectedOptionValue === "color" ? (
                                        <>
                                            <Dropdown placement="bottom-end">
                                                <DropdownTrigger>
                                                    สีสินค้า
                                                </DropdownTrigger>
                                                <DropdownMenu
                                                    aria-label="Merge options"
                                                    selectedKeys={selectedOption}
                                                    selectionMode="single"
                                                    onSelectionChange={(key) => handleSelection(Array.from(key)[0] as string)}
                                                >
                                                    <DropdownItem key="addcolor">เพิ่มหมวดหมู่สินค้า</DropdownItem>
                                                    <DropdownItem key="editcolor">แก้ไขหมวดหมู่สินค้า</DropdownItem>
                                                    <DropdownItem key="deletecolor">ลบหมวดหมู่สินค้า</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </>
                                    ) : labelsMap[selectedOptionValue]
                                }
                            </Button>

                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Button isIconOnly>
                                        <ChevronDownIcon />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label="Merge options"
                                    selectedKeys={selectedOption}
                                    selectionMode="single"
                                    onSelectionChange={setSelectedOption}
                                >
                                    <DropdownItem key="addproduct">เพิ่มสินค้า</DropdownItem>
                                    <DropdownItem key="category">หมวดหมู่สินค้า</DropdownItem>
                                    <DropdownItem key="size" >ขนาด</DropdownItem>
                                    <DropdownItem key="color">สี</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                        </ButtonGroup>

                        {/* ꧁𓊈𒆜 ──────────────────────────────────── เพิ่มสินค้า ──────────────────────────────────── 𒆜𓊉꧂ */}

                        <Modal
                            isKeyboardDismissDisabled={true}
                            isOpen={isModalAddProductOpen}
                            onOpenChange={onOpenChange}
                            onClose={closeModal}
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">เพิ่มสินค้า</ModalHeader>
                                        <form onSubmit={handleSubmitProduct(onProductSubmit)} >
                                            <ModalBody className="flex flex-col gap-3">

                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="relative group w-40 h-40">
                                                        <Avatar
                                                            size="lg"
                                                            src={profileImage || ""}
                                                            alt="Profile Picture"
                                                            className="border w-full h-full text-large"
                                                        />
                                                        <div
                                                            className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            onClick={handleImageChange}
                                                        >
                                                            <Icon icon="mingcute:pencil-fill" width="24" height="24" className="text-xl text-white"></Icon>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Controller
                                                    name="product_name"
                                                    control={controlProduct}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            label="ชื่อสินค้า"
                                                            labelPlacement="outside"
                                                            placeholder="ตั้งชื่อสินค้าของคุณ"
                                                            isInvalid={!!errorsProduct.product_name}
                                                            errorMessage={errorsProduct.product_name?.message}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    name="description"
                                                    control={controlProduct}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            label="รายละเอียดสินค้า"
                                                            labelPlacement="outside"
                                                            placeholder="ตั้งรายละเอียดสินค้าของคุณ"
                                                            isInvalid={!!errorsProduct.description}
                                                            errorMessage={errorsProduct.description?.message}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    name="categories"
                                                    control={controlProduct}
                                                    render={({ field }) => (
                                                        <Select
                                                            label="หมวดหมู่สินค้า"
                                                            labelPlacement="outside"
                                                            placeholder="เลือกหมวดหมู่สินค้าของคุณ"
                                                            selectionMode="multiple"
                                                            selectedKeys={field.value || []}
                                                            onSelectionChange={(keys) => field.onChange(Array.from(keys) as string[])}
                                                            fullWidth
                                                        >
                                                            {categories.map((category) => (
                                                                <SelectItem key={category.name} value={category.name}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                        </Select>
                                                    )}
                                                />
                                                <Controller
                                                    name="price"
                                                    control={controlProduct}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            label="ราคา"
                                                            labelPlacement="outside"
                                                            placeholder="ตั้งราคาของคุณ"
                                                            isInvalid={!!errorsProduct.price}
                                                            errorMessage={errorsProduct.price?.message}
                                                            value={field.value !== undefined ? String(field.value) : ""}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    name="stock"
                                                    control={controlProduct}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            label="จำนวนสินค้า (Stock)"
                                                            labelPlacement="outside"
                                                            placeholder="ตั้งจำนวนสินค้าของคุณ"
                                                            isInvalid={!!errorsProduct.stock}
                                                            errorMessage={errorsProduct.stock?.message}
                                                            value={field.value !== undefined ? String(field.value) : ""}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                        />
                                                    )}
                                                />

                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="danger" variant="light" onPress={onClose}>
                                                    ปิด
                                                </Button>
                                                <Button disabled={isSubmittingProduct} color="primary" type="submit">
                                                    เพิ่มสินค้า
                                                </Button>
                                            </ModalFooter>
                                        </form>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>

                        {/* ꧁𓊈𒆜 ──────────────────────────────────── เพิ่มหมวดหมู่สินค้า ──────────────────────────────────── 𒆜𓊉꧂ */}

                        <Modal
                            isKeyboardDismissDisabled={true}
                            isOpen={isModalAddCategoryOpen}
                            onOpenChange={onOpenChange}
                            onClose={closeModal}
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">เพิ่มหมวดหมู่สินค้า</ModalHeader>
                                        <form onSubmit={handleSubmitCategory(onCategorySubmit)} >
                                            <ModalBody className="flex flex-col gap-3">
                                                <Controller
                                                    name="name"
                                                    control={controlCategory}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            label="ชื่อหมวดหมู่"
                                                            labelPlacement="outside"
                                                            placeholder="ตั้งชื่อหมวดหมู่"
                                                            isInvalid={!!errorsCategory.name}
                                                            errorMessage={errorsCategory.name?.message}
                                                        />
                                                    )}
                                                />
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="danger" variant="light" onPress={onClose}>
                                                    ปิด
                                                </Button>
                                                <Button disabled={isSubmittingCategory} color="primary" type="submit">
                                                    เพิ่มหมวดหมู่สินค้า
                                                </Button>
                                            </ModalFooter>
                                        </form>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>

                        {/* ꧁𓊈𒆜 ──────────────────────────────────── เพิ่มขนาดสินค้า ──────────────────────────────────── 𒆜𓊉꧂ */}

                        <Modal
                            isKeyboardDismissDisabled={true}
                            isOpen={isModalAddSizeOpen}
                            onOpenChange={onOpenChange}
                            onClose={closeModal}
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">เพิ่มขนาดสินค้า</ModalHeader>
                                        <form onSubmit={handleSubmitSize(onSizeSubmit)} >
                                            <ModalBody className="flex flex-col gap-3">
                                                <Controller
                                                    name="name"
                                                    control={controlSize}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            label="ขนาดสินค้า"
                                                            labelPlacement="outside"
                                                            placeholder="ตั้งขนาดสินค้าของคุณ"
                                                            isInvalid={!!errorsSize.name}
                                                            errorMessage={errorsSize.name?.message}
                                                        />
                                                    )}
                                                />
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="danger" variant="light" onPress={onClose}>
                                                    ปิด
                                                </Button>
                                                <Button disabled={isSubmittingSize} color="primary" type="submit">
                                                    เพิ่มขนาด
                                                </Button>
                                            </ModalFooter>
                                        </form>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>

                        {/* ꧁𓊈𒆜 ──────────────────────────────────── เพิ่มสีสินค้า ──────────────────────────────────── 𒆜𓊉꧂ */}

                        <Modal
                            isKeyboardDismissDisabled={true}
                            isOpen={isModalAddColorOpen}
                            onOpenChange={onOpenChange}
                            onClose={closeModal}
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">เพิ่มสีสินค้า</ModalHeader>
                                        <form onSubmit={handleSubmitColor(onColorSubmit)} >
                                            <ModalBody className="flex flex-col gap-3">
                                                <Controller
                                                    name="name"
                                                    control={controlColor}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            label="สี"
                                                            labelPlacement="outside"
                                                            placeholder="ตั้งสีของคุณ"
                                                            isInvalid={!!errorsColor.name}
                                                            errorMessage={errorsColor.name?.message}
                                                        />
                                                    )}
                                                />
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="danger" variant="light" onPress={onClose}>
                                                    ปิด
                                                </Button>
                                                <Button disabled={isSubmittingColor} color="primary" type="submit">
                                                    เพิ่มสี
                                                </Button>
                                            </ModalFooter>
                                        </form>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        รวมสินค้า {products.length} รายการ
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        จำนวนแถวต่อหน้า:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
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
        products.length,
        hasSearchFilter,
        isOpen, onOpen, onOpenChange, onClose,
        handleSubmitProduct, handleSubmitCategory, handleSubmitSize, handleSubmitColor,
        onProductSubmit, onCategorySubmit, onSizeSubmit, onColorSubmit,
        controlProduct, controlCategory, controlSize, controlColor,
        isSubmittingProduct, isSubmittingCategory, isSubmittingSize, isSubmittingColor,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all" || selectedKeys.size === filteredItems.length
                        ? `เลือกสินค้าทั้งหมด`
                        : `${selectedKeys.size} จาก ${filteredItems.length} ที่เลือก`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onPreviousPage}
                    >
                        ก่อนหน้า
                    </Button>
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onNextPage}
                    >
                        ไปต่อ
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (

        <div className="flex flex-row max-w-screen-2xl mx-auto mt-4">

            {/* ꧁𓊈𒆜 ──────────────────────────────────── Modal จัดการสินค้า ──────────────────────────────────── 𒆜𓊉꧂ */}

            {ModalEditProduct}
            {ModalDeleteProduct}

            {/* ꧁𓊈𒆜 ──────────────────────────────────── ด้านข้าง ──────────────────────────────────── 𒆜𓊉꧂ */}

            <ListBox />

            {/* ꧁𓊈𒆜 ──────────────────────────────────── แจ้งเตือน ──────────────────────────────────── 𒆜𓊉꧂ */}

            <div className="relative max-w-screen-lg mx-auto">
                <div className="absolute inset-x-0 top-0 z-50  flex flex-col gap-4">
                    <Alert
                        color="success"
                        description={description}
                        isVisible={isVisible}
                        title="เพิ่มสินค้าสำเร็จ!!"
                        variant="faded"
                        onClose={() => setIsVisible(false)}
                    />
                </div>
            </div>

            <Table
                isHeaderSticky
                aria-label="Example table with custom cells, pagination and sorting"
                classNames={{
                    wrapper: "max-h-auto",
                }}
                // className="mx-auto max-w-screen-xl mt-2 "
                topContent={topContent}
                topContentPlacement="outside"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                sortDescriptor={sortDescriptor}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                onSelectionChange={(keys: any) => setSelectedKeys(keys)}
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
                <TableBody emptyContent={"ไม่พบสินค้า"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.product_id}>
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}