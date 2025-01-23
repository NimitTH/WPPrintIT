import { SVGProps } from "react";
import * as z from "zod";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

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


// export type SchemaSize = z.infer<typeof schemaSize>;
// export type SchemaColor = z.infer<typeof schemaColor>;


export type PropsProductId = {
  productId: {
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


export type ItemProduct = {
  id: number;
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  quantity: number;
  stock: number;
  image: string;
  screened_images: string[];
  total_price: number;
};

export type CartProducts = {
  cart_item_id: number;
  screened_image: string;
  screenedimages: {
    screened_image_id: number;
    screened_image_url: string;
  }[];
  additional: string;
  quantity: number;
  total_price: number;
  product: {
    product_id: number;
    product_name: string;
    price: number;
    image: string;
    description: string;
  };
};


export type OrderItems = {
  id: number;
  orderId: number;
  order_id: number;
  order_item_id: number;
  quantity: number;
  productId: number;
  product: {
    product_id: number;
    product_name: string;
    description: string;
    price: number;
    quantity: number;
    stock: number;
    image: string;
  };
  screened_image: string;
  orderscreenedimages: {
    // orderItemId: number;
    screened_image_id: number;
    screened_image_url: string;
  }[];
  additional: string;
  total_price: number;
  status: string;
  cart_item_id: number;
  created_at: string;
  updated_at: string;
}