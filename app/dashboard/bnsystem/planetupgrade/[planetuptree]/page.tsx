"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import LevelIcon from "@/components/dashboardComponents/LevelIcon";
import { IoIosArrowForward } from "react-icons/io";
import { treePositionData } from "@/utils/treePositionData";
import { Item } from "@radix-ui/react-select";
import EmptyNodeInTree from "@/components/clientcomponents/bnsystemClientComp/EmptyNodeInTree";
import { WalletContext } from "@/context/WalletContext";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


interface UserDetails {
  _id: string;
  bn_id: string;
  planetName: string;
  reg_user_address: string;
  universeSlot: number;
  children: string[];
  parent: string;
  currentLevel: number;
  currentPosition: number;
  autoPoolEarning: number;
  isRoot: boolean;
  recycle: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IndexMapping {
  userLevel: number;
  userPosition: number;
  userDetails: UserDetails[];
}

interface RecycleItem {
  recycleCount: number;
  indexMappings: IndexMapping[];
}

interface PlanetUpTree {
  data: RecycleItem[];
}


const Page = ({params}:{params:{planetuptree:string}}) => {
  

  const walletContext = useContext(WalletContext);
  const userAddress = walletContext?.userAddress;
  const [autoPoolTableData, setAutoPoolTableData] = useState<PlanetUpTree>({
    data: [],
  });
  const [user, setUser] = useState<number>();
  const [hoverDetails, setHoverDetails] = useState<UserDetails | null>(null);
  const currentPlanet = Object.values(params)

  const recycleLength = 4
  const [currentPage, setCurrentPage] = useState(1);
 

  console.log("Recyle Length", recycleLength);

  console.log("Hover ", hoverDetails);
  
 
  const getPackage = (planetName:any) =>{
    if(planetName == "Earth"){
      return '5$'
    }
    else if(planetName == "Moon"){
      return '10$'
    }
    else if(planetName == "Mars"){
      return '25$'
    }
    else if(planetName == "Mercury"){
      return '50$'
    }
    else if(planetName == "Venus"){
      return '100$'
    }
    else if(planetName == "Jupiter"){
      return '250$'
    }
    else if(planetName == "Saturn"){
      return '500$'
    }
    else if(planetName == "Uranus"){
      return '1000$'
    }
    else if(planetName == "Neptune"){
      return '2500$'
    }
    else if(planetName == "Pluto"){
      return '5000$'
    }
  }




  const getTreeData = async (recycleCount: Number) => {
    try {
      const query = `${process.env.NEXT_PUBLIC_URL}/user/getPlanetUpgradeTree/${userAddress}/${currentPlanet}/${recycleCount}`;
      console.log("query", query);
      const response = await fetch(query);
     


      if(response.ok) {
        const data: PlanetUpTree = await response.json();
        console.log(data);
        setAutoPoolTableData(data);
      
        const userDetailsCount = (data.data?.reduce((totalCount, recycleItem) => {
          return totalCount + (recycleItem.indexMappings?.reduce((count, mapping) => {
            return count + (mapping.userDetails?.length || 0);
          }, 0) || 0);
        }, 0) || 0);
      
        setUser(userDetailsCount);
      } else {
        console.log("Failed to fetch auto pool table data");
        // Consider setting user to 0 or another appropriate value if the fetch fails
        setUser(0);
      }
      
    } catch (error) {
      console.error("Error fetching auto pool table data:", error);
      // Reset the state to clear previous data if the fetch fails
      setAutoPoolTableData({ data: [] });
      setUser(0); // Reset user details count
    }
  };

  useEffect(() => {
    getTreeData(currentPage);
  }, [currentPage, userAddress]);

  const cutoffIndex = user; // Adjust based on your requirements
  console.log("cutt",cutoffIndex)
  // Split the data into two parts
  const imageData = treePositionData.slice(0, cutoffIndex);
  const emptyData = treePositionData.slice(cutoffIndex);
  return (
    <div className="flex items-center justify-center">
      <div className="m-5 w-fit">
        <div className="h-24 w-full bg-zinc-800 flex  justify-between items-center ">
          <div className="flex items-center gap-x-3 p-2">
            <Image
              src={`/${currentPlanet}.png`}
              alt={`${currentPlanet}`}
              height={50}
              width={50}
              loading="lazy"
            />

            <p className="text-xl">{currentPlanet} - {getPackage(currentPlanet)}</p>
          </div>

          <div className="text-center">
            <p>Each Cycled Benefits</p>
            <p>2310%</p>
          </div>
        </div>

        <div className="relative bg-[#111010] w-fit ">
          <Image
            src="/concentriccircle1.png"
            alt="concentriccircle"
            height={800}
            width={800}
          />

          <div className="absolute top-[45%] right-[46%]  w-fit">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={40}
              width={40}
              className="w-full border-2 border-zinc-600  p-3  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {imageData.map((item, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: item.top,
                bottom: item.bottom,
                right: item.right,
                left: item.left,
              }}
              onMouseEnter={() =>
                setHoverDetails(
                  autoPoolTableData.data[0]?.indexMappings[index]
                    ?.userDetails[0] ?? null
                )
              } // Adjust based on actual data structure
              onMouseLeave={() => setHoverDetails(null)}
            >
              <Image
                src="/BNSymbol2.png"
                alt="BNsymbol1"
                height={item.imgHeight}
                width={item.imgWidth}
                className={item.imgStyle}
              />
            </div>
          ))}

          {emptyData.map((item, index) => (
            <EmptyNodeInTree
              key={index}
              top={item.top}
              bottom={item.bottom}
              right={item.right}
              left={item.left}
              emptyHeight={item.emptyHeight}
              emptyWidth={item.emptyWidth}
              svgHeight={item.svgHeight}
              svgWidth={item.svgWidth}
            />
          ))}

          {hoverDetails && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                zIndex: 100,
                color: "black",
              }}
            >
              <p>BN ID: {hoverDetails.bn_id}</p>
              <p>Planet No: {hoverDetails.universeSlot}</p>
              <p></p>
            </div>
          )}
        </div>
        <div className="h-16 w-full flex bg-zinc-800">
          <div className="order-2 lg:order-1">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  />
                </PaginationItem>
                {Array.from(
                  { length: recycleLength || 0 },
                  (_, i) => i + 1
                ).map((pageNumber: number) => {
                  return (
                    <PaginationItem
                      key={pageNumber}
                      className={pageNumber === currentPage ? "active" : ""}
                    >
                      <PaginationLink
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(
                        Math.min(recycleLength || 1, currentPage + 1)
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
