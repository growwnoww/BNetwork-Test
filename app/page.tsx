import FAQ from "@/components/FAQ/FAQ";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";
import { AnimatedListDemo } from "@/components/Roadmap/AnimatedListDemo";
import MobileRoadmap from "@/components/Roadmap/MobileRoadmap";
import NewRoadmap from "@/components/Roadmap/NewRoadmap";
import { BentoGridSecondDemo } from "@/components/sub/BncoinInfo";
import { FeaturesSectionDemo } from "@/components/sub/Featuresectiondemo";
import { GlobeDemo } from "@/components/sub/Globe";
import PieChartDemo from "@/components/sub/PieChart";
import SmatContractContainer from "@/components/sub/SmatContractContainer";
import { BsTelegram, BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="relative flex flex-col h-full gap-2">
        {/* <StarsCanvas /> */}
        <Navbar />
        <Hero />
        {/* <YoutubeEmPlanetUp /> */}
        <div className="fixed top-[15%]  lg:top-[40%] ml-3 text-3xl gap-y-4 z-40">
          <a
            href="https://www.facebook.com/BelieveNetworkSpaceOfficial"
            target="_blank"
          >
            {" "}
            <FaFacebook className="text-blue-500 my-2 animate-bounce" />
          </a>
          <a href="https://twitter.com/BNetworkSpace" target="_blank">
            <BsTwitterX className=" my-2 animate-bounce" />
          </a>
          <a href="https://t.me/BNetworkSpace_Official" target="_blank">
            <BsTelegram className="text-blue-400 my-2 animate-bounce" />
          </a>
          <a
            href="https://whatsapp.com/channel/0029VaA5OKX6buMSmdXnJh3Q"
            target="_blank"
          >
            <ImWhatsapp className="text-green-500 my-2 animate-bounce" />
          </a>
          <a
            href="https://www.youtube.com/@BelieveNetworkSpaceOfficial/featured"
            target="_blank"
          >
            <FaYoutube className="text-red-500 my-2  animate-bounce" />
          </a>
        </div>


        <div id="roadmap" className="flex flex-col  items-center justify-center -translate-y-96 lg:-translate-y-2 ">
          {/* <RoadmapBN/> */}
          <div className="-translate-y-36 lg:-translate-y-56    z-30">
            <p className="text-4xl lg:text-6xl font-extrabold ">Our Roadmap</p>
          </div>

         <div className="lg:hidden">
         <MobileRoadmap/>

         </div>

         <div className="hidden lg:block">
          <NewRoadmap/>
         </div>

        </div>
         <FeaturesSectionDemo/>

        <SmatContractContainer/>
        <FAQ />
      </div>

      <footer>
        <GlobeDemo/>
             <Footer />
      </footer>
    </main>
  );
}
