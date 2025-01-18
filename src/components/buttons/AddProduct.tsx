// "use client";

// import React, { useState, useEffect, useCallback, useMemo, Key } from "react";
// import { useForm, Controller, type SubmitHandler } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import {
//     Alert,
//     Button, ButtonGroup,
//     Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
//     Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
//     Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
//     Input,
//     Pagination,
//     type Selection,
//     SortDescriptor,
//     Select, SelectItem,
//     Avatar,
//     Link
// } from "@heroui/react";

// import { PlusIcon, VerticalDotsIcon, SearchIcon1, ChevronDownIcon, EditIcon, DeleteIcon } from "@/components/Icon";
// import NavBar from "@/components/NavBar";
// import { Icon } from "@iconify/react";

// type Props = {}

// const schema = z.object({
//     name: z.string(),
//     detail: z.string(),
//     size: z.string(),
//     price: z.number()
//         .min(1, { message: "ตั้งราคาต่ำเกิน" })
// });

// type Schema = z.infer<typeof schema>;

// export default function AddProduct({ }: Props) {
//     const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

//     const [isModalAddOpen, setModalAddOpen] = useState(false);
//     const [isModalCategoryOpen, setModalCategoryOpen] = useState(false);
//     const [isModalSizeOpen, setModalSizeOpen] = useState(false);
//     const [isModalColorOpen, setModalColorOpen] = useState(false);

//     const [selectedOption, setSelectedOption] = useState<Selection>(new Set(["add"]));

//     const {
//         control,
//         handleSubmit,
//         setValue,
//         reset,
//         resetField,
//         formState: { errors, isSubmitting },
//     } = useForm<Schema>({
//         resolver: zodResolver(schema),
//     });
//     const [description, setDescription] = useState("")

//     const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
//         try {
//             console.log(data.price);
//             await axios.post("/api/products", { ...data });
//             reset()
//             await fetchProduct()
//             onClose()
//             setIsVisible(true)
//             setDescription("เพิ่มสินค้าสำเร็จ " + data.name + " สำเร็จ")
//             setTimeout(() => {
//                 setIsVisible(false)
//             }, 5000)
//         } catch (error) {
//             console.error(error);
//         }
//     };



//     const labelsMap: any = {
//         add: "เพิ่มสินค้า",
//         category: "เพิ่มหมวดหมู่",
//         size: "เพิ่มขนาด",
//         color: "เพิ่มสี",
//     };

//     const selectedOptionValue = Array.from(selectedOption)[0];

//     const handleDropdownSelection = (key: any) => {
//         if (key === "add") {
//             setModalAddOpen(true);
//         }
//         if (key === "category") {
//             setModalCategoryOpen(true);
//         }
//         if (key === "size") {
//             setModalSizeOpen(true);
//         }
//         if (key === "color") {
//             setModalColorOpen(true);
//         }
//     };

//     const closeModal = () => {
//         setModalAddOpen(false);
//         setModalCategoryOpen(false);
//         setModalSizeOpen(false);
//         setModalColorOpen(false);
//     };

//     return (
//         <>
//             <ButtonGroup color="primary" >
//                 <Button onPress={() => handleDropdownSelection(selectedOptionValue)} startContent={<PlusIcon />}>{labelsMap[selectedOptionValue]}</Button>
//                 <Dropdown placement="bottom-end">
//                     <DropdownTrigger>
//                         <Button isIconOnly>
//                             <ChevronDownIcon />
//                         </Button>
//                     </DropdownTrigger>
//                     <DropdownMenu
//                         disallowEmptySelection
//                         aria-label="Merge options"
//                         selectedKeys={selectedOption}
//                         selectionMode="single"
//                         onSelectionChange={setSelectedOption}
//                     >
//                         <DropdownItem key="add">เพิ่มสินค้า</DropdownItem>
//                         <DropdownItem key="category" >เพิ่มหมวดหมู่สินค้า</DropdownItem>
//                         <DropdownItem key="size" >เพิ่มขนาด</DropdownItem>
//                         <DropdownItem key="color" >เพิ่มสี</DropdownItem>
//                     </DropdownMenu>
//                 </Dropdown>
//             </ButtonGroup>

