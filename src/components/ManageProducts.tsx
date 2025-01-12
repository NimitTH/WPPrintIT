"use client";

import React, { SVGProps, useState, useEffect, useCallback, useMemo } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    schemaProduct, schemaCategory, schemaSize, schemaColor,
    SchemaProduct, SchemaCategory, SchemaSize, SchemaColor
} from "@/types";
import axios from "axios";
import Link from "next/link";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Dropdown, DropdownTrigger, DropdownItem, DropdownMenu,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    Popover, PopoverTrigger, PopoverContent,
    Card, CardHeader, CardBody, CardFooter,
    Input,
    Button, ButtonGroup,
    Chip, ChipProps,
    User,
    Pagination,
    type Selection,
    SortDescriptor,
    Image,
    useDisclosure,
    Avatar, AvatarGroup,
    Select, SelectItem
} from "@nextui-org/react";
import { PlusIcon, VerticalDotsIcon, SearchIcon1, ChevronDownIcon, EditIcon, DeleteIcon, DeleteIcon1 } from "@/components/Icon";
import ListManage from "./ListManage";
import { IconSvgProps } from "@/types";

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

import { EditDocumentIcon } from "./Icon";
import { Icon } from "@iconify/react/dist/iconify.js";

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
    { name: "ID", uid: "product_id", sortable: true },
    { name: "รูปสินค้า", uid: "image" },
    { name: "ชื่อสินค้า", uid: "product_name", },
    { name: "รายละเอียด", uid: "description" },
    // { name: "หมวดหมู่", uid: "category" },
    // { name: "ขนาด", uid: "size" },
    { name: "ราคา", uid: "price", sortable: true },
    { name: "จำนวนสินค้า", uid: "stock", sortable: true },
    { name: "actions", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["product_id", "image", "product_name", "price", "stock", "actions"];

export default function CartProductList() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    type Product = (typeof products)[0];

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`/api/product`);
            setProducts(res.data)
        } catch (error) {
            console.error("An error occurred while fetching products", error);
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await axios.get("/api/product/category");
            setCategories(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [])

    const [productImageSrc, setProductImageSrc] = useState<string | null>(null);


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

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

    const closeModal = useCallback(() => {
        setProductImageSrc(null);
        setModalEditProductOpen(false);
        setModalDeleteProductOpen(false)
        setModalAddProductOpen(false);
        setModalAddCategoryOpen(false);
        setModalAddSizeOpen(false);
        setModalAddColorOpen(false);
    }, []);


    // ✦. ── ✦. ── ✦. ── ✦. ── ✦. หมวดหมู่สินค้า .✦ ── .✦ ── .✦ ── .✦ ── .✦

    const {
        control: controlCategory,
        handleSubmit: handleSubmitCategory,
        reset: resetCategory,
        formState: { errors: errorsCategory, isSubmitting: isSubmittingCategory },
    } = useForm<SchemaCategory>({
        resolver: zodResolver(schemaCategory),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onCategorySubmit: SubmitHandler<SchemaCategory> = async (category: SchemaCategory) => {
        try {
            await axios.post("/api/product/category", { category_name: category.name });
            closeModal()
            await fetchCategories();
            resetCategory()
        } catch (error) {
            console.error(error);
        }
    };

    const [isModalAddCategoryOpen, setModalAddCategoryOpen] = useState(false);
    const [isModalEditCategoryOpen, setModalEditCategoryOpen] = useState(false);
    const [isModalDeleteCategoryOpen, setModalDeleteCategoryOpen] = useState(false);

    const renderModalAddCategory = useCallback(() => {
        return (
            <Modal
                isKeyboardDismissDisabled={true}
                isOpen={isModalAddCategoryOpen}
                onOpenChange={onOpenChange}
                onClose={closeModal}
                classNames={{
                    base: "border-1 border-default-200"
                }}
            >
                <ModalContent>
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
                </ModalContent>
            </Modal>

        )
    }, [closeModal, controlCategory, errorsCategory.name, handleSubmitCategory, isModalAddCategoryOpen, isSubmittingCategory, onCategorySubmit, onClose, onOpenChange])

    const renderModalEditCategory = useCallback(() => {
        return (
            <p>กำลังพัฒนา</p>
        )
    }, [])

    const renderModalDeleteCategory = useCallback(() => {
        return (
            <p>กำลังพัฒนา</p>
        )
    }, [])

    // ✦. ── ✦. ── ✦. ── ✦. ── ✦. ── ✦. ขนาดสินค้า .✦ ── .✦ ── .✦ ── .✦ ── .✦ ── .✦

    const {
        control: controlSize,
        handleSubmit: handleSubmitSize,
        reset: resetSize,
        formState: { errors: errorsSize, isSubmitting: isSubmittingSize },
    } = useForm<SchemaSize>({
        resolver: zodResolver(schemaSize),
    });

    const onSizeSubmit: SubmitHandler<SchemaSize> = async (size: SchemaSize) => {
        try {
            await axios.post("/api/product/size", { size_name: size.name });
            resetSize()
            closeModal()
        } catch (error) {
            console.error(error);
        }
    };

    const [isModalAddSizeOpen, setModalAddSizeOpen] = useState(false);
    const [isModalEditSizeOpen, setModalEditSizeOpen] = useState(false);
    const [isModalDeleteSizeOpen, setModalDeleteSizeOpen] = useState(false);

    const renderModalAddSize = useCallback(() => {
        return (
            <Modal
                isKeyboardDismissDisabled={true}
                isOpen={isModalAddSizeOpen}
                onOpenChange={onOpenChange}
                onClose={closeModal}
                classNames={{
                    base: "border-1 border-default-200"
                }}
            >
                <ModalContent>
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
                            <Button color="danger" variant="light" onPress={closeModal}>
                                ปิด
                            </Button>
                            <Button disabled={isSubmittingSize} color="primary" type="submit">
                                เพิ่มขนาด
                            </Button>
                        </ModalFooter>
                    </form>

                </ModalContent>
            </Modal>
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalAddSizeOpen])

    const renderModalEditSize = useCallback(() => {
        return (
            <p>กำลังพัฒนา</p>
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalEditSizeOpen])

    const renderModalDeleteSize = useCallback(() => {
        return (
            <p>กำลังพัฒนา</p>
        )
    }, [])

    // ✦. ── ✦. ── ✦. ── ✦. ── ✦. สีสินค้า .✦ ── .✦ ── .✦ ── .✦ ── .✦

    const {
        control: controlColor,
        handleSubmit: handleSubmitColor,
        reset: resetColor,
        formState: { errors: errorsColor, isSubmitting: isSubmittingColor },
    } = useForm<SchemaColor>({
        resolver: zodResolver(schemaColor),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onColorSubmit: SubmitHandler<SchemaColor> = async (color: SchemaColor) => {
        try {
            await axios.post("/api/product/color", { color_name: color.name });
            resetColor()
            closeModal()
        } catch (error) {
            console.error(error);
        }
    };

    const [isModalAddColorOpen, setModalAddColorOpen] = useState(false);
    const [isModalEditColorOpen, setModalEditColorOpen] = useState(false);
    const [isModalDeleteColorOpen, setModalDeleteColorOpen] = useState(false);

    const renderModalAddColor = useCallback(() => {
        return (
            <Modal
                isKeyboardDismissDisabled={true}
                isOpen={isModalAddColorOpen}
                onOpenChange={onOpenChange}
                onClose={closeModal}
                classNames={{
                    base: "border-1 border-default-200"
                }}
            >
                <ModalContent>

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

                </ModalContent>
            </Modal>
        )
    }, [closeModal, controlColor, errorsColor.name, handleSubmitColor, isModalAddColorOpen, isSubmittingColor, onClose, onColorSubmit, onOpenChange])

    const renderModalEditColor = useCallback(() => {
        return (
            <p>กำลังพัฒนา</p>
        )
    }, [])

    const renderModalDeleteColor = useCallback(() => {
        return (
            <p>กำลังพัฒนา</p>
        )
    }, [])

    // ✦. ── ✦. ── ✦. ── ✦. ── ✦. เพิ่มสินค้า .✦ ── .✦ ── .✦ ── .✦ ── .✦

    const {
        control: controlProduct,
        handleSubmit: handleSubmitProduct,
        reset: resetProduct,
        formState: { errors: errorsProduct, isSubmitting: isSubmittingProduct },
    } = useForm<SchemaProduct>({
        resolver: zodResolver(schemaProduct),
        defaultValues: {
            categories: []
        },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onProductSubmit: SubmitHandler<SchemaProduct> = async (product: SchemaProduct) => {
        try {
            const payload = {
                ...product,
                categories: product.categories ?? [],
                image: productImageSrc,
            };
            await axios.post("/api/product", payload);
            resetProduct()
            await fetchProducts()
            closeModal()
        } catch (error) {
            console.error(error);
        }
    };

    const [isModalAddProductOpen, setModalAddProductOpen] = useState(false);

    const renderAddProduct = useCallback(() => {
        return (
            <Modal
                isKeyboardDismissDisabled={true}
                isOpen={isModalAddProductOpen}
                onOpenChange={onOpenChange}
                onClose={closeModal}
                classNames={{
                    base: "border-1 border-default-200"
                }}
            >
                <ModalContent>

                    <ModalHeader className="flex flex-col gap-1">เพิ่มสินค้า</ModalHeader>
                    <form onSubmit={handleSubmitProduct(onProductSubmit)} >
                        <ModalBody className="flex flex-col gap-3">

                            <div className="flex flex-col items-center gap-4">
                                <div className="relative group w-40 h-40">
                                    <Avatar
                                        key={productImageSrc}
                                        size="lg"
                                        src={productImageSrc || ""}
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
                                        {categories.map((category: any) => (
                                            <SelectItem key={category.category_id} value={category.category_name}>
                                                {category.category_name}
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
                            <Button color="danger" variant="light" onPress={closeModal}>
                                ปิด
                            </Button>
                            <Button disabled={isSubmittingProduct} color="primary" type="submit">
                                เพิ่มสินค้า
                            </Button>
                        </ModalFooter>
                    </form>

                </ModalContent>
            </Modal>
        )
    }, [isModalAddProductOpen, onOpenChange, closeModal, handleSubmitProduct, onProductSubmit, productImageSrc, controlProduct, isSubmittingProduct, errorsProduct.product_name, errorsProduct.description, errorsProduct.price, errorsProduct.stock, categories])
    

    // ✦. ── ✦. ── ✦. ── ✦. ── ✦. แก้ไขสินค้า .✦ ── .✦ ── .✦ ── .✦ ── .✦

    const {
        control: controlEditProduct,
        handleSubmit: handleSubmitEditProduct,
        setValue: setValueEditProduct,
        formState: { errors: errorsEditProduct, isSubmitting: isSubmittingEditProduct },
    } = useForm<SchemaProduct>({
        resolver: zodResolver(schemaProduct),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onEditProductSubmit: SubmitHandler<SchemaProduct> = async (product: SchemaProduct) => {
        console.log(product);

        try {
            const payload = {
                ...product,
                category: product.categories ?? [],
                image: productImageSrc,
            };
            console.log(product.categories);
            await axios.put(`/api/product/${productEditId}`, payload);
            await fetchProducts()
            closeModal()
        } catch (error) {
            console.error(error);
        }
    };

    const [values, setValues] = useState<Selection>(new Set([]));
    const [productEditId, setProductEditId] = useState<number>(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onSubmitEditProduct = (product: Product) => {
        setModalEditProductOpen(true);

        setProductEditId(product.product_id)
        setValueEditProduct("product_name", product.product_name);
        setValueEditProduct("description", product.description);

        const categoryNames = product.category.map((category: any) => category.category_name);
        console.log(categoryNames);
        setValues(new Set(categoryNames));
        setValueEditProduct("categories", categoryNames);

        setValueEditProduct("price", product.price);
        setValueEditProduct("stock", product.stock);
        setProductImageSrc(product.image);
    }

    const [isModalEditProductOpen, setModalEditProductOpen] = useState(false);

    const renderEditProduct = useCallback(() => {
        return (
            <Modal
                isKeyboardDismissDisabled={true}
                isOpen={isModalEditProductOpen}
                onOpenChange={onOpenChange}
                onClose={closeModal}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">แก้ไข้สินค้า</ModalHeader>
                    <form onSubmit={handleSubmitEditProduct(onEditProductSubmit)} >
                        <ModalBody className="flex flex-col gap-3">

                            <div className="flex flex-col items-center gap-4">
                                <div className="relative group w-40 h-40">
                                    <Avatar
                                        key={productImageSrc}
                                        size="lg"
                                        src={productImageSrc || ""}
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
                                        selectedKeys={field.value || []} // ใช้ array ว่างแทน undefined
                                        onSelectionChange={(keys) => {
                                            console.log("Selected keys:", Array.from(keys));
                                            setValues(new Set(keys));
                                            field.onChange(Array.from(keys) as string[]);
                                        }}
                                    >
                                        {categories.map((category) => (
                                            <SelectItem key={category.category_name} value={category.category_name}>
                                                {category.category_name}
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
                                แก้ไขสินค้า
                            </Button>
                        </ModalFooter>
                    </form>


                </ModalContent>
            </Modal>
        )
    }, [isModalEditProductOpen, onOpenChange, closeModal, handleSubmitEditProduct, onEditProductSubmit, productImageSrc, controlEditProduct, onClose, isSubmittingEditProduct, errorsEditProduct.product_name, errorsEditProduct.description, errorsEditProduct.price, errorsEditProduct.stock, categories])

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
                        const res = await axios.post("/api/product/upload", formData);
                        console.log(res);

                        if (res.data.success) {
                            setProductImageSrc(res.data.url);
                        }
                    } catch (error) {
                        console.error("Image upload failed:", error);
                    }
                }
            }
        };
        input.click();
    }

    // ✦. ── ✦. ── ✦. ── ✦. ── ✦. ลบสินค้า .✦ ── .✦ ── .✦ ── .✦ ── .✦

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDeleteProduct = async (id?: number) => {
        try {
            if (id) {
                await axios.delete(`/api/product/${id}`);
                await fetchProducts();
                closeModal();
            } else {
                const selectedIds = Array.from(normalizedSelectedKeys).map((id: any) => parseInt(id, 10));

                await Promise.all(
                    selectedIds.map((id) => axios.delete(`/api/product/${id}`))
                );

                setProducts((prevProducts) =>
                    prevProducts.filter((product) => !selectedIds.includes(product.product_id))
                );

                setSelectedKeys(new Set([]));

                await fetchProducts();
                closeModal()
            }
        } catch (error) {
            console.error("Error deleting selected items:", error);
        }
    }

    const [DeleteProductId, setDeleteProductId] = useState<number>(0)

    const onSubmitDeleteProductId = async (id?: number) => {
        if (id) {
            setDeleteProductId(id)
            setModalDeleteProductOpen(true)
        } else {
            setModalDeleteProductOpen(true)
        }
    }

    const [isModalDeleteProductOpen, setModalDeleteProductOpen] = useState(false);

    const renderDeleteSelectedProducts = useCallback(() => {
        return (
            <Modal
                isKeyboardDismissDisabled={true}
                isOpen={isModalDeleteProductOpen}
                onOpenChange={onOpenChange}
                onClose={closeModal}
            >
                <ModalContent>


                    <ModalHeader className="flex flex-col gap-1">ยืนยันลบสินค้า</ModalHeader>
                    <ModalBody className="flex flex-row gap-3">
                        <p>
                            คุณต้องการลบสินค้าชิ้นนี้
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={closeModal}>
                            ยกเลิก
                        </Button>
                        <Button
                            onPress={() => handleDeleteProduct(DeleteProductId)}
                            color="primary" type="submit"
                        >
                            ลบ
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }, [DeleteProductId, closeModal, handleDeleteProduct, isModalDeleteProductOpen, onOpenChange])

    // ꧁𓊈𒆜 ──────────────────────────────────── ไม่เกี่ยว ──────────────────────────────────── 𒆜𓊉꧂


    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );
    const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "product_id",
        direction: "ascending",
    });

    const [page, setPage] = useState(1);

    const pages = Math.ceil(products.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...products];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((product) =>
                product.product_name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        return filteredUsers;
    }, [products, hasSearchFilter, filterValue]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {

        return [...items].sort((a: Product, b: Product) => {

            const first = sortDescriptor.column === "price"
                ? a.price : a[sortDescriptor.column as keyof Product];

            const second = sortDescriptor.column === "price"
                ? b.price : b[sortDescriptor.column as keyof Product];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    

    const renderCell = React.useCallback((product: Product, columnKey: React.Key) => {
        const cellValue = product[columnKey as keyof Product];
        console.log(product);
        switch (columnKey) {
            case "image":
                return (
                    <Avatar
                        key={product.image}
                        radius="sm"
                        size="md"
                        src={product.image}
                    />
                );
            case "category":
                return (
                    <div className="max-w-48">
                        {product.category.map((category: any) => (
                            <Chip key={category.category_id} radius="full" size="sm" className="mr-1 mb-1">
                                {category.category_name}
                            </Chip>
                        ))}
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="border-1 border-default-200" >
                            <DropdownTrigger>
                                <Button isIconOnly radius="full" size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Action event example">
                                <DropdownItem
                                    key="edit"
                                    onPress={() => onSubmitEditProduct(product)}
                                    startContent={<EditIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />}
                                >
                                    แก้ไข
                                </DropdownItem>
                                <DropdownItem
                                    key="delete"
                                    onPress={() => onSubmitDeleteProductId(product.product_id)}
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
                return cellValue;
        }
    }, [onSubmitEditProduct]);

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

    const selectedKeysSet = new Set(selectedKeys);

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
                        placeholder="ค้นหาสินค้า..."
                        size="sm"
                        startContent={<SearchIcon1 className="text-default-300" />}
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">

                        <Button size="sm" variant="flat" onPress={() => setModalAddProductOpen(true)} startContent={<PlusIcon />}>
                            เพิ่มสินค้า
                        </Button>

                        {/* <ButtonGroup size="sm" variant="flat" className="bg-background" >
                            <Button onPress={() => handleDropdownSelection(selectedOptionValue as string)} startContent={<PlusIcon />}>
                                {
                                    selectedOptionValue === "category" ? (
                                        <>
                                            <Dropdown placement="bottom-end" className="border-1 border-default-200">
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
                                            <Dropdown placement="bottom-end" className="border-1 border-default-200">
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
                                            <Dropdown placement="bottom-end" className="border-1 border-default-200">
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

                            <Dropdown placement="bottom-end" className="border-1 border-default-200">
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

                        </ButtonGroup> */}

                        <Dropdown className="border-1 border-default-200">
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
                    <span className="text-default-400 text-small">มีสินค้าทั้งหมด {products.length} รายการ</span>
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
    }, [filterValue, visibleColumns, onSearchChange, onRowsPerPageChange, products.length]);

    const normalizedSelectedKeys = React.useMemo(() => {
        if (selectedKeys === "all") {
            return new Set(products.map((product) => String(product.product_id)));
        }
        return selectedKeys;
    }, [selectedKeys, products]);

    const selectedIds = Array.from(normalizedSelectedKeys).map((id: any) => parseInt(id, 10));

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex max-sm:flex-col justify-between items-center">
                <div className="max-sm:mb-2">
                    <span className="mr-2 text-small text-default-400">เลือก ({selectedKeys === "all" ? products.length : selectedKeys.size} สินค้า) </span>
                    {selectedIds.length > 0 && (
                        <Button
                            size="sm"
                            variant="flat"
                            onPress={() => onSubmitDeleteProductId()}
                            startContent={<Cancel size={16} />}
                        >
                            ลบสินค้า
                        </Button>
                    )}
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
            </div>
        );
    }, [selectedKeys, products.length, selectedIds.length, hasSearchFilter, page, pages]);

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
                <ListManage />
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
                            <TableRow key={item.product_id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>


            {/* {renderModal()} */}
            {renderAddProduct()}
            {renderEditProduct()}
            {renderDeleteSelectedProducts()}

            {/* {renderModalAddCategory()}
            {renderModalEditCategory()}
            {renderModalDeleteCategory()}
            {renderModalAddSize()}
            {renderModalEditSize()}
            {renderModalDeleteSize()}
            {renderModalAddColor()}
            {renderModalEditColor()}
            {renderModalDeleteColor()} */}
        </>
    );
}