import { SVGProps } from "react";
import * as z from "zod";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const schemaCategory = z.object({
  category_id: z.string({
    required_error: "ใส่ชื่อหมวดหมู่ดิ",
  }).optional(),
  category_name: z.string({
    required_error: "ใส่ชื่อหมวดหมู่ดิ",
  })
    .min(1, "ชื่อหมวดหมู่ต้องมากกว่า 1 อักษร")
    .max(20, "หมวดหมู่อะไรยาวขนาดนั้น"),
  categories: z.array(z.object({
    category_id: z.string().optional(),
    category_name: z.string().optional(),
  })).optional(),
});



// export const schemaCategoryArray = z.array(schemaCategory);

// export const schemaSize = z.object({
//   name: z.string({
//     required_error: "ใส่ชื่อหมวดหมู่ดิ",
//   })
//     .min(1, "ชื่อหมวดหมู่ต้องมากกว่า 1 อักษร")
//     .max(20, "หมวดหมู่อะไรยาวขนาดนั้น")
// });

// export const schemaColor = z.object({
//   name: z.string({
//     required_error: "ใส่ชื่อหมวดหมู่ดิ",
//   })
//     .min(1, "ชื่อหมวดหมู่ต้องมากกว่า 1 อักษร")
//     .max(20, "หมวดหมู่อะไรยาวขนาดนั้น")
// });

export const schemaProduct = z.object({
  product_name: z.string()
    .max(100, "ชื่อสินค้าต้องไม่เกิน 100 ตัวอักษร"),
  description: z.string()
    .max(100, "คำอธิบายต้องไม่เกิน 100 ตัวอักษร"),
  category: z.string().array().optional(),
  price: z.number()
    .min(1, "ตั้งราคาต่ำเกิน"),
  stock: z.number()
});

export type SchemaProduct = z.infer<typeof schemaProduct>;
export type SchemaCategory = z.infer<typeof schemaCategory>;
// export type SchemaSize = z.infer<typeof schemaSize>;
// export type SchemaColor = z.infer<typeof schemaColor>;


export type Props = {
  productid: {
      id: string
  }
}

export const schema = z.object({
    id: z.number(),
    username: z.string().min(1, "ต้องมีชื่อผู้ใช้").max(100),
    name: z.string().max(100),
    tel: z
        .string()
        .min(1, "ต้องมีเบอร์")
        .min(10, "เบอร์ต้องมีความยาว 10 ตัวขึ้นไป"),
    email: z.string().min(1, "ต้องมีอีเมล์").email("อีเมล์ไม่ถูกต้อง"),
    address: z.string().max(100),
});

export type Schema = z.infer<typeof schema>;