"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema, type SignInSchema } from "@/types/schemas";
import { Button, Input, Link, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function SignUpForm() {
    const { data: session } = useSession();
    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit: SubmitHandler<SignInSchema> = async (data: SignInSchema) => {
        try {
            const user: any = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password
            });

            if (user.error) {
                console.error(user.error)
                alert("อีเมล์หรือรหัสไม่ถูกต้อง")
            } else {
                router.push('/products')
            }
            if (session) {
                router.push("/products");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
                <p className="pb-2 text-xl font-medium">เข้าสู่ระบบ</p>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register("email")}
                        label="อีเมล์"
                        placeholder="กรอกอีเมล์ของคุณ"
                        variant="bordered"
                        isClearable
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                        name="email"
                        type="email"
                    />
                    <Input
                        {...register("password")}
                        label="รหัสผ่าน"
                        name="password"
                        placeholder="กรอกรหัสผ่านของคุณ"
                        type={isVisible ? "text" : "password"}
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                        variant="bordered"
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
                    <Button disabled={isSubmitting} color="primary" type="submit">
                        เข้าสู่ระบบ
                    </Button>
                </form>

                <div className="flex items-center gap-4 py-2">
                    <Divider className="flex-1" />
                    <p className="shrink-0 text-tiny text-default-500">หรือ</p>
                    <Divider className="flex-1" />
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        onPress={() => signIn('google', { callbackUrl: "/products" })}
                        variant="bordered"
                        startContent={<Icon icon="flat-color-icons:google" width={24} />}
                    >
                        เข้าสู่ระบบด้วย Google
                    </Button>
                    <Button
                        onPress={() => signIn('facebook', { callbackUrl: "/products" })}
                        type="submit"
                        variant="bordered"
                        startContent={<Icon className="text-default-500" icon="logos:facebook" width={24} />}
                    >
                        เข้าสู่ระบบด้วย Facebook
                    </Button>
                </div>
                <p className="text-center text-small">
                    ยังไม่มีบัญชีแล้วใช่ไหม?&nbsp;
                    <Link showAnchorIcon href="/signup" size="sm" underline="focus">
                        ลงทะเบียน
                    </Link>
                </p>
            </div>
        </div>
    );
};
