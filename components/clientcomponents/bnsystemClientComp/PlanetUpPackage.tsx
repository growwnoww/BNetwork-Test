"use client";
import useLatestPlanet from "@/Hooks/useLatestPlanet";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FaUserLock } from "react-icons/fa";
import "../../../app/globals.css";
import Link from "next/link";
import USBTToken from "../../../contract/USDTABI.json";
import BNetworkABI from "../../../contract/BNetwork_ABI.json"
import { WalletContext } from "@/context/WalletContext";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PlanetUpgrade_Address } from "@/contract/Web3_Instance";

interface PlanetUpPropsTypes {
    planetId: number;
    imgURL: string;
    packageName: string;
    packagePrice: number;
    treePath: string;
    chartPath: string;
}

const PlanetUpPackage = ({ planetId, imgURL, packageName, packagePrice }: PlanetUpPropsTypes) => {
    const walletContext = useContext(WalletContext);
    // const userAddress = walletContext?.userAddress;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get("preview");
    const {address} = useWeb3ModalAccount();
    const userAddress = address;
    // if (query) {
    //     userAddress = query?.toLowerCase();
    // } else {
    //     userAddress = walletContext?.userAddress?.toLowerCase() || "";
    // }

    const planetCountContract = walletContext?.planetStatus?.planets?.length;
    console.log("high", planetCountContract);
    const [planetCount, setPlanetCount] = useState();

    const [isApprove, setApprove] = useState<boolean>(false);
    const [planetBuy, setPlanetBuy] = useState<boolean>(false);
    const [planetBuyStatus, setPlanetBuyStatus] = useState<Record<number, boolean>>({});
    const [highestPlanetBought, setHighestPlanetBought] = useState<number>(0);

    const { walletProvider } = useWeb3ModalProvider();
    const B_Network_Address = PlanetUpgrade_Address;

    const getPlanetName = (planetId: number): string | undefined => {
        const planetNames: { [id: number]: string } = {
            1: "Earth 5$",
            2: "Moon 10$",
            3: "Mars 25$",
            4: "Mercury 50$",
            5: "Venus 100$",
            6: "Jupiter 250$",
            7: "Saturn 500$",
            8: "Uranus 1000$",
            9: "Neptune 2500$",
            10: "Pluto 5000$",
        };

        return planetNames[planetId];
    };

  

    const getCurrentPlanetStatus = async () => {
        try {
          const provider = new ethers.providers.Web3Provider(walletProvider as any);
          const signer = provider.getSigner();
          const clubAMainContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);
          const clubACont = clubAMainContract;
          console.log("club A ",clubACont)
          const isUserExist = await clubACont!.UserRegister(userAddress);
    
          if (!isUserExist) {
            setHighestPlanetBought(0);
            return;
          }
    
          const currentPlanet = await clubACont!.getPackage(userAddress);
          console.log("currentpLnaet", currentPlanet);
    
          if (typeof currentPlanet === "undefined") {
            throw new Error("Unable to retrieve current planet.");
          }
    
          let planetBoughtNumber = ethers.BigNumber.from(currentPlanet).toNumber();
          console.log("planetBoughtNumber", planetBoughtNumber);
    
          setHighestPlanetBought(planetBoughtNumber);
          return getPlanetName(planetBoughtNumber);
        } catch (error) {
          console.log("something went wrong in getCurrentPlanetStatus", error);
          throw error; // Propagate the error
        }
      };

    const postPlanetBuyInfo = async (
        regAddress: string,
        _planetId: number,
        transactionHash: string,
        universeCount: number
    ) => {
        try {
            const planetNameStr = getPlanetName(_planetId);
            const planetNameOnly = planetNameStr?.split(" ")[0];
            const planetPack = planetNameStr?.split(" ")[1];
            console.log("Planet package ", planetPack);
            const payload = {
                reg_user_address: regAddress,
                planetId: _planetId,
                planetName: planetNameOnly,
                planetPackage: planetPack,
                universeCount: universeCount,
                transactionHash: transactionHash,
            };

            console.log("payload", payload);

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/planetBuy`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.log("Something went wrong in buyPlanet", error);
        }
    };

    const getPlanet = async (planetId: number, transactionHash: string) => {
        try {
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);

            const currentTreenumber = await BNetworkContract.UserID(planetId, userAddress);
            const universeCount = ethers.BigNumber.from(currentTreenumber).toNumber();

            let getUserAddress = await BNetworkContract.WalletdetailsUser(planetId, universeCount);
            let userData = getUserAddress.originalUser;

            const formattedResponse = {
                reg_user_address: userData.toLowerCase(),
            };
            console.log("formattd res", formattedResponse);

            postPlanetBuyInfo(formattedResponse.reg_user_address, planetId, transactionHash, universeCount);
        } catch (error) {}
    };


    const approveUSDT = async () => {
        try {
          alert(
            "🚸The USDT approval amount must be equal to or greater than the planet purchase amount. Otherwise, your transaction will fail, and you will lose your gas fee. ⚠"
          );
    
          const provider = new ethers.providers.Web3Provider(walletProvider as any);
          const signer = provider.getSigner();
          const clubAMainContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);;
          const getFeeTokenAddress = await clubAMainContract!.getFeeToken();
          console.log("USDT TOken address", getFeeTokenAddress);
          const secondInstance = new ethers.Contract(
            getFeeTokenAddress,
            USBTToken,
            signer
          );
          const approveAmt = await secondInstance.balanceOf(userAddress);
          console.log("Approve", approveAmt);
          const approve = await secondInstance.approve(
            clubAMainContract!.address,
            approveAmt
          );
          await approve.wait();
          console.log(approve);
          setApprove(true);
        //   setIsButtonVisible(false);
        } catch (error) {
          console.log(error);
        }
      };
    

 



    const buyPlanetUser = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);
            const gasPrice = await signer.getGasPrice();
            const planetById =
                packageName === "Earth"
                    ? "1"
                    : packageName === "Moon"
                    ? "2"
                    : packageName === "Mars"
                    ? "3"
                    : packageName === "Mercury"
                    ? "4"
                    : packageName === "Venus"
                    ? "5"
                    : packageName === "Jupiter"
                    ? "6"
                    : packageName === "Saturn"
                    ? "7"
                    : packageName === "Uranus"
                    ? "8"
                    : packageName === "Neptune"
                    ? "9"
                    : packageName === "Pluto"
                    ? "10"
                    : "null";
            console.log(planetById);
            const buyPlanet = await BNetworkContract.buyPlannet(planetById);
            await buyPlanet.wait();
            console.log(buyPlanet);
            const transactionHash = buyPlanet.hash;
            console.log(`Transaction hash: ${transactionHash}`);
            getPlanet(planetId, transactionHash);
            setPlanetBuy(true);
            alert(`Planet Buy Successfully! 🚀 To See Changes On Website. Please The refersh the page.`);
            setPlanetBuyStatus((prevStatus) => ({ ...prevStatus, [planetId]: true }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const latestBought = planetCount ?? 0;
        setHighestPlanetBought(latestBought);

        if (planetBuy) {
            setPlanetBuyStatus((prev) => ({ ...prev, [latestBought!]: true }));

            console.log(`planet id   ${planetId} and lasteBougt ${latestBought}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [planetCount, query]);

    useEffect(() => {
        getCurrentPlanetStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [planetCount, query]);

    useEffect(() => {
        router.replace(`${pathname}?preview=${walletContext?.previewAddress}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative z-0  flex flex-col bg-zinc-800 rounded-md  m-2 mx-5">
            <div className=" flex items-center justify-between w-full px-2 py-3 ">
                <div className="text-xl flex items-start justify-start">
                    <p>
                        {packageName} <span>{packagePrice}$</span>
                    </p>
                </div>
            </div>

            <div className="z-10 absolute top-[43%] right-[44%] flex flex-col items-center text-xl font-semibold">
                {planetId <= highestPlanetBought ? (
                    ""
                ) : planetId === highestPlanetBought + 1 ? (
                    isApprove ? (
                        planetBuy ? (
                            ""
                        ) : (
                            <button
                                className="bg-yellow-400 py-1 px-5 translate-x-10 mt-5 rounded-md hover:bg-yellow-600 duration-300"
                                onClick={buyPlanetUser}
                            >
                                Upgrade
                            </button>
                        )
                    ) : (
                        <button
                            className="bg-yellow-500 py-1 px-5 translate-x-10 mt-5 rounded-md hover:bg-yellow-600 duration-300"
                            onClick={approveUSDT}
                        >
                            Approve
                        </button>
                    )
                ) : (
                    <span className="text-5xl">
                        <FaUserLock className="text-white" />
                    </span>
                )}
            </div>
            <div
                className={`flex items-center justify-center bg-black py-10 px-10 ${
                    planetId <= highestPlanetBought || planetBuy ? "" : "blur-sm"
                }`} // Remove blur-sm based on planetBuy status
            >
                <Image
                    src={imgURL}
                    alt={imgURL}
                    height={150}
                    width={150}
                    loading="lazy"
                    className={`${packageName == "Saturn" ? "" : "custom-spin"}`}
                />
            </div>
            <div className="flex items-center justify-center py-3">
                {planetId <= highestPlanetBought || planetBuy ? ( // If planet is bought or current planet is less than or equal to the highest bought
                    <div className="flex flex-col items-center gap-y-1">
                        <Link
                            href={`/dashboard/bnsystem/planetupgrade/${
                                getPlanetName(planetId)?.split(" ")[0]
                            }?preview=${query}`}
                            passHref
                        >
                            <button className="bg-yellow-500 py-1 px-5 flex items-center gap-x-1 rounded-md hover:bg-yellow-600 duration-300">
                                <span>View tree</span>
                            </button>
                        </Link>
                    </div>
                ) : planetId === highestPlanetBought + 1 ? (
                    isApprove ? (
                        ""
                    ) : (
                        ""
                    )
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default PlanetUpPackage;
