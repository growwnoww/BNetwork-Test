"use client"
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';

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

const OrgChartTree = () => {
  const [treeData, setTreeData] = useState<any>(null);
  const { address } = useWeb3ModalAccount();

  // Utility function to format Ethereum addresses
  const trimAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Fetch data from API
  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      try {
        const queryData = `${process.env.NEXT_PUBLIC_URL}/clubA/getWorkingTree/${address.toLowerCase()}/Earth`;
        const response = await axios.get<DirectEarningObject>(queryData);

        if (response.data) {
          console.log("users", response.data);
          const transformedData = transformData(response.data.users);

          setTreeData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [address]);

  // Transformation logic to build hierarchical tree data structure
  const transformData = (users: DirectEarningType[]) => {
    const root = { name: 'Root', children: [] as any[] };
    const nodesMap: { [key: number]: any } = {};

    // Step 1: Create nodes
    users.forEach((user, index) => {
      const { reg_user_address, planetName } = user;
      const node = {
        name: `${planetName} ${trimAddress(reg_user_address)}`,
        children: [],
        level: Math.floor(Math.log2(index + 1)) + 1, // Calculate level based on index
      };

      nodesMap[index + 1] = node; // Use index + 1 as position
    });

    // Step 2: Establish hierarchy based on calculated position
    Object.keys(nodesMap).forEach((position) => {
      const pos = parseInt(position);

      if (pos === 1) {
        // Add root node to the children of the root
        root.children.push(nodesMap[pos]);
      } else {
        // Determine parent node based on tree position logic
        const parentPos = Math.floor((pos - 2) / 3) + 1;
        if (nodesMap[parentPos]) {
          nodesMap[parentPos].children.push(nodesMap[pos]);
        }
      }
    });

    return root;
  };

  return (
    <div className="org-chart-container" style={{ width: '100%', height: '100vh', backgroundColor: 'white' }}>
      {treeData && <Tree data={treeData} orientation="vertical" />}
    </div>
  );
};

export default OrgChartTree;
