"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
    Avatar,
    Button,
    Input,
    Checkbox,
    Link,
    Divider,
    Modal,
    useDisclosure,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/react";
import { Icon } from "@iconify/react";

const schema = z.object({
    username: z.string().min(1, "ต้องมีชื่อผู้ใช้").max(100),
    name: z.string().max(100),
    tel: z
        .string()
        .min(1, "ต้องมีเบอร์โทร")
        .min(10, "ต้องมีความยาว 10 ตัวขึ้นไป"),
    email: z.string().min(1, "ต้องมีอีเมล์").email("อีเมล์ไม่ถูกต้อง"),
    password: z
        .string()
        .min(1, "ต้องมีรหัสผ่าน")
        .min(8, "รหัสผ่านต้องมีมากกว่า 8 ตัวอักษร"),
    address: z.string().max(100),
});

type Schema = z.infer<typeof schema>;

export default function SignUpForm() {
    const router = useRouter();
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
    } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        console.log(file);


        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await axios.post("/api/upload", formData);
                if (response.data.success) {
                    setProfileImage(response.data.url);
                }
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }
    };

    const onsubmit: SubmitHandler<Schema> = async (data: Schema) => {
        try {
            console.log(data);

            await axios.post("/api/signup", { ...data, image: profileImage });

            const user: any = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (user.error) {
                console.error(user.error);
            } else {
                router.push("/home");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
                <p className="pb-2 text-xl font-medium">ลงทะเบียน</p>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit(onsubmit)}>
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group w-40 h-40">
                            <Avatar
                                key={profileImage}
                                size="lg"
                                src={profileImage || ""}
                                alt="Profile Picture"
                                className="border w-full h-full text-large"
                            />
                            <div onClick={onOpen} className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300    ">
                                {/* <span className="text-white text-xl">✏️</span> */}
                                <Icon icon="mingcute:pencil-fill" width="24" height="24" className="text-xl text-white"></Icon>
                            </div>
                        </div>
                        <Modal
                            backdrop="blur"
                            placement="center"
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1 text-xl font-medium">
                                            เลือกภาพ
                                        </ModalHeader>
                                        <ModalBody className="w-2xl h-2xl mx-auto">
                                            <Avatar
                                                key={profileImage}
                                                onClick={onOpen}
                                                src={profileImage || ""}
                                                alt="Profile Picture"
                                                size="lg"
                                                className="border w-60 h-60 text-large"
                                            />
                                        </ModalBody>
                                        <ModalFooter className=" flex justify-center">

                                            <Input
                                                onChange={handleImageChange}
                                                // accept="image/*"
                                                radius="full"
                                                type="file"
                                                fullWidth
                                            >
                                                เพิ่มภาพ
                                            </Input>
                                            <Button
                                                fullWidth
                                                radius="full"
                                                color="danger"
                                                onPress={() => setProfileImage("")}
                                            >
                                                ลบภาพ
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                    <Input
                        {...register("username")}
                        label="Username"
                        name="username"
                        placeholder="กรอกชื่อผู้ใช้ของคุณ"
                        type="text"
                        variant="bordered"
                        isClearable
                        isInvalid={!!errors.username}
                        errorMessage={errors.username?.message}
                    />
                    <Input
                        {...register("name")}
                        label="ชื่อ"
                        name="name"
                        placeholder="กรอกชื่อของคุณ"
                        type="text"
                        variant="bordered"
                        isClearable
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                    />

                    <Input
                        {...register("tel")}
                        label="เบอร์โทร"
                        name="tel"
                        placeholder="กรอกเบอร์ของคุณ"
                        type="tel"
                        variant="bordered"
                        isClearable
                        isInvalid={!!errors.tel}
                        errorMessage={errors.tel?.message}
                        maxLength={10}
                    />

                    <Input
                        {...register("email")}
                        label="อีเมล์"
                        name="email"
                        placeholder="กรอกอีเมล์ของคุณ"
                        type="email"
                        variant="bordered"
                        isClearable
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                    />

                    <Input
                        endContent={
                            <button type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <Icon
                                        className="pointer-events-none text-2xl text-default-400"
                                        icon="solar:eye-closed-linear"
                                    />
                                ) : (
                                    <Icon
                                        className="pointer-events-none text-2xl text-default-400"
                                        icon="solar:eye-bold"
                                    />
                                )}
                            </button>
                        }
                        {...register("password")}
                        label="รหัสผ่าน"
                        name="password"
                        placeholder="กรอกรหัสผ่านของคุณ"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                    />

                    <Input
                        {...register("address")}
                        label="ที่อยู่"
                        name="address"
                        placeholder="กรอกที่อยู่ของคุณ"
                        type="text"
                        variant="bordered"
                        isClearable
                        isInvalid={!!errors.address}
                        errorMessage={errors.address?.message}
                    />

                    <Button disabled={isSubmitting} color="primary" type="submit">
                        ลงทะเบียน
                    </Button>
                </form>

                <div className="flex items-center gap-4 py-2">
                    <Divider className="flex-1" />
                    <p className="shrink-0 text-tiny text-default-500">หรือ</p>
                    <Divider className="flex-1" />
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        onClick={() => signIn("google")}
                        startContent={<Icon icon="flat-color-icons:google" width={24} />}
                        variant="bordered"
                    >
                        ลงทะเบียนด้วย Google
                    </Button>
                    <Button
                        startContent={
                            <Icon
                                className="text-default-500"
                                icon="logos:facebook"
                                width={24}
                            />
                        }
                        type="submit"
                        variant="bordered"
                    >
                        ลงทะเบียนด้วย Facebook
                    </Button>
                </div>
                <p className="text-center text-small">
                    มีบัญชีแล้วใช่ไหม?&nbsp;
                    <Link showAnchorIcon href="/signin" size="sm" underline="focus">
                        เข้าสู่ระบบ
                    </Link>
                </p>
            </div>
        </div>
    );
}
