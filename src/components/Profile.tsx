"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { profileSchema, ProfileSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
    Avatar, Button, Input, useDisclosure,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { set } from "zod";

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
    } = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
    });

    const handleImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await axios.post("/api/upload", formData);
                if (response.data.success) {
                    console.log("Uploaded image URL:", response.data.url);
                    setProfileImage(response.data.url);
                }
                
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }
    }, [profileImage]);

    // const handleImageDelete = useCallback(async () => {
    //     try {
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [session])
    // console.log(profileImage);

    const onSubmit: SubmitHandler<ProfileSchema> = async (edituser: ProfileSchema) => {
        try {
            const res = await axios.put(`/api/user/${session?.user.id}`, {
                username: edituser.username,
                name: edituser.name,
                email: edituser.email,
                tel: edituser.tel,
                address: edituser.address,
                image: profileImage
            });
            console.log(res);
            
            alert("แก้ไขข้อมูลสำเร็จ");
            router.push("/products");
        } catch (error: any) {
            console.error("Error submitting form:", error.res?.data);
            console.error("Error submitting form:", error.message);
            alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
        }
    };

    useEffect(() => {
        if (session?.user && profileImage === null) {
            setValue("username", session.user.username || "");
            setValue("name", session.user.name || "");
            setValue("tel", session.user.tel || "");
            setValue("email", session.user.email || "");
            setValue("address", session.user.address || "");
            setProfileImage(session.user.image || "");
        }
    }, [session, setValue, profileImage]);

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
                                        {/* <Button
                                            fullWidth
                                            radius="full"
                                            color="danger"
                                            onPress={handleImageDelete}
                                        >
                                            ลบภาพ
                                        </Button> */}
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
};
