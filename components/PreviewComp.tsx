"use client";
import React, { useContext } from "react";
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Button } from "./ui/button";
import { WalletContext } from "@/context/WalletContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PreviewComp() {
    const walletContext = useContext(WalletContext);
    const router = useRouter();
    const pathname = usePathname();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const previewAddress = () => {
        try {
            const query = walletContext?.previewAddress;
            if (pathname === "/") {
                router.replace(`/dashboard?preview=${query}`);
            } else {
                router.replace(`${pathname}?preview=${query}`);
            }
        } catch (error) {
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
            <Button onClick={onOpen} className=" bg-zinc-900  text-white border border-yellow-500">
                Preview
            </Button>
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
