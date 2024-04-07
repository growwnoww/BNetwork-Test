import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import RecoilProvider from "@/components/WrapperComponent/RecoilProvider";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Believe Network",
    description: "Dapp",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#000000] text-white  overflow-x-hidden`}>
                <RecoilProvider>
                    <Providers>{children}</Providers>


                </RecoilProvider>
            </body>
        </html>
    );
}
