"use client";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import "../../../components/OrgChartTree.css";
import horseImage from "../../../public/BELIEVE-LOGO-07.png";
import { clubA_Address } from "@/contract/ClubAContract/ClubA_Instance";
import { ethers } from "ethers";
import ClubA_ABI from "@/contract/ClubAContract/ClubA_ABI.json";

// Define interface for the direct earning data structure
interface DirectEarningType {
  reg_user_address: string;
  bn_id: string;
  planetName: string;
  amount: number;
  treePosition: number;
  treeLevel: number;
  _id: string;
  timestamp: string;
}

interface DirectEarningObject {
  users: DirectEarningType[];
  totalPages: number;
}

const trimAddress = (address: string) => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

// Custom node component
const CustomNode = ({ nodeDatum, toggleNode, getUserPlanet, uplineAdr }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [planetName, setPlanetName] = useState(nodeDatum.planetName);

  const handleMouseEnter = async () => {
    setIsHovered(true);
    if (nodeDatum.fullAddress && !nodeDatum.isRoot) {
      const fetchedPlanetName = await getUserPlanet(nodeDatum.fullAddress);
      setPlanetName(fetchedPlanetName);
    }
  };

  const handleMouseLeave = () => setIsHovered(false);

  return (
    <g onClick={toggleNode}>
      {/* Image display */}
      <image
        href={horseImage.src} // Path to image source
        x="-24"
        y="-15"
        width="50"
        height="50"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "pointer" }}
      />
      {/* Node text display */}
      <text
        fill="white"
        x={0} // Centering text
        y={40} // Below the image
        fontSize={10}
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
      >
        {/* {nodeDatum.name} */}
      </text>
      {/* Display additional information */}
    
      {/* Hover text display */}
      {isHovered && (
        <foreignObject x={-75} y={-85} width={190} height={90}>
          <div className="text-black bg-yellow-500 border-1 border-yellow-500 rounded-xl px-4">
            {nodeDatum.isRoot ? (
              <div className="text-black text-sm">{`Upline: ${trimAddress(uplineAdr)}`}</div>
            ) : (
              <>
                <div className="text-black">{trimAddress(nodeDatum.fullAddress)}</div>
                <div className="text-black text-sm">{`Planet: ${planetName}`}</div>
                <div>{`Generation: ${nodeDatum.generation}`}</div>
              </>
            )}
          </div>
        </foreignObject>
      )}
    </g>
  );
};

const OrgChartTree = () => {
  const [treeData, setTreeData] = useState<any>(null);
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [uplineAdr, setUplineAdr] = useState('');

  const getPlanetName = (planetId: number): string | undefined => {
    const planetNames: { [id: number]: string } = {
      1: "Earth 10$",
      2: "Moon 25$",
      3: "Mars 50$",
      4: "Mercury 100$",
      5: "Venus 250$",
      6: "Jupiter 500$",
      7: "Saturn 1000$",
      8: "Uranus 2500$",
      9: "Neptune 5000$",
      10: "Pluto 10000$",
    };

    return planetNames[planetId];
  };

  const getUpline = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);

      const contractRes = await clubAMainContract.InternalGenStr(address);
      const uplineId = ethers.BigNumber.from(contractRes.uplineid);

      const getUplineRes = await clubAMainContract.Walletdetails(1, uplineId);
      const uplineAddress = getUplineRes.user;
      console.log("upline address", uplineAddress);

      setUplineAdr(uplineAddress);
    } catch (error) {
      console.log("something went wrong in getUpline", error);
    }
  };

  const userCurrentPlanet = async (userAddress: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);

      const scRes = await clubAMainContract.getPackage(userAddress);
      const planetId = ethers.BigNumber.from(scRes).toNumber();
      const planetNameIs = getPlanetName(planetId);

      return planetNameIs;
    } catch (error) {
      console.log("something went wrong in userCurrentPlanet ", error);
      return "Unknown";
    }
  };

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      try {
        const queryData = `${
          process.env.NEXT_PUBLIC_URL
        }/clubA/getWorkingTree/${address.toLowerCase()}/Earth`;
        const response = await axios.get<DirectEarningObject>(queryData);

        if (response.data) {
          const transformedData = transformData(response.data.users);
          setTreeData(transformedData);
          getUpline(); // Fetch upline after fetching tree data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [address]);

  // Transformation logic to build hierarchical tree data structure
  const transformData = (users: DirectEarningType[]) => {
    const root = {
      name: "Root",
      isRoot: true,
      children: [
        {
          name: `Address: ${trimAddress(address!)}`,
          fullAddress: address,
          planetName: "Earth",
          generation: 1,
          children: [],
        },
      ],
    };

    const nodesMap: { [key: number]: any } = {};

    users.forEach((user, index) => {
      const { reg_user_address, planetName } = user;
      const node = {
        name: `${planetName} ${trimAddress(reg_user_address)}`,
        fullAddress: reg_user_address,
        planetName: planetName,
        generation: Math.floor(Math.log2(index + 1)) + 1,
        children: [],
      };

      nodesMap[index + 1] = node; // Use index + 1 as position
    });

    Object.keys(nodesMap).forEach((position) => {
      const pos = parseInt(position);

      if (pos === 1) {
        // Ensure root node has up to 3 children
        if (root.children[0].children.length < 3) {
          //@ts-ignore
          root.children[0].children.push(nodesMap[pos]);
        }
      } else {
        const parentPos = Math.floor((pos - 2) / 3) + 1;
        if (nodesMap[parentPos]) {
          // Ensure each node has up to 3 children
          if (nodesMap[parentPos].children.length < 3) {
            nodesMap[parentPos].children.push(nodesMap[pos]);
          }
        }
      }
    });

    return root;
  };

  return (
    <div className="org-chart-container">
      {treeData && (
        <Tree
          data={treeData}
          orientation="vertical"
          svgClassName="tree-svg" // Apply custom class name
          renderCustomNodeElement={(rd3tProps) => <CustomNode {...rd3tProps} getUserPlanet={userCurrentPlanet} uplineAdr={uplineAdr} />}
        />
      )}
    </div>
  );
};

export default OrgChartTree;
