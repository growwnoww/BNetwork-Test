
import Navbar from "@/components/main/Navbar";
import BNCoinComp from "@/components/sub/BNCoinComp";
import ClubADocs from "@/components/sub/ClubADocs";
import NFTDocs from "@/components/sub/NFTDocs";
import PlanetUpDocs from "@/components/sub/PlanetUpDocs";


import Image from "next/image";


const Page = ()=> {
    return (
        <main className="h-full w-full">
         
            <div className="mt-[70px] flex flex-col items-center justify-center lg:block mx-8">
                 
                 {/* <div className="">
                    <p className="text-4xl font-bold border-b-2 border-b-yellow-500">How It Works</p>
                 </div> */}
                
                <PlanetUpDocs/>
                <ClubADocs/>
                <NFTDocs/>
                <BNCoinComp/>

              

                

                

            </div>
        </main>
    );
}

export default Page;
