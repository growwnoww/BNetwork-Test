"use client";

import * as React from "react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

const projectId = "9d8144e157054d061c1c58a856ba0669";

const bsc = {
    chainId: 56,
    name: "BSC",
    currency: "BNB",
    explorerUrl: "https://bscscan.com",
    rpcUrl: "https://bsc-dataseed4.ninicoin.io/",
};

const tbsc = {
    chainId: 97,
    name: "TBSC",
    currency: "TBNB",
    explorerUrl: "https://testnet.bscscan.com/",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
};

// 3. Create modal
const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "https://mywebsite.com", // origin must match your domain & subdomain
    icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [bsc, tbsc],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);
    return <>{mounted && children}</>;
}
