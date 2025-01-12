import { SVGProps } from "react";
import { z } from "zod";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export const schemaCategory = z.object({
  name: z.string({
    required_error: "ใส่ชื่อหมวดหมู่ดิ",
  })
    .min(1, "ชื่อหมวดหมู่ต้องมากกว่า 1 อักษร")
    .max(20, "หมวดหมู่อะไรยาวขนาดนั้น")
});

export const schemaSize = z.object({
  name: z.string({
    required_error: "ใส่ชื่อหมวดหมู่ดิ",
  })
    .min(1, "ชื่อหมวดหมู่ต้องมากกว่า 1 อักษร")
    .max(20, "หมวดหมู่อะไรยาวขนาดนั้น")
});

export const schemaColor = z.object({
  name: z.string({
    required_error: "ใส่ชื่อหมวดหมู่ดิ",
  })
    .min(1, "ชื่อหมวดหมู่ต้องมากกว่า 1 อักษร")
    .max(20, "หมวดหมู่อะไรยาวขนาดนั้น")
});

export const schemaProduct = z.object({
  product_name: z.string()
    .max(100, "ชื่อสินค้าต้องไม่เกิน 100 ตัวอักษร"),
  description: z.string()
    .max(100, "คำอธิบายต้องไม่เกิน 100 ตัวอักษร"),
  categories: z.string().array().optional(),
  price: z.number()
    .min(1, "ตั้งราคาต่ำเกิน"),
  stock: z.number()
});

export type SchemaProduct = z.infer<typeof schemaProduct>;
export type SchemaCategory = z.infer<typeof schemaCategory>;
export type SchemaSize = z.infer<typeof schemaSize>;
export type SchemaColor = z.infer<typeof schemaColor>;