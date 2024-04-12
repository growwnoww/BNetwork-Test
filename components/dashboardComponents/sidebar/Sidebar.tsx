"use client";
import { menuAtom } from "@/store/atom";
import { MenuList } from "@/utils/MenuList";
import { NestedMenuList } from "@/utils/NestedMenuList";
import { useDisconnect, useWeb3Modal } from "@web3modal/ethers5/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GoSidebarExpand } from "react-icons/go";
import { IoIosLock } from "react-icons/io";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useRecoilState } from "recoil";

const Sidebar = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get("preview");
    const [isOpen, setOpen] = useRecoilState(menuAtom);
    const router = useRouter();
    const { disconnect } = useDisconnect()


    const [menuState, setMenuState] = useState<{
        [id: number]: { isOpen: boolean; isArrowUp: boolean };
    }>({});

    const toggleMenu = (menuId: number) => {
        setMenuState((prev) => {
            const isOpen = !prev[menuId]?.isOpen || false;
            const updatedMenuState = { ...prev };
            updatedMenuState[menuId] = {
                isOpen: isOpen,
                isArrowUp: !prev[menuId]?.isArrowUp,
            };
            return updatedMenuState;
        });
    };

    const handleDisconnectWallet = () => {
        disconnect()
        router.push("/");
    };

    return (
        <div className={` hidden ${isOpen ? "lg:block" : "lg:hidden"} h-full w-72  border-r-[.5px] border-r-stone-700`}>
            <div className="flex items-center justify-between border-b-[.5px] border-b-stone-700 ">
                <div className="flex items-center  h-16 ml-4">
                    <Link href="/dashboard">
                        <Image src="/logo.png" alt="logo" loading="lazy" width={100} height={50} />
                    </Link>
                </div>

                <div className="mr-5 cursor-pointer" onClick={() => setOpen(!isOpen)}>
                    {isOpen ? <GoSidebarExpand className="text-xl" /> : ""}
                </div>
            </div>

            <div className="mt-2 ">
                <ul className="flex flex-col p-3 pl-5 text-stone-400 text-md font-medium">
                    {MenuList.map((menu) => (
                        <li key={menu.id} className=" pb-3  cursor-pointer ">
                            <Link
                                href={query ? `${menu.path}?preview=${query}` : `${menu.path}`}
                                className={`flex items-center ${
                                    pathname == menu.path ? `bg-zinc-800` : "hover:bg-zinc-900 duration-400"
                                } px-2 py-2 rounded-md mr-4 gap-x-3`}
                            >
                                <span className="text-lg">{menu.icon}</span>
                                <p className="">{menu.title}</p>
                                {menu.icon2 ? <span>{menu.icon2}</span> : ""}
                            </Link>
                        </li>
                    ))}

                    {NestedMenuList.map((menu) => (
                        <li key={menu.id} className="pb-3 cursor-pointer">
                            <div
                                onClick={() => toggleMenu(menu.id)}
                                className={`flex items-center px-2 py-2 rounded-md mr-4 gap-x-3 hover:bg-zinc-900 duration-400`}
                            >
                                <span className="text-lg">{menu.icon}</span>
                                <p>{menu.title}</p>

                                <p>{menuState[menu.id]?.isArrowUp ? menu.icon2 : menu.icon1}</p>
                            </div>
                            {menuState[menu.id]?.isOpen && (
                                <ul className="pt-2 pl-4">
                                    {menu.list.map((item, index) => (
                                        <li key={index} className=" pb-2">
                                            <div
                                                className={`flex items-center ${
                                                    pathname == item.path
                                                        ? `bg-zinc-800`
                                                        : "hover:bg-zinc-900 duration-400"
                                                } gap-x-3 py-1`}
                                            >
                                                <span>{item.icon}</span>
                                                <Link href={query ? `${item.path}?preview=${query}` : `${item.path}`}>
                                                    {item.title}
                                                </Link>
                                                <span>{item.lock}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                    <li>
                        <Link
                            href=""
                            className={`flex items-center ${
                                pathname == `/dashboard/updateprofile`
                                    ? `bg-zinc-800`
                                    : "hover:bg-zinc-900 duration-400"
                            } px-2 py-2 rounded-md mr-4 gap-x-3`}
                        >
                            <span>
                                <MdOutlineTipsAndUpdates />
                            </span>
                            <p>Update Profile</p>
                            <IoIosLock />
                        </Link>
                    </li>

                    <li>
                        <div
                            onClick={handleDisconnectWallet}
                            className={`flex items-center cursor-pointer ${
                                pathname == `/dashboard/updateprofile`
                                    ? `bg-zinc-800`
                                    : "hover:bg-zinc-900 duration-400"
                            } px-2 py-2 rounded-md mr-4 gap-x-3`}
                        >
                            <span>
                                <RiLogoutCircleLine />
                            </span>
                            <p>Log out</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
