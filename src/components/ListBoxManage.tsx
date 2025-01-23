import React from "react";
import Link from "next/link";
import { Listbox, ListboxItem } from "@heroui/react";
import { EditDocumentIcon, AddNoteIcon, CopyDocumentIcon } from "./Icon";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full max-w-fit mr-5 border-small px-1 py-2 rounded-none border-none dark:border-default-100">
        {children}
    </div>
);

export default function ListBoxManage() {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    return (
        <ListboxWrapper>
            <Listbox aria-label="Listbox menu with descriptions" variant="flat">
                <ListboxItem
                    showDivider
                    key="new"
                    as={Link}
                    href="/admin/user"
                    description="จัดการผู้ใช้งานทั้งหมด!"
                    startContent={<AddNoteIcon className={iconClasses} />}
                >
                    จัดการผู้ใช้งาน
                </ListboxItem>
                <ListboxItem
                    key="manage-products"
                    as={Link}
                    href="/admin/product"
                    description="จัดการสินค้าสินค้าทั้งหมด!"
                    startContent={<CopyDocumentIcon className={iconClasses} />}
                >
                    จัดการสินค้า
                </ListboxItem>
                <ListboxItem
                    key="manage-orders"
                    showDivider
                    as={Link}
                    href="/admin/order"
                    description="จัดการออเดอร์ทั้งหมด!"
                    startContent={<EditDocumentIcon className={iconClasses} />}
                >
                    จัดการออเดอร์
                </ListboxItem>
            </Listbox>
        </ListboxWrapper>
    );
}
