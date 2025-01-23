"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
    Avatar, Badge, Button, Input, User, useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import Navbar from '@/components/NavBar'

const schema = z.object({
    password: z
        .string()
        .min(1, "ต้องมีรหัสผ่าน")
        .min(8, "รหัสผ่านต้องมีความยาว 8 ตัวขึ้นไป"),
    newpassword: z
        .string()
        .min(1, "ต้องมีรหัสผ่าน")
        .min(8, "รหัสผ่านต้องมีความยาว 8 ตัวขึ้นไป"),
});

type Schema = z.infer<typeof schema>;

export default function Page() {
    const { data: session } = useSession();
    
    const router = useRouter();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
        try {
            console.log("Session ID:", session?.user?.id); // ตรวจสอบว่ามี ID ถูกส่งไป
            const response = await axios.put(
                "/api/user/password",
                { id: session?.user?.id, password: data.password, newpassword: data.newpassword },
                {
                    headers: {
                        "Content-Type": "application/json", // เพิ่ม Content-Type Header
                        Authorization: `Bearer ${session?.user?.id}`,
                    },
                }
            );

            console.log(response.data);

            if (response.data.password) {
                alert("แก้ไขรหัสผ่านสำเร็จ");
                router.push("/products");
            }

        } catch (error: any) {
            console.error(error);

            // ตรวจสอบว่ามีการตอบกลับจากเซิร์ฟเวอร์
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.error || "เกิดข้อผิดพลาด";

                if (status === 401) {
                    alert("รหัสผ่านเดิมไม่ถูกต้อง");
                } else if (status === 404) {
                    alert("ไม่พบผู้ใช้งาน");
                } else {
                    alert(message);
                }
            } else {
                alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
            }

        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex h-full w-full items-center justify-center mt-3">
                <div className="flex w-full max-w-lg flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
                    <p className="pb-2 text-xl font-medium">เปลี่ยนรหัสผ่าน</p>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="รหัสผ่านเดิม"
                                    labelPlacement="outside"
                                    placeholder="กรอกรหัสผ่านเดิมของคุณ"
                                    maxLength={10}
                                    isInvalid={!!errors.password}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Controller
                            name="newpassword"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="รหัสผ่านใหม่"
                                    labelPlacement="outside"
                                    placeholder="กรอกรหัสผ่านใหม่ของคุณ"
                                    maxLength={10}
                                    isInvalid={!!errors.newpassword}
                                    errorMessage={errors.newpassword?.message}
                                />
                            )}
                        />


                        <Button disabled={isSubmitting} color="primary" type="submit">
                            บันทีก
                        </Button>
                    </form>
                </div>
            </div>
        </div>

    )
}