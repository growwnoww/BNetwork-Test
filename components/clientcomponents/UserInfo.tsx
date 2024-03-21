"use client";
import useLatestPlanet from "@/Hooks/useLatestPlanet";
import useOwner from "@/Hooks/useOwner";
import { WalletContext } from "@/context/WalletContext";
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { FaDirections, FaRegCopy } from "react-icons/fa";
import { GiTeamDowngrade } from "react-icons/gi";
import BNetworkABI from "@/contract/BNetwork_ABI.json";

interface userDetailsInfo {
    bn_id: string;
    reg_user_address: string;
    reg_time: string;
    upline_referral_address: string;
    upline_referral_BNId: string;
    direct_count: number;
}

const UserInfo = () => {
    const walletContext = useContext(WalletContext);
    const userAddress = walletContext?.userAddress;
    const planetCountContract = useLatestPlanet();
    const planetCount = ethers.BigNumber.from(planetCountContract).toNumber();

    const userDirectTeam = walletContext?.planetStatus?.direct_count || "0";
    const userTotalTeam = walletContext?.planetStatus?.totalTeamCount || "0";

    console.log("usertotal team", userTotalTeam);

    const ownerContract = useOwner();

    const [totalCount, setTotalCount] = useState<number>(0);

    console.log(ownerContract);

    const [userDetails, setUserDetails] = useState<userDetailsInfo>();

    const [packageFee, setPackageFee] = useState<any>();
    const { walletProvider } = useWeb3ModalProvider();
    const B_Network_Address = "0x5ea64Ab084722Fa8092969ED45642706978631BD";

    const copyToClipboard = (text: any): void => {
        try {
            navigator.clipboard.writeText(text);
            alert("Copied");
        } catch (error) {
            console.log(error);
        }
    };

    const getPlanetInString = (planetId: number): string | undefined => {
        const planetNames: { [id: number]: string } = {
            1: "Earth",
            2: "Moon",
            3: "Mars",
            4: "Mercury",
            5: "Venus",
            6: "Jupiter",
            7: "Saturn",
            8: "Uranus",
            9: "Neptune",
            10: "Pluto",
        };

        return planetNames[planetId];
    };

    const userCurrentPlanet = getPlanetInString(planetCount);

    const getUserDetails = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/user/getUserDetails?reg_user_address=${userAddress}`
            );
            if (response) {
                const data: userDetailsInfo = await response.json();
                console.log("User detail from get req ", data);
                setUserDetails(data);
            } else {
                throw new Error(`HTTP error! status: res} $`);
            }
        } catch (error) {
            console.log("something went wrong in getUserDetails", error);
        }
    };

    const userPlanet = async () => {
        try {
            // const myContract = BNetwork();
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);
            const planet = await BNetworkContract.UserPlannet(userAddress);
            const num = Number(planet?._hex);
            const plannetDetails = await BNetworkContract.MatrixDetails(num);
            setPackageFee(Number(ethers.utils.formatEther(plannetDetails?.fee?._hex)).toFixed(0));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        userPlanet();
        getUserDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="md:text-sm">
            <div className="bg-black py-4 my-2 sm:w-96  md:w-auto  px-3  rounded-md md:text-sm">
                <div className="flex items-center justify-between pb-1">
                    <div>
                        <span className="text-zinc-500">My Address: </span>
                        <span className="text-md">{`${userAddress?.slice(0, 8)}...${userAddress?.slice(
                            userAddress?.length - 8,
                            userAddress?.length
                        )}`}</span>
                    </div>
                    <div>
                        <FaRegCopy className="cursor-pointer" onClick={() => copyToClipboard(userAddress)} />
                    </div>
                </div>

                <div className="flex items-center justify-between pb-1">
                    <div>
                        <span className="text-zinc-500">My BN ID: </span>
                        <span>{userDetails ? `${userDetails.bn_id}` : "NA"}</span>
                    </div>
                    <div>
                        <FaRegCopy
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(`${userDetails?.bn_id}`)}
                        />
                    </div>
                </div>
                <hr />
                <div className="flex items-center justify-between pt-1">
                    <div>
                        <span className="text-zinc-500">Current Package : </span>
                        <span className="md:text-xs">
                            {`${userCurrentPlanet} `}
                            {userCurrentPlanet === "Earth"
                                ? " 5 $"
                                : userCurrentPlanet === "Moon"
                                ? " 10 $"
                                : userCurrentPlanet === "Mars"
                                ? "25 $"
                                : userCurrentPlanet === "Mercury"
                                ? "50 $"
                                : userCurrentPlanet === "Venus"
                                ? "100 $"
                                : userCurrentPlanet === "Jupiter"
                                ? "250 $"
                                : userCurrentPlanet === "Saturn"
                                ? "500 $"
                                : userCurrentPlanet === "Uranus"
                                ? "1000 $"
                                : userCurrentPlanet === "Neptune"
                                ? "2500 $"
                                : userCurrentPlanet === "Pluto"
                                ? "5000 $"
                                : "Empty"}
                        </span>
                    </div>
                </div>
            </div>

            <p className="py-2">My Upline: </p>
            <div className="bg-black py-4   px-3 rounded-md ">
                <div className="flex items-center justify-between pb-1 ">
                    <div>
                        <span className="text-zinc-500">Upline BN ID: </span>
                        <span>{userDetails ? `${userDetails.upline_referral_BNId}` : "NA"}</span>
                    </div>
                    <div>
                        <FaRegCopy
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(userDetails ? `${userDetails.upline_referral_BNId}` : "NA")}
                        />
                    </div>
                </div>
                <hr />
                <div className="flex items-center justify-between pt-1">
                    <div>
                        <span className="text-zinc-500">Upline Wallet : </span>
                        <span className="text-md">{`${userDetails?.upline_referral_address?.slice(
                            0,
                            8
                        )}...${userDetails?.upline_referral_address?.slice(
                            userDetails?.upline_referral_address?.length - 8,
                            userDetails?.upline_referral_address?.length
                        )}`}</span>
                    </div>
                    <div className="mt-5 lg:mt-0">
                        <FaRegCopy
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(userDetails?.upline_referral_address)}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-black py-4  px-3 mt-4 rounded-md">
                <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-x-2">
                        <span>
                            <FaDirections />
                        </span>
                        <span className="text-zinc-500 text-xl md:text-sm lg:text-xl font-bold">Direct Team:</span>
                        <span className="md:text-sm ">{userDirectTeam}</span>
                    </div>
                </div>
                <hr />
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-x-1">
                        <span>
                            <GiTeamDowngrade />
                        </span>
                        <span className="text-zinc-500 text-xl font-bold">Total Team : </span>
                        <span>{userTotalTeam}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
