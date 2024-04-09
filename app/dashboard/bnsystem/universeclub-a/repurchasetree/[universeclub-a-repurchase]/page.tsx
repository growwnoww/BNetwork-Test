'use client'
import ClubAEmptyNode from '@/components/clientcomponents/bnsystemClientComp/ClubAEmptyNode';
import { WalletContext } from '@/context/WalletContext';
import { ClubATreePositionData } from '@/utils/ClubATreePosition';
import { treePositionData } from '@/utils/treePositionData';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'

interface PlanetUpTreeData{
  indexMappings: any;
  reg_user_address:string;
  bn_id:string;
  currentLevel:number;
  currentPosition:number;
  timestamp:string;
}



interface activityData{
  reg_user_address:string;
  bn_id:string;
  currentLevel:number;
  currentPosition:number;
  amount:number;
  timestamp:string;
}


const Page = ({params}:{params:{planetuptree:string}}) => {
  
  const walletContext = useContext(WalletContext);
  const userAddress = walletContext?.userAddress
  const [clubAAutopoolData,setclubAAutopoolData] = useState<PlanetUpTreeData[]>()
  const [activitData,setActivityData] = useState<activityData[]>()
  const [user, setUser] = useState<number>();
  const [hoverDetails, setHoverDetails] = useState<PlanetUpTreeData | null>(null);
  const currentPlanet = Object.values(params)
  const [maxRecycle,setMaxRecycle] = useState<number>()
  const [maxRepurchase,setRepurchaseCount] = useState<number>()


  const [currentItemIndex, setCurrentItemIndex] = useState(0); // Starts from 0 for the first item
  
  const [currentItemRepurchase, setCurrentItemRepurchase] = useState(0); // Starts from 0 for the first item
  const items = Array.from({ length: 100 }, (_, index) => `Recycle ${index + 1}`);
  const repurchaseItems = Array.from({ length: 100 }, (_, index) => `Repurchase ${index + 1}`);
  // Event handlers for item navigation
  const handlePreviousClick = () => {
    setCurrentItemIndex(currentItemIndex - 1);
  };

  const handleNextClick = () => {

    const safeMaxRecycle = maxRecycle ?? 0;
    console.log("current index",currentItemIndex)

    if (currentItemIndex < safeMaxRecycle - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  const handlePurchasePreviousClick = () => {
    setCurrentItemRepurchase(currentItemRepurchase - 1);
  };

  const handlePurschaseNextClick = () => {

    const safeMaxRecycle = maxRepurchase ?? 0;


    if (currentItemRepurchase < safeMaxRecycle - 1) {
      setCurrentItemRepurchase(currentItemRepurchase + 1);
    }
  };
 

  
 
  const getPackage = (planetName:any) =>{
    if(planetName == "Earth"){
      return '10$'
    }
    else if(planetName == "Moon"){
      return '25$'
    }
    else if(planetName == "Mars"){
      return '50$'
    }
    else if(planetName == "Mercury"){
      return '100$'
    }
    else if(planetName == "Venus"){
      return '250$'
    }
    else if(planetName == "Jupiter"){
      return '500$'
    }
    else if(planetName == "Saturn"){
      return '1000$'
    }
    else if(planetName == "Uranus"){
      return '2500$'
    }
    else if(planetName == "Neptune"){
      return '5000$'
    }
    else if(planetName == "Pluto"){
      return '10000$'
    }
  }


  const getRecycleLevel = async() =>{
    try {
      const query = `${process.env.NEXT_PUBLIC_URL}/clubA/getRecycleClubARepurchase/${userAddress?.toLowerCase()}/${currentPlanet}/${currentItemRepurchase+1}`;
      console.log("query of max recycle",query)
      const response = await axios(`${process.env.NEXT_PUBLIC_URL}/clubA/getRecycleClubARepurchase/${userAddress?.toLowerCase()}/${currentPlanet}/${currentItemRepurchase+1}`)

      if(response.data){
        const data = await response.data;
         console.log("data recycle length",data)
         setMaxRecycle(data.recycleCountLength)
      }
    } catch (error) {
      setMaxRecycle(0)
    }
  }

  const getMaxRepurchaseCount = async () =>{
    try {
      const query = `${process.env.NEXT_PUBLIC_URL}/clubA/getMaxRepurchaseCount/${userAddress?.toLowerCase()}/${currentPlanet}`;
      console.log("query of max recycle",query)
      const response = await axios(`${process.env.NEXT_PUBLIC_URL}/clubA/getMaxRepurchaseCount/${userAddress?.toLowerCase()}/${currentPlanet}`)

      if(response.data){
        const data = response.data;
        console.log("repurchase max count",data)
        setRepurchaseCount(data)
      }
    } catch (error) {
      
    }
  }

  const getTreeData = async (recycleCount: number) => {
    try {
      const query = `${process.env.NEXT_PUBLIC_URL}/clubA/getRepurchaseTreeClubA/${userAddress?.toLowerCase()}/${currentItemRepurchase+1}/${currentItemIndex+1}/${currentPlanet}`;
      console.log("query", query);
      const response = await axios(query);
     


      if(response.data) {
        const data: PlanetUpTreeData[] = await response.data;
        console.log(data);
        setclubAAutopoolData(data);

      

      } else {
        console.log("Failed to fetch auto pool table data");
        // Consider setting user to 0 or another appropriate value if the fetch fails
        setUser(0);
      }
      
    } catch (error) {
      console.error("Error fetching auto pool table data:", error);
      // Reset the state to clear previous data if the fetch fails
      setclubAAutopoolData( [] );
      setUser(0); // Reset user details count
    }
  };

  const getRecentActivityData = async () => {
    try {
      const query = `${process.env.NEXT_PUBLIC_URL}/clubA/getClubAAutoPoolEarninghistory/${userAddress}/${currentPlanet}`;
      console.log("query", query);
      const response = await axios(query);
     


      if(response.data) {
        const data: activityData[] = await response.data;
        console.log(data);
        setActivityData(data);

      

      } else {
        console.log("Failed to fetch auto pool table data");
        // Consider setting user to 0 or another appropriate value if the fetch fails
        setUser(0);
      }
      
    } catch (error) {
      console.error("Error fetching auto pool table data:", error);
      // Reset the state to clear previous data if the fetch fails
      setclubAAutopoolData( [] );
      setUser(0); // Reset user details count
    }
  };

  

  useEffect(() => {
    getTreeData(currentItemIndex);
    getRecycleLevel()
    getRecentActivityData()
    getMaxRepurchaseCount()

  }, [ userAddress,currentItemIndex,currentItemRepurchase]);

  const cutoffIndex = user; // Adjust based on your requirements
  console.log("cutt",cutoffIndex)


  const filledNodeCount = clubAAutopoolData?.length;
 
  const filledNodes = ClubATreePositionData.slice(0, filledNodeCount).map((item, index) => (
    <div
      key={index}
      style={{
        position: "absolute",
        top: item.top,
        left: item.left,
        right: item.right,
        bottom: item.bottom,
      }}
      onMouseEnter={() => setHoverDetails(clubAAutopoolData && clubAAutopoolData[index] ? clubAAutopoolData[index] : null)}
      onMouseLeave={() => setHoverDetails(null)}
    >
      <Image
          src="/New_BN_Logo.png"
        alt="BNsymbol"
        height={item.imgHeight}
        width={item.imgWidth}
        className={item.imgStyle}
      />
    </div>
  ));

  const emptyNodes = ClubATreePositionData.slice(filledNodeCount, ClubATreePositionData.length).map((item, index) => {


    return (
      <div key={`empty-node-${index}`}>
      <ClubAEmptyNode
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
    )
   
    
  })

  const allNodes = [...filledNodes, ...emptyNodes];


  return (
    <div className='w-full h-full flex flex-col p-5'>

<div className="w-full flex items-center ">
        <div>
        <Link  href={`/dashboard/bnsystem/universeclub-a/${currentPlanet}`}>
          <button className="bg-yellow-500 px-5 py-1 font-bold rounded-md m-2">
            back
          </button>
        </Link>
        </div>
        
        <div>{` Club-A Repurchase Tee -${currentPlanet} ` }</div>
      
      </div>
     <div className='flex gap-x-5 h-full'>
     <div className='relative'>
        <div className='bg-stone-800 py-7 rounded-tl-md rounded-tr-md'>
         <p className='px-2'> {currentPlanet} {getPackage(currentPlanet)}</p>
        </div>
       <div className='relative  border-b border-b-gray-600 '>
        <Image
        src='/Club_A_tree-removebg.1.png'
        alt='clubAGlobalTree'
        height={800}
        width={800}
        className='  bg-[#11111]'
        />

        
<div className="absolute top-[41.5%] right-[45.5%] sm:top-[45%] sm:right-[47%]   lg:top-[41.9%]  lg:right-[45.5%]  w-fit">
            <Image
               src="/New_BN_Logo.png"
               alt="BNsymbol"
              height={35}
              width = {35}
              className="md:w-fit lg:w-auto border-2 border-zinc-600  lg:p-3 bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>



      {allNodes}

      {hoverDetails && (
            <div
             className="bg-black bg-opacity-65 absolute top-[39%] left-[50%] text-[9px] lg:text-[12px] lg:top-[41%] lg:left-[50%] px-2 py-3 border-2 border-yellow-400 z-50 -translate-x-[52%] w-fit h-fit rounded-lg "
            >
              <p>BN ID: {hoverDetails.bn_id}</p>
              <p>Planet No: {hoverDetails.currentPosition}</p>
              <p>Global Tier: {hoverDetails.currentLevel}</p>
              <p>Time:{hoverDetails.timestamp}</p>
            </div>
          )}
        </div>

        <div className='flex flex-row justify-between'>
      <div className="flex justify-start items-center">
        <div className="flex items-center justify-center">
        <button
          onClick={handlePreviousClick}
          disabled={currentItemIndex === 0} // Disable if this is the first item
          style={{ marginRight: '10px' }}
          className="border-2 border-yellow-500 h-7 p-3 flex items-center  rounded-md hover:bg-stone-700 duration-300"
        >
          &larr; 
        </button>
        <div style={{ margin: '20px', textAlign: 'center' }}>
        {items[currentItemIndex]}
      </div>
        <button
          onClick={handleNextClick}
          disabled={currentItemIndex === items.length - 1} // Disable if this is the last item
          style={{ marginLeft: '10px' }}
          className="border-2 border-yellow-500 h-7 p-3 flex items-center  rounded-md hover:bg-stone-700 duration-300"
        >
           &rarr;
        </button>
      </div>
        </div>


        <div className="flex justify-start items-center">
         <div className="flex items-center justify-center">
        <button
          onClick={handlePurchasePreviousClick}
          disabled={currentItemRepurchase === 0} // Disable if this is the first item
          style={{ marginRight: '10px' }}
          className="border-2 border-yellow-500 h-7 p-3 flex items-center  rounded-md hover:bg-stone-700 duration-300"
        >
          &larr; 
        </button>
        <div style={{ margin: '20px', textAlign: 'center' }}>
        {repurchaseItems[currentItemRepurchase]}
      </div>
        <button
          onClick={handlePurschaseNextClick}
          disabled={currentItemIndex === items.length - 1} // Disable if this is the last item
          style={{ marginLeft: '10px' }}
          className="border-2 border-yellow-500 h-7 p-3 flex items-center  rounded-md hover:bg-stone-700 duration-300"
        >
           &rarr;
        </button>
        </div>
        </div>

      </div>

     

     
      </div>

      <div className='w-[100%] lg:w-[100%] xl:w-[32%] h-[40%]'>
           <div className='bg-stone-800 py-7 w-full rounded-tl-md rounded-tr-md'>
              Recent Activity
           </div>

           <div className='bg-stone-700 w-full overflow-y-scroll'>
           {
             activitData &&  activitData.map((item,index)=>(
              <div key={index} className='py-2 border-b p-1'>
                 <p>BN Id: {item.bn_id}</p>
                 <p> Amount : {item.amount}</p>
                 <p>Address: {item.reg_user_address}</p>
                 <p>Time: {item.timestamp}</p>

              </div>
             ))
           }
           </div>
      </div>

     </div>

    </div>
  )
}

export default Page