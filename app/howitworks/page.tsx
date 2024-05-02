
import { CardsBengali } from "@/components/HowItWorksComp/CardBengali";
import { CardHoverEffectDemo } from "@/components/HowItWorksComp/CardHoverEffectDemo";
import { CardsFrench } from "@/components/HowItWorksComp/CardsFrench";
import { CardSwahili } from "@/components/HowItWorksComp/CardSwahili";



import Image from "next/image";


const Page = ()=> {
    return (
        <main className="h-full w-full">
         
            <div className="mt-[70px] flex flex-col items-center justify-center lg:block mx-8">
                 
                 {/* <div className="">
                    <p className="text-4xl font-bold border-b-2 border-b-yellow-500">How It Works</p>
                 </div> */}
                
                {/* <PlanetUpDocs/>
                <ClubADocs/>
                <NFTDocs/>
                <BNCoinComp/> */}

                <CardHoverEffectDemo/>
                <CardsFrench/>
                <CardsBengali/>
                <CardSwahili/>

                

                

            </div>
        </main>
    );
}

export default Page;
