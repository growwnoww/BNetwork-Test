"use client";

import * as React from "react";
import { RainbowKitProvider, connectorsForWallets, darkTheme, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bscTestnet, bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { WalletProvider } from "@/context/WalletContext";
import { argentWallet, trustWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { NextUIProvider } from "@nextui-org/react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const { chains, publicClient, webSocketPublicClient } = configureChains([bsc, bscTestnet], [publicProvider()]);

const projectId = "9d8144e157054d061c1c58a856ba0669";

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
//     currency: "TBNB",
//     explorerUrl: "https://testnet.bscscan.com/",
//     rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
// };

// 3. Create modal
const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "https://mywebsite.com", // origin must match your domain & subdomain
    icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [bscMa],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const demoAppInfo = {
    appName: "Believe Network",
};

const { wallets } = getDefaultWallets({
    appName: "Believe Network",
    projectId,
    chains,
});

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: "Other",
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
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
    return (
        <WagmiConfig config={wagmiConfig}>
            <NextUIProvider>
                <WalletProvider>
                    <RainbowKitProvider chains={chains} appInfo={demoAppInfo} theme={darkTheme()} modalSize="compact">
                        {query && (
                            <div className="bg-[#EAB308] flex justify-center">
                                <p className="text-black font-bold">You preview this address {query}</p>
                            </div>
                        )}
                        <TawkMessengerReact
                            propertyId={process.env.NEXT_PUBLIC_ProjectId}
                            widgetId={process.env.NEXT_PUBLIC_WidgetId}
                            ref={tawkMessengerRef}
                        />
                        {mounted && children}
                    </RainbowKitProvider>
                </WalletProvider>
            </NextUIProvider>
        </WagmiConfig>
    );
}
