
import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";
import StarsCanvas from "@/components/main/StarBackground";
import YoutubeEmPlanetUp from "@/components/main/YoutubeEmPlanetUp";


import Image from "next/image";

export default function Home() {
    return (
        <main className="h-full w-full">
            <div className="flex flex-col h-full gap-2">
                <StarsCanvas />
                <Navbar />
                <Hero />
                <YoutubeEmPlanetUp/>
                  
            </div>
        </main>
    );
}
