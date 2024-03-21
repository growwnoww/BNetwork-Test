import Planetupgradediv from "@/components/clientcomponents/bnsystemClientComp/Planetupgradediv";
import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";
import StarsCanvas from "@/components/main/StarBackground";
import HeroContent from "@/components/sub/HeroContent";

import Image from "next/image";

export default function Home() {
    return (
        <main className="h-full w-full">
            <div className="flex flex-col h-full gap-2">
                <StarsCanvas />
                <Navbar />
                <Hero />
            </div>
        </main>
    );
}
