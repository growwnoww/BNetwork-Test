import { HoverEffect } from "@/components/ui/card-hover-swahili";

export function CardSwahili() {
  return (
   <div>
   
     <div className="lg:max-w-5xl mx-auto">
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
    downloadbtn: "/CosmosSwahili.pdf",
  },

  {
    title: "NFT Royalty",
    image:
      "/NEPTUNE031.png",
    downloadbtn: "/NFTSwahili.pdf",
  },
  {
    title: "White Paper of BN Coin",
    image:
      "/Coin Front.png",
    downloadbtn: "/WhitePaperSwahilii.pdf",
  },

];
