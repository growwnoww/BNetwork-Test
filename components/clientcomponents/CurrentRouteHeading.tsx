"use client";
import { MenuList } from "@/utils/MenuList";
import { NestedMenuList } from "@/utils/NestedMenuList";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { IoIosArrowForward } from "react-icons/io";

const CurrentRouteHeading = () => {
    const pathname = usePathname();

    const findTitle = (menuList: any) => {
        const currentRoute = menuList.find((item: any) => item.path === pathname);
        return currentRoute ? currentRoute.title : null;
    };

    const topLevelTitle = useMemo(() => findTitle(MenuList), [pathname]);

    const { outerTitle, nestedTitle } = useMemo(() => {
        const nestedMenu = NestedMenuList.find((item) =>
            item.list.some((nestedItem) => nestedItem.path === pathname)
        );

        const outerTitle = nestedMenu ? nestedMenu.title : null;

        const nestedTitle = nestedMenu
            ? nestedMenu.list.find((nestedItem) => nestedItem.path === pathname)
                ?.title
            : null;

        return { outerTitle, nestedTitle };
    }, [pathname]);

    const heading = useMemo(
        () => (nestedTitle ? `${outerTitle} - ${nestedTitle}` : topLevelTitle),
        [topLevelTitle, nestedTitle, outerTitle]
    );


    return (
        <>
            <div className="text-zinc-300 flex items-center justify-center">
                {topLevelTitle && <span className="text-sm lg:text-xl">{topLevelTitle}</span>}
                {outerTitle && <span className="text-sm lg:text-xl">{outerTitle}</span>}

                {
                    nestedTitle &&
                    <>
                        <span className="text-sm"> <IoIosArrowForward /> </span>
                        <span className="text-[12px] mt-0.5 lg:text-lg text-yellow-400">{nestedTitle}</span>
                    </>

                }
            </div>
        </>
    );
};

export default CurrentRouteHeading;
