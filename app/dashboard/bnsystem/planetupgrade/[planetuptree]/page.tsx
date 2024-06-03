"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import LevelIcon from "@/components/dashboardComponents/LevelIcon";
import { IoIosArrowForward } from "react-icons/io";
import { treePositionData } from "@/utils/treePositionData";
import { Item } from "@radix-ui/react-select";
import EmptyNodeInTree from "@/components/clientcomponents/bnsystemClientComp/EmptyNodeInTree";
import { WalletContext } from "@/context/WalletContext";
import Pagination from "@/components/clientcomponents/bnsystemClientComp/Pagination";
import axios from "axios";
import Link from "next/link";
import useResponsiveSVGSize from "@/Hooks/useResponsiveSVGSize";

interface PlanetUpTreeData {
    indexMappings: any;
    reg_user_address: string;
    bn_id: string;
    currentLevel: number;
    currentPosition: number;
    timestamp: string;
}

const Page = ({ params }: { params: { planetuptree: string } }) => {
    const walletContext = useContext(WalletContext);
    const userAddress = walletContext?.userAddress;
    const [autoPoolTableData, setAutoPoolTableData] = useState<PlanetUpTreeData[]>([]);
    const [user, setUser] = useState<number>();
    const [hoverDetails, setHoverDetails] = useState<PlanetUpTreeData | null>(null);
    const currentPlanet = Object.values(params);
    const [maxRecycle, setMaxRecycle] = useState<number>();

    const [currentItemIndex, setCurrentItemIndex] = useState(0); // Starts from 0 for the first item
    const items = Array.from({ length: 100 }, (_, index) => `Recycle ${index + 1}`);
    // Event handlers for item navigation
    const handlePreviousClick = () => {
        setCurrentItemIndex(currentItemIndex - 1);
    };

    const handleNextClick = () => {
        const safeMaxRecycle = maxRecycle ?? 0;

        if (currentItemIndex < safeMaxRecycle - 1) {
            setCurrentItemIndex(currentItemIndex + 1);
        }
    };

    const getPackage = (planetName: any) => {
        if (planetName == "Earth") {
            return "5$";
        } else if (planetName == "Moon") {
            return "10$";
        } else if (planetName == "Mars") {
            return "25$";
        } else if (planetName == "Mercury") {
            return "50$";
        } else if (planetName == "Venus") {
            return "100$";
        } else if (planetName == "Jupiter") {
            return "250$";
        } else if (planetName == "Saturn") {
            return "500$";
        } else if (planetName == "Uranus") {
            return "1000$";
        } else if (planetName == "Neptune") {
            return "2500$";
        } else if (planetName == "Pluto") {
            return "5000$";
        }
    };

    const getRecycleLevel = async () => {
        try {
            const response = await axios(
                `${process.env.NEXT_PUBLIC_URL}/user/getRecycleMaxLevel/${userAddress?.toLowerCase()}/${currentPlanet}`
            );

            if (response.data) {
                const data = await response.data;

                setMaxRecycle(data);
            }
        } catch (error) {
            setMaxRecycle(0);
        }
    };

    const getTreeData = async (recycleCount: number) => {
        try {
            const query = `${
                process.env.NEXT_PUBLIC_URL
            }/user/getPlanetTree/${userAddress?.toLowerCase()}/${currentPlanet}/${recycleCount + 1}`;
            console.log("query", query);
            const response = await axios(query);

            if (response.data) {
                const data: PlanetUpTreeData[] = await response.data;
                console.log(data);
                setAutoPoolTableData(data);
            } else {
                console.log("Failed to fetch auto pool table data");
                // Consider setting user to 0 or another appropriate value if the fetch fails
                setUser(0);
            }
        } catch (error) {
            console.error("Error fetching auto pool table data:", error);
            // Reset the state to clear previous data if the fetch fails
            setAutoPoolTableData([]);
            setUser(0); // Reset user details count
        }
    };

    useEffect(() => {
        getTreeData(currentItemIndex);
        getRecycleLevel();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress, currentItemIndex]);

    const cutoffIndex = user; // Adjust based on your requirements
    console.log("cutt", cutoffIndex);

    const filledNodeCount = autoPoolTableData.length;

    const filledNodes = treePositionData.slice(0, filledNodeCount).map((item, index) => (
        <div
            key={index}
            style={{
                position: "absolute",
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
            }}
            onMouseEnter={() => setHoverDetails(autoPoolTableData[index] ?? null)}
            onMouseLeave={() => setHoverDetails(null)}
        >
            <Image
                src="/BNSymbol2.png"
                alt="BNsymbol"
                height={item.imgHeight}
                width={item.imgWidth}
                className={item.imgStyle}
            />
        </div>
    ));

    const emptyNodes = treePositionData.slice(filledNodeCount, treePositionData.length).map((item, index) => {
        return (
            <div key={`empty-node-${index}`}>
                <EmptyNodeInTree
                    // Unique key for react elements
                    top={item.top}
                    bottom={item.bottom}
                    right={item.right}
                    left={item.left}
                    emptyHeight={item.emptyHeight || 30}
                    emptyWidth={item.emptyWidth || 30}
                    defaultSize={{ width: item.svgWidth, height: item.svgHeight }}
                    mobileSize={{ width: item.mobilesvgWidth, height: item.mobilesvgHeight }}
                />
            </div>
        );
    });

    const allNodes = [...filledNodes, ...emptyNodes];

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full ">
                <Link href="/dashboard/bnsystem/planetupgrade">
                    <button className="bg-yellow-500 px-5 py-2 font-bold rounded-md m-2">back</button>
                </Link>
            </div>

            <div className="w-fit lg:w-[65%] mt-16 mx-5 lg:m-5 ">
                <div className="h-auto w-auto lg:w-3/4 bg-zinc-800 flex  justify-between items-center ">
                    <div className="flex items-center gap-x-3 p-2">
                        <Image
                            src={`/${currentPlanet}.png`}
                            alt={`${currentPlanet}`}
                            height={50}
                            width={50}
                            loading="lazy"
                        />

                        <p className="text-xl">
                            {currentPlanet} - {getPackage(currentPlanet)}
                        </p>
                    </div>

                    <div className="text-center">
                        <p></p>
                    </div>
                </div>

                <div className="relative bg-[#111010] w-fit lg:w-3/4 h-[40%] px-4 py-2 sm:px-7 sm:py-1 md:px-10 md:py-3">
                    <Image src="/PlanetUpgradeTree.png" alt="concentriccircle" height={800} width={800} />

                    <div className="absolute top-[42.5%] right-[43.5%] sm:top-[45%] sm:right-[47%]   lg:top-[43%]  lg:right-[45%]  w-fit">
                        <Image
                            src="/BNSymbol2.png"
                            alt="BNsymbol1"
                            height={45}
                            width={45}
                            className="md:w-full lg:w-full border-2 border-zinc-600   lg:p-2  bg-black rounded-full hover:border-yellow-400 duration-300"
                        />
                    </div>

                    {allNodes}

                    {hoverDetails && (
                        <div className="bg-black bg-opacity-65 absolute top-[39%] left-[50%] text-[9px] lg:text-[12px] lg:top-[41%] lg:left-[50%] px-2 py-3 border-2 border-yellow-400 z-50 -translate-x-[52%] w-fit h-fit rounded-lg ">
                            <p>BN ID: {hoverDetails.bn_id}</p>
                            <p>Planet No: {hoverDetails.currentPosition}</p>
                            <p>Global Tier: {hoverDetails.currentLevel}</p>
                            <p>Time:{hoverDetails.timestamp}</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-start items-center">
                    <div className="flex items-center justify-center">
                        <button
                            onClick={handlePreviousClick}
                            disabled={currentItemIndex === 0} // Disable if this is the first item
                            style={{ marginRight: "10px" }}
                            className="border-2 border-yellow-500 h-7 p-3 flex items-center  rounded-md hover:bg-stone-700 duration-300"
                        >
                            &larr;
                        </button>
                        <div style={{ margin: "20px", textAlign: "center" }}>{items[currentItemIndex]}</div>
                        <button
                            onClick={handleNextClick}
                            disabled={currentItemIndex === items.length - 1} // Disable if this is the last item
                            style={{ marginLeft: "10px" }}
                            className="border-2 border-yellow-500 h-7 p-3 flex items-center  rounded-md hover:bg-stone-700 duration-300"
                        >
                            &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Page;
