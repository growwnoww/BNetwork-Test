"use client";
import CurrentBalanceComp from "@/components/clientcomponents/CurrentBalanceComp";
import { hamaburgerAtom } from "@/store/atom";
import { MenuList } from "@/utils/MenuList";
import { NestedMenuList } from "@/utils/NestedMenuList";
import { useWeb3Modal } from "@web3modal/ethers5/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosLock } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useRecoilState } from "recoil";

const HamaburgerMenu = () => {
    const [isOpen, setOpen] = useRecoilState(hamaburgerAtom);
    const pathname = usePathname();
    const router = useRouter();
    const { open } = useWeb3Modal();

    const handleDisconnectWallet = () => {
        open();
        setOpen(!isOpen);
        router.push("/");
    };

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

    return (
        <>
            {isOpen ? (
                <div className="absolute top-[100%] left-[1%]  mr-3 px-4 right-[1%] bg-black py-3 my-3  w-full z-50">
                    <div>
                        <CurrentBalanceComp />
                    </div>

                    <div className="flex items-center gap-x-3 my-4">
                        <div className="w-full flex items-center justify-center">
                            <div
                                onClick={handleDisconnectWallet}
                                className={`bg-yellow-500 flex  items-center py-2 px-24 rounded-md`}
                            >
                                <p className="font-semibold">Log out</p>
                                <span>
                                    <RiLogoutCircleLine />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <ul className="grid grid-cols-2 gap-2">
                            {MenuList.map((item) => (
                                <li
                                    onClick={() => setOpen(!isOpen)}
                                    key={item.id}
                                    className="bg-stone-800 rounded-md  flex items-center justify-center"
                                >
                                    <Link href={item.path} className=" py-2">
                                        {item.title}
                                    </Link>
                                    <p>{item.icon2}</p>
                                </li>
                            ))}
                            <li className="bg-stone-800 rounded-md">
                                <Link
                                    href="/dashboard/updateprofile"
                                    className={`flex items-center justify-center  px-2 py-2 rounded-md mr-4 gap-x-3`}
                                >
                                    <p>Update Profile</p>
                                    <IoIosLock />
                                </Link>
                            </li>
                        </ul>

                        <ul className="grid grid-cols-1 gap-2 place-items-center mt-2">
                            {NestedMenuList.map((item) => (
                                <li key={item.id} className=" w-full py-2  bg-stone-800 rounded-md ">
                                    <div
                                        onClick={() => toggleMenu(item.id)}
                                        className=" flex items-center justify-between px-4  "
                                    >
                                        <p>{item.title}</p>
                                        <p>{menuState[item.id]?.isArrowUp ? item.icon2 : item.icon1}</p>
                                    </div>

                                    {menuState[item.id]?.isOpen && (
                                        <ul>
                                            {item.list.map((menu, index) => (
                                                <li key={index} onClick={() => setOpen(!isOpen)} className="ml-5 py-2">
                                                    <Link href={menu.path} className="flex items-center">
                                                        <span>{menu.icon}</span>
                                                        <span>{menu.title}</span>
                                                        <span>{menu.lock}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default HamaburgerMenu;
