"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import * as z from "zod";
// import { schema, Schema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
    Avatar, Button, Input, useDisclosure,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export const schema1 = z.object({
    username: z.string().min(1, "ต้องมีชื่อผู้ใช้").max(100),
    name: z.string().max(100),
    tel: z
        .string()
        .min(1, "ต้องมีเบอร์")
        .min(10, "เบอร์ต้องมีความยาว 10 ตัวขึ้นไป"),
    email: z.string().min(1, "ต้องมีอีเมล์").email("อีเมล์ไม่ถูกต้อง"),
    address: z.string().max(100),
    image: z.string().optional(),
});

export type Schema1 = z.infer<typeof schema1>;

export default function Profile() {
    const { data: session } = useSession();
    const router = useRouter();

    const [profileImage, setProfileImage] = useState<string | null>(null);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<Schema1>({
        resolver: zodResolver(schema1),
    });

    useEffect(() => {
        if (session?.user) {
            setValue("username", session.user.username || "");
            setValue("name", session.user.name || "");
            setValue("tel", session.user.tel || "");
            setValue("email", session.user.email || "");
            setValue("address", session.user.address || "");
            setProfileImage(session.user.image || "");
        }

    }, [session, setValue, profileImage]);

    const handleImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);

        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await axios.post("/api/upload", formData);
                if (response.data.success) {
                    console.log("Uploaded image URL:", response.data.url);
                    setProfileImage(response.data.url);
                }
                console.log(profileImage);
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }
    }, [profileImage]);

    const handleImageDelete = useCallback(async () => {
        try {
            console.log(session?.user.id);
            await axios.delete("/api/upload", session?.user.id)
        } catch (error) {
            console.log(error);
        }
    }, [session])

    const onSubmit: SubmitHandler<Schema1> = async (edituser: Schema1) => {
        try {
            console.log(edituser);

            const res = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...edituser, image: profileImage, id: session?.user.id }),
            }).then((res) => res.json());
            // const res = await axios.put(`/api/user`, { ...edituser, image: profileImage, id: session?.user.id });

            console.log(res.user);
            alert("แก้ไขข้อมูลสำเร็จ");
            router.push("/products");
        } catch (error: any) {
            console.error("Error submitting form:", error.response?.data);
            console.error("Error submitting form:", error.message);
            alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
        }
    };

    return (
        <div>
            <div className="flex h-full w-full items-center justify-center mt-3">
                <div className="flex w-full max-w-lg flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
                    <p className="pb-2 text-xl font-medium">แก้ไขข้อมูล</p>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                                    <Icon icon="mingcute:pencil-fill" width="24" height="24" className="text-xl text-white"></Icon>
                                </div>
                            </div>
                            <Modal
                                backdrop="blur"
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
                                            onPress={handleImageDelete}
                                        >
                                            ลบภาพ
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
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
                        {session?.user.role == "USER" && (
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
                        )}
                        <Button disabled={isSubmitting} color="primary" type="submit">
                            บันทีก
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