//             {/* สินค้า */}
//             <Modal
//                 isKeyboardDismissDisabled={true}
//                 isOpen={isModalAddOpen}
//                 onOpenChange={onOpenChange}
//                 onClose={closeModal}
//             >

//                 <ModalContent>
//                     {(onClose) => (
//                         <>
//                             <ModalHeader className="flex flex-col gap-1">เพิ่มสินค้า</ModalHeader>
//                             <form onSubmit={handleSubmit(onSubmit)} >
//                                 <ModalBody className="flex flex-col gap-3">
//                                     {/* <div className="flex flex-col items-center gap-4">
//                                                     <div className="relative group w-40 h-40">
//                                                         <Avatar

//                                                             size="lg"
//                                                             // src={profileImage || ""}
//                                                             alt="Profile Picture"
//                                                             className="border w-full h-full text-large"
//                                                         />
//                                                         <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300    ">
//                                                             <Icon icon="mingcute:pencil-fill" width="24" height="24" className="text-xl text-white"></Icon>
//                                                         </div>
//                                                     </div>
//                                                 </div> */}

//                                     <Controller
//                                         name="name"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <Input
//                                                 {...field}
//                                                 label="ชื่อสินค้า"
//                                                 labelPlacement="outside"
//                                                 placeholder="ตั้งชื่อสินค้าของคุณ"
//                                                 isInvalid={!!errors.name}
//                                                 errorMessage={errors.name?.message}
//                                             />
//                                         )}
//                                     />
//                                     <Controller
//                                         name="detail"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <Input
//                                                 {...field}
//                                                 label="รายละเอียดสินค้า"
//                                                 labelPlacement="outside"
//                                                 placeholder="ตั้งรายละเอียดสินค้าของคุณ"
//                                                 isInvalid={!!errors.detail}
//                                                 errorMessage={errors.detail?.message}
//                                             />
//                                         )}
//                                     />
//                                     <Controller
//                                         name="size"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <Input
//                                                 {...field}
//                                                 label="Size"
//                                                 labelPlacement="outside"
//                                                 placeholder="กรอกขนาดไซด์ของคุณ"
//                                                 isInvalid={!!errors.size}
//                                                 errorMessage={errors.size?.message}
//                                             />
//                                         )}
//                                     />
//                                     <Controller
//                                         name="price"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <Input
//                                                 {...field}
//                                                 type="number"
//                                                 label="ราคา"
//                                                 labelPlacement="outside"
//                                                 placeholder="ตั้งราคาของคุณ"
//                                                 isInvalid={!!errors.price}
//                                                 errorMessage={errors.price?.message}
//                                                 value={field.value !== undefined ? String(field.value) : ""}
//                                                 onChange={(e) => field.onChange(Number(e.target.value))}
//                                             />
//                                         )}
//                                     />
//                                     <Select
//                                         className="max-w-xs"
//                                         label="เลือกขนาด"
//                                         labelPlacement="outside"
//                                         placeholder="ไม่มี ไม่ต้องเลือก"
//                                         selectionMode="multiple"
//                                     >
//                                         <SelectItem>แมว</SelectItem>
//                                         {/* {animals.map((animal) => (
//                                                         <SelectItem key={animal.key}>{animal.label}</SelectItem>
//                                                     ))} */}
//                                     </Select>
//                                 </ModalBody>
//                                 <ModalFooter>
//                                     <Button color="danger" variant="light" onPress={onClose}>
//                                         ปิด
//                                     </Button>
//                                     <Button disabled={isSubmitting} color="primary" type="submit">
//                                         เพิ่มสินค้า
//                                     </Button>
//                                 </ModalFooter>
//                             </form>
//                         </>
//                     )
//                     }
//                 </ModalContent>
//             </Modal>

