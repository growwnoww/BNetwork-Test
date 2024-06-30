"use client";
import GalaxySystem from "@/components/clientcomponents/bnsystemClientComp/GalaxySystem";
import GlobalSystem from "@/components/clientcomponents/bnsystemClientComp/GlobalSystem";
import NFTRoyalityDiv from "@/components/clientcomponents/bnsystemClientComp/NFTRoyalityDiv";
import Planetupgradediv from "@/components/clientcomponents/bnsystemClientComp/Planetupgradediv";
import UniverseDiv from "@/components/clientcomponents/bnsystemClientComp/UniverseDiv";
import { WalletContext } from "@/context/WalletContext";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const Page = () => {
    const walletContext = useContext(WalletContext);
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (walletContext?.previewAddress) {
            router.replace(`${pathname}?preview=${walletContext?.previewAddress}`);
            console.log("walletContext?.previewAddress on");
        } else {
            router.replace(`${pathname}`);
            console.log("walletContext?.previewAddress off");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="overflow-y-visible">
            <div>
                <Planetupgradediv />
                <NFTRoyalityDiv />
                <UniverseDiv />
                <GlobalSystem />
                <GalaxySystem />
            </div>
        </div>
    );
};

export default Page;
