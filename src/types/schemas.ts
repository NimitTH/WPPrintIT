import * as z from "zod";

export const signUpSchema = z.object({
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

export const signInSchema = z.object({
    email: z
        .string()
        .min(1, "ต้องมีอีเมล์")
        .email("อีเมล์ไม่ถูกต้อง"),
    password: z
        .string()
        .min(1, "ต้องมีรหัสผ่าน")
        .min(8, "รหัสผ่านต้องมีมากกว่า 8 ตัวอักษร"),
});

export const profileSchema = z.object({
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


export const passwordSchema = z.object({
    password: z
    .string()
    .min(1, "ต้องมีรหัสผ่าน")
    .min(8, "รหัสผ่านต้องมีความยาว 8 ตัวขึ้นไป"),
    newpassword: z
        .string()
        .min(1, "ต้องมีรหัสผ่าน")
        .min(8, "รหัสผ่านต้องมีความยาว 8 ตัวขึ้นไป"),
    });
    
    
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

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type ProfileSchema = z.infer<typeof profileSchema>;
export type PasswordSchema = z.infer<typeof passwordSchema>;
export type SchemaCategory = z.infer<typeof schemaCategory>;
export type SchemaProduct = z.infer<typeof schemaProduct>;