//             {/* หมวดหมู่สินค้า */}
//             <Modal
//                 isKeyboardDismissDisabled={true}
//                 isOpen={isModalCategoryOpen}
//                 onOpenChange={onOpenChange}
//                 onClose={closeModal}
//             >
//                 <ModalContent>
//                     {(onClose) => (
//                         <>
//                             <ModalHeader className="flex flex-col gap-1">เพิ่มหมวดหมู่สินค้า</ModalHeader>
//                             <form onSubmit={handleSubmit(onSubmit)} >
//                                 <ModalBody className="flex flex-col gap-3">
//                                     <Controller
//                                         name="name"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <Input
//                                                 {...field}
//                                                 label="ชื่อหมวดหมู่"
//                                                 labelPlacement="outside"
//                                                 placeholder="ตั้งชื่อหมวดหมู่"
//                                                 isInvalid={!!errors.name}
//                                                 errorMessage={errors.name?.message}
//                                             />
//                                         )}
//                                     />
//                                 </ModalBody>
//                                 <ModalFooter>
//                                     <Button color="danger" variant="light" onPress={onClose}>
//                                         ปิด
//                                     </Button>
//                                     <Button disabled={isSubmitting} color="primary" type="submit">
//                                         เพิ่มหมวดหมู่สินค้า
//                                     </Button>
//                                 </ModalFooter>
//                             </form>
//                         </>
//                     )
//                     }
//                 </ModalContent>
//             </Modal>

//             {/* ขนาด */}
//             <Modal
//                 isKeyboardDismissDisabled={true}
//                 isOpen={isModalCategoryOpen}
//                 onOpenChange={onOpenChange}
//                 onClose={closeModal}
//             >
//                 <ModalContent>
//                     {(onClose) => (
//                         <>
//                             <ModalHeader className="flex flex-col gap-1">เพิ่มขนาด</ModalHeader>
//                             <form onSubmit={handleSubmit(onSubmit)} >
//                                 <ModalBody className="flex flex-col gap-3">
//                                     <Controller
//                                         name="name"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <Input
//                                                 {...field}
//                                                 label="ขนาดสินค้า"
//                                                 labelPlacement="outside"
//                                                 placeholder="ตั้งขนาดสินค้าของคุณ"
//                                                 isInvalid={!!errors.name}
//                                                 errorMessage={errors.name?.message}
//                                             />
//                                         )}
//                                     />
//                                 </ModalBody>
//                                 <ModalFooter>
//                                     <Button color="danger" variant="light" onPress={onClose}>
//                                         ปิด
//                                     </Button>
//                                     <Button disabled={isSubmitting} color="primary" type="submit">
//                                         เพิ่มขนาด
//                                     </Button>
//                                 </ModalFooter>
//                             </form>
//                         </>
//                     )
//                     }
//                 </ModalContent>
//             </Modal>

//             {/* สี */}
//             <Modal
//                 isKeyboardDismissDisabled={true}
//                 isOpen={isModalCategoryOpen}
//                 onOpenChange={onOpenChange}
//                 onClose={closeModal}
//             >
//                 <ModalContent>
//                     {(onClose) => (
//                         <>
//                             <ModalHeader className="flex flex-col gap-1">เพิ่มสี</ModalHeader>
//                             <form onSubmit={handleSubmit(onSubmit)} >
//                                 <ModalBody className="flex flex-col gap-3">
//                                     <Controller
//                                         name="name"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <Input
//                                                 {...field}
//                                                 label="สี"
//                                                 labelPlacement="outside"
//                                                 placeholder="ตั้งสีของคุณ"
//                                                 isInvalid={!!errors.name}
//                                                 errorMessage={errors.name?.message}
//                                             />
//                                         )}
//                                     />
//                                 </ModalBody>
//                                 <ModalFooter>
//                                     <Button color="danger" variant="light" onPress={onClose}>
//                                         ปิด
//                                     </Button>
//                                     <Button disabled={isSubmitting} color="primary" type="submit">
//                                         เพิ่มสี
//                                     </Button>
//                                 </ModalFooter>
//                             </form>
//                         </>
//                     )
//                     }
//                 </ModalContent>
//             </Modal>
//         </>
//     )
// }