
import Footer from "@/components/Footer/Footer";
import { CardsBengali } from "@/components/HowItWorksComp/CardBengali";
import { CardHoverEffectDemo } from "@/components/HowItWorksComp/CardHoverEffectDemo";
import { CardsFrench } from "@/components/HowItWorksComp/CardsFrench";
import { CardSwahili } from "@/components/HowItWorksComp/CardSwahili";



import Image from "next/image";


const Page = ()=> {
    return (
        <main className="h-full w-full">
         
            <div className="mt-[70px] flex flex-col items-center justify-center lg:block mx-8 mb-10">
                 
                 {/* <div className="">
                    <p className="text-4xl font-bold border-b-2 border-b-yellow-500">How It Works</p>
                 </div> */}
                
                {/* <PlanetUpDocs/>
                <ClubADocs/>
                <NFTDocs/>
                <BNCoinComp/> */}

                <CardHoverEffectDemo/>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                <CardsFrench/>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                <CardsBengali/>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                <CardSwahili/>

                

                

            </div>
            <Footer/>
        </main>
    );
}

export default Page;
