import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface UplineDataType {
    reg_user_address: string;
    latestPlanetName: string;
    reg_time: string;
    direct_count: number;
    totalTeamCount: number;
}

const UplineInfo = ({ uplineAddress }: { uplineAddress: string }) => {
    const [uplineData, setUplineData] = useState<UplineDataType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isTermAccepted,setTermAccepted] = useState<boolean>(false)
    
    function convertUnixTimestampToReadableDate(unixTimestamp:string) {
        if (!unixTimestamp) {
            return 'Invalid Date'; // or some default value or error handling
        }
    
        const time = Number(unixTimestamp);
        if (Number.isNaN(time)) { // Check if conversion resulted in NaN
            return 'Invalid Date'; // or some default value or error handling
        }
    
        const date = new Date(time * 1000); // Convert to milliseconds by multiplying by 1000
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // months from 1-12
        const day = ('0' + date.getDate()).slice(-2);
        const hour = ('0' + date.getHours()).slice(-2);
        const minute = ('0' + date.getMinutes()).slice(-2);
        const second = ('0' + date.getSeconds()).slice(-2);
    
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    
    
   
    
    useEffect(() => {
        const getUplineData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const query = `${process.env.NEXT_PUBLIC_URL}/getUplineData/${uplineAddress}`
                console.log("query",query)
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/getUplineData/${uplineAddress}`);
                if (response.ok) {
                    const data: UplineDataType = await response.json();
                    console.log("data",data)
                    setUplineData(data);
                } else {
                    console.error("Something went wrong in fetching upline data");
                    setError("Verify You're Upline once again, It's not present ");
                }
            } catch (error) {
                console.error("Error fetching upline data:", error);
                setError("Error occurred while fetching upline data");
            } finally {
                setIsLoading(false);
            }
        };

        if (uplineAddress) {
            getUplineData();
        }
    }, [uplineAddress]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!uplineData) return <div>No upline data available</div>;

  return (
    <>
         <div className=" px-5 mx-10 lg:ml-10 ">
            <div className="py-6 flex flex-col items-start justify-start">
              <p className=" text-3xl lg:text-4xl bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-center font-bold mb-6">
                Registration for Believe Network
              </p>
          
            </div>

            <div className="flex items-center  gap-x-4 py-2 ">
              <div className="text-center">
                <Image
                  src={`/${uplineData?.latestPlanetName}.png`}
                  alt={uplineData?.latestPlanetName || "just.png"}
                  height={80}
                  width={80}
                  loading="lazy"
                  className=""
                />

                
              </div>
              <div className="flex flex-col justify-center">
              <p>{uplineData?.latestPlanetName}</p>
                <p className="text-md lg:text-xl">Your Upline</p>
                <p className="text-xs">
                {uplineData?.reg_user_address}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-1/4  gap-x-3 gap-y-3 ">
              <div className="bg-zinc-800 rounded-md py-1 gap-x-1">
                <div className="px-5 lg:text-center">
                  <p className="text-md lg:text-xl">Direct Believer partner</p>
                  <span className="text-md lg:text-xl ">{uplineData?.direct_count}</span>
                </div>
              </div>

              <div className="bg-zinc-800 rounded-md  py-1  gap-x-1">
                <div className="px-5 lg:text-center">
                  <p className="text-md lg:text-xl">Registration Date</p>
                  <span className="text-md lg:text-xl">{convertUnixTimestampToReadableDate(uplineData?.reg_time) }</span>
                </div>
              </div>

              <div className="bg-zinc-800 rounded-md  py-1  gap-x-1">
                <div className="px-5 lg:text-center">
                  <p className="text-md lg:text-xl">Total Team</p>
                  <span className="text-md lg:text-xl">{uplineData?.totalTeamCount}</span>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default UplineInfo