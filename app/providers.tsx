"use client";

import * as React from "react";
import { RainbowKitProvider, connectorsForWallets, darkTheme, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bscTestnet, bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { WalletProvider } from "@/context/WalletContext";
import { argentWallet, trustWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";

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
//     currency: "BNB",
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

    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={wagmiConfig}>
            <WalletProvider>
                <RainbowKitProvider chains={chains} appInfo={demoAppInfo} theme={darkTheme()} modalSize="compact">
                    {mounted && children}
                </RainbowKitProvider>
            </WalletProvider>
        </WagmiConfig>
    );
}
