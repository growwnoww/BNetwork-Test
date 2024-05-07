"use client";
import useUserDetails from "@/Hooks/useUserDetails";
import { homeHamaburgerAtom } from "@/store/atom";
import { MenuList } from "@/utils/MenuList";
import { NestedMenuList } from "@/utils/NestedMenuList";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosLock } from "react-icons/io";
import { useRecoilState } from "recoil";
import { Button } from "../ui/button";
import { HomeMenu } from "@/utils/HomeMenu";

const HomeHamaburger = () => {

    const [activeNav, setActiveNav] = useState<String>("#home");
    const isUserRegister = useUserDetails();
    console.log("IS USER REGISTER", isUserRegister);
    
    const router = useRouter(); // Add this line
    const { open } = useWeb3Modal();
    const {  isConnected } = useWeb3ModalAccount();
    const {address} = useWeb3ModalAccount()
    const userAddress = address;
    console.log(address, isConnected);
    const [isOpen,setOpen] = useRecoilState(homeHamaburgerAtom);

   
    const toogleBtn = () => {
      setOpen(!isOpen);
    };
    
    const connectHandler = () =>{
        open();
        setOpen(!isOpen);
    }

    // Add this useEffect
    useEffect(() => {
        if (isUserRegister && userAddress) {
            router.push("/dashboard"); // Redirect user to dashboard if they are registered
        }
    }, [isUserRegister, userAddress, router]);


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
                <div className="absolute top-[80%] left-[1%]   mr-3 px-4 right-[1%] bg-black py-3 my-3  w-full z-50">
                  
                  <div className="flex flex-col gap-y-4 my-2">
                  <div className="px-3  lg:hidden ">
                        {/* <div className="bg-yellow-500 px-3  py-2.5 rounded-md">Connect Wallet</div> */}
                        <button
                            onClick={() => connectHandler()}
                            type="button"
                            className="bg-yellow-500 px-3 w-[100%]  py-1 text-lg font-medium rounded-lg whitespace-nowrap"
                        >
                            {!isConnected
                                ? "Connect Wallet"
                                : `${address?.slice(0, 6)}...${address?.slice(address.length - 6, address.length)}`}
                        </button>
                        
                    </div>

                    
                    <div className=" w-full">
                        {isUserRegister && userAddress ? (
                            ""
                        ) : (
                            <div>
                                <Link href="/registration" onClick={()=>setOpen(!isOpen)}>
                                    <Button className=" bg-zinc-900  text-white border w-[95%] ml-3    py-1 text-lg font-medium rounded-lg border-yellow-500">
                                        Registration
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                  </div>

                    

                    <div className="">
                        <ul className="grid grid-cols-2 gap-2">
                            {HomeMenu.map((item) => (
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
                           
                        </ul>

                    
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};


export default HomeHamaburger


