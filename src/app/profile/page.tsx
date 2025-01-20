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
import NavBar from "@/components/NavBar";

const schema = z.object({
  username: z.string().min(1, "ต้องมีชื่อผู้ใช้").max(100),
  name: z.string().max(100),
  tel: z
    .string()
    .min(1, "ต้องมีเบอร์")
    .min(10, "เบอร์ต้องมีความยาว 10 ตัวขึ้นไป"),
  email: z.string().min(1, "ต้องมีอีเมล์").email("อีเมล์ไม่ถูกต้อง"),
  address: z.string().max(100),
});

type Schema = z.infer<typeof schema>;

export default function SignUpForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  // const [imageFile, setImageFile] = useState<File | null>("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

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
  };

  const handleImageDelete = async () => {
    try {
      console.log(session?.user.id);

      await axios.delete("/api/upload", session?.user.id)
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
    try {
      console.log(data);
      await axios.put("/api/user", { ...data, image: profileImage });

    } catch (error) {
      console.error(error);
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
      console.log(session.user.image);
      console.log("Profile image updated:", profileImage);
    }

  }, [session, setValue, profileImage]);

  return (
    <div>
      <NavBar />
      <div className="flex h-full w-full items-center justify-center mt-3">
        <div className="flex w-full max-w-lg flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
          <p className="pb-2 text-xl font-medium">แก้ไข้ข้อมูล</p>
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
                          onPress={handleImageDelete}
                        >
                          ลบภาพ
                        </Button>
                      </ModalFooter>
                    </>
                  )}
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
