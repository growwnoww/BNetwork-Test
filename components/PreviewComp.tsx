"use client";
import React, { useContext } from "react";
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Button } from "./ui/button";
import { WalletContext } from "@/context/WalletContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { PlanetUpgrade_Address } from "@/contract/Web3_Instance";
import { ethers } from "ethers";
import BNetworkABI from "@/contract/BNetwork_ABI.json";

export default function PreviewComp() {
    const walletContext = useContext(WalletContext);
    const router = useRouter();
    const pathname = usePathname();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { walletProvider } = useWeb3ModalProvider();

    const B_Network_Address = PlanetUpgrade_Address;

    const previewAddress = async () => {
        try {
            // const provider = new ethers.providers.Web3Provider(walletProvider as any);
            // const signer = provider.getSigner();
            // const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);
            ethers.utils.getAddress(walletContext?.previewAddress);

            const query = walletContext?.previewAddress;
            console.log("🚀 ~ previewAddress ~ query:", query);
            // const exists = await BNetworkContract.isUserExists(query);
            if (query) {
                if (pathname === "/" || pathname === "/registration") {
                    router.replace(`/dashboard?preview=${query}`);
                } else {
                    router.replace(`${pathname}?preview=${query}`);
                }
            } else {
                walletContext?.setPreviewAddress("");
                return;
            }
        } catch (error) {
            walletContext?.setPreviewAddress("");
            console.log(error);
        }
    };

    const removePreviewAddress = () => {
        try {
            walletContext?.setPreviewAddress("");
            router.replace(`${pathname}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button
                onClick={onOpen}
                className="  bg-zinc-900  text-white border w-[95%]     py-1 text-[15px] font-medium rounded-lg border-yellow-500 px-[150px] lg:px-5 lg:py-[9px]"
            >
                Preview
            </button>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className="bg-black"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Preview Address</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Address"
                                    placeholder="Enter a wallet address"
                                    variant="bordered"
                                    value={walletContext?.previewAddress}
                                    onChange={(e) => walletContext?.setPreviewAddress(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className="bg-[#FF0000]"
                                    onClick={() => {
                                        removePreviewAddress();
                                        onClose();
                                    }}
                                >
                                    remove
                                </Button>
                                <Button
                                    className="bg-[#008000]"
                                    onClick={() => {
                                        previewAddress();
                                        onClose();
                                    }}
                                >
                                    Preview
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
