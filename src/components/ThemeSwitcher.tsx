"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { Icon } from "@iconify/react";
import { SunFilledIcon, MoonFilledIcon } from '@/components/Icon'

export interface ThemeSwitchProps {
    className?: string;
    classNames?: SwitchProps["classNames"];
    type?: number
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
    className,
    classNames,
    type
}) => {
    const { theme, setTheme } = useTheme();
    const isSSR = useIsSSR();

    const onChange = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    const {
        Component,
        slots,
        isSelected,
        getBaseProps,
        getInputProps,
        getWrapperProps,
    } = useSwitch({
        isSelected: theme === "light" || isSSR,
        "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`, onChange,
    });

    return (
        <Component
            {...getBaseProps({
                className: clsx(
                    "px-px transition-opacity hover:opacity-80 cursor-pointer",
                    className,
                    classNames?.base,
                ),
            })}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <div
                {...getWrapperProps()}
                className={slots.wrapper({
                    class: clsx(
                        [
                            "w-auto h-auto",
                            "bg-transparent",
                            "rounded-lg",
                            "flex items-center justify-center",
                            "group-data-[selected=true]:bg-transparent",
                            "!text-default-500",
                            "pt-px",
                            "px-0",
                            "mx-0",
                        ],
                        classNames?.wrapper,
                    ),
                })}
            >
                {!isSelected || isSSR ? (
                    // <Icon icon="solar:sun-bold" width={24} height={24}  />
                    <>

                        {type == 1 ? (
                            <div className="flex gap-2 mt-4">
                                <SunFilledIcon size={24} />
                                <p className="text-medium text-white">เข้าสู่โลกมืด</p>
                            </div>

                        ) : (
                            <SunFilledIcon size={24} />
                        )}
                    </>
                ) : (
                    // <Icon icon="solar:moon-bold" width={24} height={24} />
                    <>
                        {type == 1 ? (
                            <div className="flex gap-2 mt-4">
                                <MoonFilledIcon size={24} />
                                <p className="text-medium text-black">เข้าสู่ด้านสว่าง</p>
                            </div>

                        ) : (
                            <MoonFilledIcon size={24} />
                        )}



                    </>
                )}

            </div>
        </Component>
    );
};
