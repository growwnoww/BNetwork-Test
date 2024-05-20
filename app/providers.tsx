"use client";

import { WalletContext, WalletProvider } from "@/context/WalletContext";
import { NextUIProvider } from "@nextui-org/react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "9d8144e157054d061c1c58a856ba0669";

// 2. Set chains
const bscMa = {
    chainId: 56,
    name: "BSC",
    currency: "BNB",
    explorerUrl: "https://bscscan.com",
    rpcUrl: "https://bsc-dataseed4.ninicoin.io/",
};

// const tbsc = {
//     chainId: 97,
//     name: "TBSC",
//     currency: "BNB",
//     explorerUrl: "https://testnet.bscscan.com/",
//     rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
// };

// 3. Create modal
const metadata = {
    name: "BNetwork",
    description: "BNetwork",
    url: "https://www.bnetwork.space/", // origin must match your domain & subdomain
    icons: ["https://www.bnetwork.space/BELIEVE-LOGO-07.png"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: "...", // used for the Coinbase SDK
    defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
    ethersConfig,
    chains: [bscMa],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
});

export function Providers({ children }: { children: React.ReactNode }) {
    const walletContext = React.useContext(WalletContext);
    const [mounted, setMounted] = React.useState(false);
    const tawkMessengerRef = React.useRef<any>(null);
    React.useEffect(() => setMounted(true), []);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get("preview");

    React.useEffect(() => {
        if (query === null || query === undefined || query === "" || pathname === "/") {
            router.replace(`${pathname}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // React.useEffect(() => {
    //     if (walletContext?.previewAddress) {
    //         router.replace(`${pathname}?preview=${walletContext?.previewAddress}`);
    //     } else {
    //         router.replace(`${pathname}`);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <NextUIProvider>
            <WalletProvider>
                {/* {query && (
                    <div className="bg-[#EAB308] flex justify-center">
                        <p className="text-black font-bold">You preview this address {query}</p>
                    </div>
                )} */}
                <TawkMessengerReact
                    propertyId={process.env.NEXT_PUBLIC_ProjectId}
                    widgetId={process.env.NEXT_PUBLIC_WidgetId}
                    ref={tawkMessengerRef}
                />
                {mounted && children}
            </WalletProvider>
        </NextUIProvider>
    );
}
