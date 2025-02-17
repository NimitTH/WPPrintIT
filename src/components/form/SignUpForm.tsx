"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { signUpSchema, type SignUpSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
    Divider,
    Avatar,
    Button,
    Input,
    Link,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export default function SignUpForm() {
    const router = useRouter();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await axios.post("/api/upload", formData);
                if (response.data.success) {
                    setProfileImage(response.data.url);
                }
                console.log(profileImage);

            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    const onsubmit: SubmitHandler<SignUpSchema> = async (data: SignUpSchema) => {
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
                alert("มีอีเมล์อยู่แล้ว")
            } else {
                router.push("/products");
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                            <div onClick={onOpen} className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Icon icon="mingcute:pencil-fill" width="24" height="24" className="text-xl text-white" />
                            </div>
                        </div>
                        <Modal
                            placement="center"
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}>
                            <ModalContent>
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
                        {...register("password")}
                        label="รหัสผ่าน"
                        name="password"
                        placeholder="กรอกรหัสผ่านของคุณ"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
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
                        onPress={() => signIn("google", { callbackUrl: "/products" })}
                        variant="bordered"
                        startContent={<Icon icon="flat-color-icons:google" width={24} />}
                    >
                        ลงทะเบียนด้วย Google
                    </Button>
                    <Button
                        onPress={() => signIn("facebook", { callbackUrl: "/products" })}
                        type="submit"
                        variant="bordered"
                        startContent={
                            <Icon
                                className="text-default-500"
                                icon="logos:facebook"
                                width={24}
                            />
                        }
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
};
