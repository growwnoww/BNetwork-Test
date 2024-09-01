
import Footer from "@/components/Footer/Footer";
import { CardsBengali } from "@/components/HowItWorksComp/CardBengali";
import { CardHoverEffectDemo } from "@/components/HowItWorksComp/CardHoverEffectDemo";
import { CardsFrench } from "@/components/HowItWorksComp/CardsFrench";
import { CardSwahili } from "@/components/HowItWorksComp/CardSwahili";
import { GrWorkshop } from "react-icons/gr";





const Page = ()=> {
    return (
        <div className="h-full w-full  mt-24">

            <div className="flex flex-col items-center justify-center">
                <GrWorkshop className="text-7xl lg:text-9xl text-yellow-500"/>
                <p className="text-4xl lg:text-7xl font-semibold  text-gray-200 text-center">How it Works</p>
            </div>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

         
            <div className=" flex flex-col items-center justify-center lg:block mx-8 mb-10">
                 
                 {/* <div className="">
                    <p className="text-4xl font-bold border-b-2 border-b-yellow-500">How It Works</p>
                 </div> */}
                
                {/* <PlanetUpDocs/>
                <ClubADocs/>
                <NFTDocs/>
                <BNCoinComp/> */}

                <CardHoverEffectDemo/>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-9 h-[1px] w-full" />
                <CardsFrench/>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                {/* <CardsBengali/>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}
                <CardSwahili/>

                

                

            </div>
            <Footer/>
        </div>
    );
}

export default Page;
