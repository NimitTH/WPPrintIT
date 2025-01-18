"use client";

import React, { SVGProps, useState, useEffect, useCallback, useMemo } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    schemaProduct, schemaCategory,
    SchemaProduct, SchemaCategory,
} from "@/types";
import axios from "axios";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    Dropdown, DropdownTrigger, DropdownItem, DropdownMenu,
    Popover, PopoverTrigger, PopoverContent,
    Card, CardHeader, CardBody, CardFooter,
    Button, ButtonGroup,
    Avatar, AvatarGroup,
    Select, SelectItem,
    Chip, ChipProps,
    type Selection,
    SortDescriptor,
    useDisclosure,
    Pagination,
    Image,
    Input,
    User,
} from "@heroui/react";
import { PlusIcon, VerticalDotsIcon, SearchIcon1, ChevronDownIcon, EditIcon, DeleteIcon, DeleteIcon1, FilterIcon, Cancel } from "@/components/Icon";
import { Icon } from "@iconify/react/dist/iconify.js";
import ListManage from "./ListBoxManage";

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
    { name: "ID", uid: "product_id", sortable: true },
    { name: "รูปสินค้า", uid: "image" },
    { name: "ชื่อสินค้า", uid: "product_name", },
    { name: "รายละเอียด", uid: "description" },
    { name: "หมวดหมู่", uid: "category" },
    // { name: "ขนาด", uid: "size" },
    { name: "ราคา", uid: "price", sortable: true },
    { name: "จำนวนสินค้า", uid: "stock", sortable: true },
    { name: "actions", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["product_id", "image", "product_name", "description", "category", "price", "stock", "actions"];

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
            setEditCategories(res.data);
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

    const labelsMap: Record<string, string> = useMemo(() => {
        return {
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
        }
    }, []);

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );
    const [statusFilter, setStatusFilter] = useState<Selection>("all");

    const normalizedSelectedKeys = React.useMemo(() => {
        if (selectedKeys === "all") {
            return new Set(products.map((product) => String(product.product_id)));
        }
        return selectedKeys;
    }, [selectedKeys, products]);

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
        console.log(key);
        switch (key) {
            case "addcategory":
                setModalAddCategoryOpen(true);
                break;
            case "editcategory":
                setModalEditCategoryOpen(true);
                break;
            case "deletecategory":
                setModalDeleteCategoryOpen(true);
                break;
            case "addsize":
                // setModalAddSizeOpen(true);
                break;
            case "addcolor":
                // setModalAddColorOpen(true);
                break;
            default:
                break;
        }
    };

    const { onOpenChange, onClose } = useDisclosure()

    const closeModal = useCallback(() => {
        setProductImageSrc(null);

        setModalEditProductOpen(false);
        setModalDeleteProductOpen(false)
        setModalAddProductOpen(false);

        setModalAddCategoryOpen(false);
        setModalEditCategoryOpen(false);
        setModalDeleteCategoryOpen(false);
        // setModalAddSizeOpen(false);
        // setModalAddColorOpen(false);
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

    const onCategorySubmit: SubmitHandler<SchemaCategory> = useCallback(async (category: SchemaCategory) => {
        try {
            await axios.post("/api/product/category", { category_name: category.category_name });
            closeModal()
            await fetchCategories();
            resetCategory()
        } catch (error) {
            console.error(error);
        }
    }, [closeModal, resetCategory]);

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
                                name="category_name"
                                control={controlCategory}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="ชื่อหมวดหมู่"
                                        labelPlacement="outside"
                                        placeholder="ตั้งชื่อหมวดหมู่"
                                        isInvalid={!!errorsCategory.category_name}
                                        errorMessage={errorsCategory.category_name?.message}
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
    }, [closeModal, controlCategory, errorsCategory.category_name, handleSubmitCategory, isModalAddCategoryOpen, isSubmittingCategory, onCategorySubmit, onClose, onOpenChange])

    const [editCategories, setEditCategories] = useState(categories);

    const handleCategoryChange = useCallback((index: number, value: string) => {
        const updatedCategories = [...editCategories];
        updatedCategories[index].category_name = value;
        setEditCategories(updatedCategories);
    }, [editCategories, ]);

    const handleCategorySubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("Updated categories:", editCategories);

            await axios.put("/api/product/category", { categories: editCategories });
            closeModal();
        } catch (error) {
            console.error("Error updating categories:", error);
        }
    }, [closeModal, editCategories]);

    const handleCategoryDelete = useCallback(async (id: any) => {
        try {
            console.log(id);
            await axios.delete(`/api/product/category/${id}`)
            fetchCategories()
        } catch (error) {
            console.error("Error updating categories:", error);
        }

    }, [])

    const renderModalEditCategory = useCallback(() => {
        return (
            <Modal
                isKeyboardDismissDisabled={true}
                isOpen={isModalEditCategoryOpen}
                onOpenChange={onOpenChange}
                onClose={closeModal}
                classNames={{
                    base: "border-1 border-default-200"
                }}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">แก้ไขหมวดหมู่สินค้า</ModalHeader>

                    <form onSubmit={handleCategorySubmit}>
                        <ModalBody className="flex flex-col gap-3">
                            {editCategories.map((category, index) => (
                                <div key={category.category_id} className="flex flex-row gap-2">
                                    <Input
                                        size="sm"
                                        labelPlacement="outside"
                                        placeholder="ตั้งชื่อหมวดหมู่"
                                        value={category.category_name}
                                        onChange={(e) => handleCategoryChange(index, e.target.value)}
                                    />
                                    <Button color="danger" size="sm" onPress={() => handleCategoryDelete(category.category_id)}>
                                        ลบ
                                    </Button>
                                </div>
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={closeModal}>
                                ปิด
                            </Button>
                            <Button color="primary" type="submit">
                                แก้ไขหมวดหมู่สินค้า
                            </Button>
                        </ModalFooter>

                    </form>

                </ModalContent>
            </Modal >
        )
    }, [closeModal, isModalEditCategoryOpen, onOpenChange, editCategories, handleCategoryChange, handleCategoryDelete, handleCategorySubmit])

    const {
        control: controlCategoryDelete,
        handleSubmit: handleSubmitCategoryDelete,
        reset: resetCategoryDelete,
        formState: { errors: errorsCategoryDelete, isSubmitting: isSubmittingCategoryDelete },
    } = useForm<SchemaCategory>({
        resolver: zodResolver(schemaCategory),
    });

    const onCategoryDeleteSubmit: SubmitHandler<SchemaCategory> = useCallback(async (category: SchemaCategory) => {
        try {
            await axios.delete(`/api/product/category/${category.category_id}`);
            closeModal()
            await fetchCategories();
            resetCategoryDelete()
        } catch (error) {
            console.error(error);
        }
    }, [closeModal, resetCategoryDelete]);

    const renderModalDeleteCategory = useCallback(() => {
        return (
            <Modal
                isKeyboardDismissDisabled={true}
                isOpen={isModalDeleteCategoryOpen}
                onOpenChange={onOpenChange}
                onClose={closeModal}
                classNames={{
                    base: "border-1 border-default-200"
                }}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">ลบหมวดหมู่สินค้า</ModalHeader>
                    <form onSubmit={handleSubmitCategoryDelete(onCategoryDeleteSubmit)} >
                        <ModalBody className="flex flex-col gap-3">
                            <Controller
                                name="category_name"
                                control={controlCategoryDelete}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="ชื่อหมวดหมู่"
                                        labelPlacement="outside"
                                        placeholder="ตั้งชื่อหมวดหมู่"
                                        isInvalid={!!errorsCategoryDelete.category_name}
                                        errorMessage={errorsCategoryDelete.category_name?.message}
                                    />
                                )}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                ปิด
                            </Button>
                            <Button disabled={isSubmittingCategoryDelete} color="primary" type="submit">
                                ลบหมวดหมู่สินค้า
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        )
    }, [
        closeModal,
        isModalDeleteCategoryOpen,
        onClose,
        onOpenChange,
        controlCategoryDelete, errorsCategoryDelete, handleSubmitCategoryDelete, isSubmittingCategoryDelete, onCategoryDeleteSubmit
    ])

    // ✦. ── ✦. ── ✦. ── ✦. ── ✦. ── ✦. ขนาดสินค้า .✦ ── .✦ ── .✦ ── .✦ ── .✦ ── .✦

    // const {
    //     control: controlSize,
    //     handleSubmit: handleSubmitSize,
    //     reset: resetSize,
    //     formState: { errors: errorsSize, isSubmitting: isSubmittingSize },
    // } = useForm<SchemaSize>({
    //     resolver: zodResolver(schemaSize),
    // });

    // const onSizeSubmit: SubmitHandler<SchemaSize> = async (size: SchemaSize) => {
    //     try {
    //         await axios.post("/api/product/size", { size_name: size.name });
    //         resetSize()
    //         closeModal()
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const [isModalAddSizeOpen, setModalAddSizeOpen] = useState(false);
    // const [isModalEditSizeOpen, setModalEditSizeOpen] = useState(false);
    // const [isModalDeleteSizeOpen, setModalDeleteSizeOpen] = useState(false);

    // const renderModalAddSize = useCallback(() => {
    //     return (
    //         <Modal
    //             isKeyboardDismissDisabled={true}
    //             isOpen={isModalAddSizeOpen}
    //             onOpenChange={onOpenChange}
    //             onClose={closeModal}
    //             classNames={{
    //                 base: "border-1 border-default-200"
    //             }}
    //         >
    //             <ModalContent>
    //                 <ModalHeader className="flex flex-col gap-1">เพิ่มขนาดสินค้า</ModalHeader>
    //                 <form onSubmit={handleSubmitSize(onSizeSubmit)} >
    //                     <ModalBody className="flex flex-col gap-3">
    //                         <Controller
    //                             name="name"
    //                             control={controlSize}
    //                             render={({ field }) => (
    //                                 <Input
    //                                     {...field}
    //                                     label="ขนาดสินค้า"
    //                                     labelPlacement="outside"
    //                                     placeholder="ตั้งขนาดสินค้าของคุณ"
    //                                     isInvalid={!!errorsSize.name}
    //                                     errorMessage={errorsSize.name?.message}
    //                                 />
    //                             )}
    //                         />
    //                     </ModalBody>
    //                     <ModalFooter>
    //                         <Button color="danger" variant="light" onPress={closeModal}>
    //                             ปิด
    //                         </Button>
    //                         <Button disabled={isSubmittingSize} color="primary" type="submit">
    //                             เพิ่มขนาด
    //                         </Button>
    //                     </ModalFooter>
    //                 </form>

    //             </ModalContent>
    //         </Modal>
    //     )
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isModalAddSizeOpen])

    // const renderModalEditSize = useCallback(() => {
    //     return (
    //         <p>กำลังพัฒนา</p>
    //     )
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isModalEditSizeOpen])

    // const renderModalDeleteSize = useCallback(() => {
    //     return (
    //         <p>กำลังพัฒนา</p>
    //     )
    // }, [])

    // ✦. ── ✦. ── ✦. ── ✦. ── ✦. สีสินค้า .✦ ── .✦ ── .✦ ── .✦ ── .✦

    // const {
    //     control: controlColor,
    //     handleSubmit: handleSubmitColor,
    //     reset: resetColor,
    //     formState: { errors: errorsColor, isSubmitting: isSubmittingColor },
    // } = useForm<SchemaColor>({
    //     resolver: zodResolver(schemaColor),
    // });

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // const onColorSubmit: SubmitHandler<SchemaColor> = async (color: SchemaColor) => {
    //     try {
    //         await axios.post("/api/product/color", { color_name: color.name });
    //         resetColor()
    //         closeModal()
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const [isModalAddColorOpen, setModalAddColorOpen] = useState(false);
    // const [isModalEditColorOpen, setModalEditColorOpen] = useState(false);
    // const [isModalDeleteColorOpen, setModalDeleteColorOpen] = useState(false);

    // const renderModalAddColor = useCallback(() => {
    //     return (
    //         <Modal
    //             isKeyboardDismissDisabled={true}
    //             isOpen={isModalAddColorOpen}
    //             onOpenChange={onOpenChange}
    //             onClose={closeModal}
    //             classNames={{
    //                 base: "border-1 border-default-200"
    //             }}
    //         >
    //             <ModalContent>

    //                 <ModalHeader className="flex flex-col gap-1">เพิ่มสีสินค้า</ModalHeader>
    //                 <form onSubmit={handleSubmitColor(onColorSubmit)} >
    //                     <ModalBody className="flex flex-col gap-3">
    //                         <Controller
    //                             name="name"
    //                             control={controlColor}
    //                             render={({ field }) => (
    //                                 <Input
    //                                     {...field}
    //                                     label="สี"
    //                                     labelPlacement="outside"
    //                                     placeholder="ตั้งสีของคุณ"
    //                                     isInvalid={!!errorsColor.name}
    //                                     errorMessage={errorsColor.name?.message}
    //                                 />
    //                             )}
    //                         />
    //                     </ModalBody>
    //                     <ModalFooter>
    //                         <Button color="danger" variant="light" onPress={onClose}>
    //                             ปิด
    //                         </Button>
    //                         <Button disabled={isSubmittingColor} color="primary" type="submit">
    //                             เพิ่มสี
    //                         </Button>
    //                     </ModalFooter>
    //                 </form>

    //             </ModalContent>
    //         </Modal>
    //     )
    // }, [closeModal, controlColor, errorsColor.name, handleSubmitColor, isModalAddColorOpen, isSubmittingColor, onClose, onColorSubmit, onOpenChange])

    // const renderModalEditColor = useCallback(() => {
    //     return (
    //         <p>กำลังพัฒนา</p>
    //     )
    // }, [])

    // const renderModalDeleteColor = useCallback(() => {
    //     return (
    //         <p>กำลังพัฒนา</p>
    //     )
    // }, [])

    // ✦. ── ✦. ── ✦. ── ✦. ── ✦. เพิ่มสินค้า .✦ ── .✦ ── .✦ ── .✦ ── .✦

    const {
        control: controlProduct,
        handleSubmit: handleSubmitProduct,
        reset: resetProduct,
        formState: { errors: errorsProduct, isSubmitting: isSubmittingProduct },
    } = useForm<SchemaProduct>({
        resolver: zodResolver(schemaProduct),

    });

    const onProductSubmit: SubmitHandler<SchemaProduct> = useCallback(async (product: SchemaProduct) => {
        try {
            const payload = {
                ...product,
                image: productImageSrc,
                category: product.category,
            };
            console.log(payload);
            await axios.post("/api/product", payload);
            resetProduct()
            await fetchProducts()
            closeModal()
        } catch (error) {
            console.error(error);
        }
    }, [closeModal, productImageSrc, resetProduct]);

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
                                name="category"
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
                                            <SelectItem key={category.category_name} value={category.category_name}>
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
    }, [categories, isModalAddProductOpen, onOpenChange, closeModal, handleSubmitProduct, onProductSubmit, productImageSrc, controlProduct, isSubmittingProduct, errorsProduct.product_name, errorsProduct.description, errorsProduct.price, errorsProduct.stock])


    // ✦. ── ✦. ── ✦. ── ✦. ── ✦. แก้ไขสินค้า .✦ ── .✦ ── .✦ ── .✦ ── .✦

    const {
        control: controlEditProduct,
        handleSubmit: handleSubmitEditProduct,
        setValue: setValueEditProduct,
        formState: { errors: errorsEditProduct, isSubmitting: isSubmittingEditProduct },
    } = useForm<SchemaProduct>({
        resolver: zodResolver(schemaProduct),
    });

    const [values, setValues] = useState<Selection>(new Set([]));
    const [productEditId, setProductEditId] = useState<number>(0)

    const onEditProductSubmit: SubmitHandler<SchemaProduct> = useCallback(async (product: SchemaProduct) => {

        try {
            const payload = {
                ...product,
                category: product.category,
                image: productImageSrc,
            };
            console.log(payload);
            await axios.put(`/api/product/${productEditId}`, payload);
            await fetchProducts()
            closeModal()
        } catch (error) {
            console.error(error);
        }
    }, [closeModal, productEditId, productImageSrc]);

    

    const onSubmitEditProduct = useCallback((product: Product) => {
        setModalEditProductOpen(true);

        setProductEditId(product.product_id)
        setValueEditProduct("product_name", product.product_name);
        setValueEditProduct("description", product.description);

        const categoryNames = product.category.map((category: any) => category.category_name);
        setValues(new Set(categoryNames));
        setValueEditProduct("category", categoryNames);

        setValueEditProduct("price", product.price);
        setValueEditProduct("stock", product.stock);
        setProductImageSrc(product.image);
    }, [setValueEditProduct])

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
                    <ModalHeader className="flex flex-col gap-1">แก้ไขสินค้า</ModalHeader>
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
                                name="category"
                                control={controlEditProduct}
                                render={({ field }) => (
                                    <Select
                                        label="หมวดหมู่สินค้า"
                                        fullWidth
                                        labelPlacement="outside"
                                        placeholder="เลือกหมวดหมู่สินค้าของคุณ"
                                        selectionMode="multiple"
                                        selectedKeys={field.value || []}
                                        onSelectionChange={(keys) => {
                                            const selectedKeys = Array.from(keys);
                                            console.log("Selected keys:", selectedKeys);
                                            setValues(new Set(selectedKeys));
                                            field.onChange(selectedKeys as string[]);
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
    }, [
        categories,
        isModalEditProductOpen,
        onOpenChange, closeModal,
        handleSubmitEditProduct,
        onEditProductSubmit,
        productImageSrc,
        controlEditProduct,
        onClose, isSubmittingEditProduct,
        errorsEditProduct.product_name,
        errorsEditProduct.description,
        errorsEditProduct.price,
        errorsEditProduct.stock
    ])

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

    const handleDeleteProduct = useCallback(async (id?: number) => {
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
    }, [closeModal, normalizedSelectedKeys])

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

    const categoryOptions = categories.map((category: any) => ({
        name: category.category_name,
        uid: category.category_name,
    }));

    const filteredItems = React.useMemo(() => {
        let filteredProducts = [...products];

        if (hasSearchFilter) {
            filteredProducts = filteredProducts.filter((product) =>
                product.product_name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }


        if (statusFilter !== "all" && Array.from(statusFilter).length !== categoryOptions.length) {
            const selectedCategories = Array.from(statusFilter);
            filteredProducts = filteredProducts.filter((product: any) =>
                selectedCategories.some((category: any) => product.category.some((c: any) => c.category_name === category))
            );
        }

        return filteredProducts;
    }, [products, hasSearchFilter, filterValue, statusFilter, categoryOptions]);

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
                            <Chip key={category.category_id} radius="full" variant="flat" color="default" size="sm" className="mr-1 mb-1">
                                {category.category_name}
                            </Chip>
                        ))}
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
                        ).format(product.price)}</span>
                    </div>
                );

            case "quantity":
                return (
                    <div className="flex">
                        <span>{new Intl.NumberFormat(
                            "th-TH",
                            {
                                style: "decimal",
                                minimumFractionDigits: 0,
                            }
                        ).format(product.quantity)}</span>
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

                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    startContent={<FilterIcon className="text-small" />}
                                    size="sm"
                                    variant="flat"
                                >
                                    หมวดหมู่สินค้า
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {categoryOptions.map((category: any) => (
                                    <DropdownItem key={category.uid} className="capitalize">
                                        {capitalize(category.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                        <ButtonGroup size="sm" variant="flat" className="bg-background" >
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
                                    {/* <DropdownItem key="size" >ขนาด</DropdownItem>
                                    <DropdownItem key="color">สี</DropdownItem> */}
                                </DropdownMenu>
                            </Dropdown>

                        </ButtonGroup>

                        {/* <Dropdown className="border-1 border-default-200">
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
    }, [filterValue, /* visibleColumns, */ onSearchChange, onRowsPerPageChange, products.length, selectedOption, labelsMap, selectedOptionValue, statusFilter, categoryOptions]);

    

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

            {renderModalAddCategory()}
            {renderModalEditCategory()}
            {renderModalDeleteCategory()}
            {/* {renderModalAddSize()}
            {renderModalEditSize()}
            {renderModalDeleteSize()}
            {renderModalAddColor()}
            {renderModalEditColor()}
            {renderModalDeleteColor()} */}
        </>
    );
}