"use client";
import { MenuList } from "@/utils/MenuList";
import { NestedMenuList } from "@/utils/NestedMenuList";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

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
            <div className="text-zinc-300">
                {topLevelTitle && <span className="text-xl">{topLevelTitle}</span>}
                {outerTitle && <span className="text-xl">{outerTitle}</span>}

                {
                    nestedTitle &&
                    <>
                        <span className="text-sm"> - </span>
                        <span className="text-md text-yellow-400">{nestedTitle}</span>
                    </>

                }
            </div>
        </>
    );
};

export default CurrentRouteHeading;
