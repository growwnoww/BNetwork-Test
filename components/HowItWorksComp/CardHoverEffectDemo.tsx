import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
   <div>
   
     <div className=" lg:max-w-5xl  mx-auto ">
      <HoverEffect items={projects} />
    </div>
   </div>
  );
}
export const projects = [
  {
    title: "CosMos Network",
    image:
      "/BELIEVE-LOGO-07.png",
    downloadbtn: "/ComosEng.pdf",
  },
  {
    title: "Universe Club-A",
    image:
      "/BELIEVE-LOGO-13.png",
    downloadbtn: "/Universe_Club_A_BNetwork_1may24.pdf",
  },
  {
    title: "NFT Royalty",
    image:
      "/NEPTUNE031.png",
    downloadbtn: "/BNetwork_Royalty NFT.pdf",
  },
  {
    title: "White Paper of BN Coin",
    image:
      "/Coin Front.png",
    downloadbtn: "/BN COIN White _paper_new.pdf",
  },

];
