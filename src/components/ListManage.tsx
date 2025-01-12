import { Listbox, ListboxItem, cn } from "@nextui-org/react";
import Link from "next/link";
import { IconSvgProps } from "./OrderList";
import { CopyDocumentIcon } from "./Icon";
import { EditDocumentIcon } from "./Icon";

export const AddNoteIcon = (props: IconSvgProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M7.37 22h9.25a4.87 4.87 0 0 0 4.87-4.87V8.37a4.87 4.87 0 0 0-4.87-4.87H7.37A4.87 4.87 0 0 0 2.5 8.37v8.75c0 2.7 2.18 4.88 4.87 4.88Z"
                fill="currentColor"
                opacity={0.4}
            />
            <path
                d="M8.29 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM15.71 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM12 14.75h-1.69V13c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.75H7c-.41 0-.75.34-.75.75s.34.75.75.75h1.81V18c0 .41.34.75.75.75s.75-.34.75-.75v-1.75H12c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z"
                fill="currentColor"
            />
        </svg>
    );
};





export const DeleteDocumentIcon = (props: IconSvgProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
                fill="currentColor"
            />
            <path
                d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
                fill="currentColor"
                opacity={0.399}
            />
            <path
                clipRule="evenodd"
                d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full max-w-fit mr-5 border-small px-1 py-2 rounded-none border-none dark:border-default-100">
        {children}
    </div>
);

export default function App() {
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
                    description="จัดการออร์เดอร์ทั้งหมด!"
                    startContent={<EditDocumentIcon className={iconClasses} />}
                >
                    จัดการออร์เดอร์
                </ListboxItem>
            </Listbox>
        </ListboxWrapper>
    );
}
