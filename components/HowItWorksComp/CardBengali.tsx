import { HoverEffect } from "@/components/ui/card-hover-bengali";

export function CardsBengali() {
  return (
   <div>
   
     <div className="lg:max-w-5xl mx-auto ">
      <HoverEffect items={projects} />
    </div>
   </div>
  );
}
export const projects = [
  {
    title: "Cosmos Network",
    image:
      "/BELIEVE-LOGO-07.png",
    downloadbtn: "/CosmosBengali.pdf",
  },
  {
    title: "Universe Club-A",
    image:
      "/BELIEVE-LOGO-13.png",
    downloadbtn: "/Club-A_PDF.pdf",
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
    downloadbtn: "/BNCoin White Paper.pdf",
  },

];
