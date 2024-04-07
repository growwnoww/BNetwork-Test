"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import classNames from "classnames";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Context } from "@/components/Context";
import Token_ABI from "@/contract/Token_ABI.json";
import { SelectData } from "@/utils/SelectData";
import { WalletContext } from "@/context/WalletContext";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import BNetworkABI from "@/contract/BNetwork_ABI.json";
import axios from "axios";

interface userDetailsType {
    regUser: string;
    regTime: string;
    regId: number;
    regReferal: string;
    regReferalId: number;
    teamCount: number;
    reg_transaction_hash?: string;
    highestPlanetCount: number;
}

const Page = () => {
    const [selectedOption, setSelectedOption] = useState<string>("Registration");
    const walletContext = useContext(WalletContext);
    const userAddress = walletContext?.userAddress;
    const [isApprove, setApprove] = useState<boolean>(false);
    const [allow, setAllow] = useState<string>("");
    const [value, setValue] = useState<any>({
        yourAddress: "",
        refferalAddress: "",
        beliverAddress: "",
        package: "",
    });
    const [userDetails, setUserDetails] = useState<userDetailsType>();
    const { isConnected } = useWeb3ModalAccount();
    const [tranxHashhh, setTranxHash] = useState("");

    const { walletProvider } = useWeb3ModalProvider();
    const B_Network_Address = "0x5ea64Ab084722Fa8092969ED45642706978631BD";

    const handleSelectPackageChange = (selectedValue: string) => {
        setValue((prevState: any) => ({
            ...prevState,
            package: selectedValue,
        }));
    };

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const getPlanetId = (planetName: string): number => {
        const planetNames: { [id: string]: number } = {
            Earth: 1,
            Moon: 2,
            Mars: 3,
            Mercury: 4,
            Venus: 5,
            Jupiter: 6,
            Saturn: 7,
            Uranus: 8,
            Neptune: 9,
            Pluto: 10,
        };

        return planetNames[planetName];
    };

    const getUserDetail = async (tranxHash: string) => {
        try {
            if (!userAddress || !isConnected) {
                return;
            }

            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);

            const exists = await BNetworkContract.isUserExists(value.beliverAddress);

            if (exists) {
                const response = await BNetworkContract.RegisterUserDetails(value.beliverAddress);
                console.log("Believer address", value.beliverAddress);
                const highestPlanetCount = await BNetworkContract.UserPlannet(value.beliverAddress);
                console.log("Believer address", value.beliverAddress);
                console.log("Got user details", response);

                const formattedResponse: userDetailsType = {
                    regUser: String(response.regUser).toLowerCase(),
                    regTime: ethers.BigNumber.from(response.regTime).toString(), // or .toNumber() if safe
                    regId: ethers.BigNumber.from(response.regId).toNumber(),
                    regReferal: String(response.regReferal).toLowerCase(),
                    regReferalId: ethers.BigNumber.from(response.regReferalId).toNumber(), // Assuming this is already a number
                    teamCount: ethers.BigNumber.from(response.teamCount).toNumber(),
                    highestPlanetCount: ethers.BigNumber.from(highestPlanetCount).toNumber(),
                };

                setTranxHash(tranxHash);
                setUserDetails(formattedResponse);

                console.log("Refined Data", formattedResponse);
            }
        } catch (error) {
            console.log("Something wrong in userDetailsFUnc", error);
        }
    };

    const createUser = async (tranxHash: string) => {
        try {
            console.log("reg user", userDetails?.regUser);
            const owner = "0xf346c0856df3e220e57293a0cf125c1322cfd778";
            let uplineAddrLocal = "";
            let uplineBNIdLocal = "";

            // Use userDetails directly now, assuming it has been set by this point
            if (
                userDetails?.regReferal === "0x0000000000000000000000000000000000000000" ||
                !userDetails?.regReferalId
            ) {
                uplineAddrLocal = owner;
                uplineBNIdLocal = "BN" + owner.substring(owner.length - 8);
            } else {
                uplineAddrLocal = userDetails.regReferal;
                uplineBNIdLocal = "BN" + userDetails.regReferal.substring(userDetails.regReferal.length - 8);
            }

            const payload = {
                reg_user_address: userDetails?.regUser,
                reg_time: userDetails?.regTime,
                regId: userDetails?.regId,
                upline_referral_address: uplineAddrLocal,
                upline_referralId: userDetails?.regReferalId,
                upline_referral_BNId: uplineBNIdLocal,
                direct_count: userDetails?.teamCount,
                reg_transaction_hash: tranxHash,
            };

            console.log("hellow", payload);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/user/createUserDetails`, payload);

            if (res.data) {
            } else {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        } catch (error) {
            console.error("Error in createRegister:", error);
        }
    };

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

    const getPlanet = async (planetId: number, transactionHash: string, believerAddress: string) => {
        try {
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);

            const currentTreenumber = await BNetworkContract.UserID(planetId, believerAddress);
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

    const registerUser = async (e: any) => {
        e.preventDefault();

        try {
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);

            const gasPrice = await signer.getGasPrice();

            console.log("before reg refferelAddress", value.refferalAddress);
            console.log("before reg believer", value.beliverAddress);
            const isReferrel = await BNetworkContract.isUserExists(value.refferalAddress);
            if (!isReferrel) {
                alert("Referral Address is not registered");
                return;
            }

            const isUserExist = await BNetworkContract.isUserExists(value.beliverAddress);
            const gasFee = await BNetworkContract.gasfees();
            const convert = Number(gasFee?._hex).toString();
            console.log(convert);
            if (!value.refferalAddress || !value.beliverAddress) {
                alert("Some value is missing");
                return;
            }
            if (isUserExist === false) {
                console.log("before reg refferelAddress", value.refferalAddress);
                console.log("before reg refferelAddress", value.beliverAddress);
                const registration = await BNetworkContract.registrations_user(
                    value.refferalAddress,
                    value.beliverAddress,
                    {
                        gasPrice: gasPrice,
                        gasLimit: "200000",
                        value: convert,
                    }
                );
                await registration.wait();
                alert("New Believer created successfully! 🚀");
                console.log(registration);
            } else {
                alert("You already registered");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const approveUSDT = async () => {
        try {
            alert(
                "🚸The USDT approval amount must be equal to or greater than the planet purchase amount. Otherwise, your transaction will fail, and you will lose your gas fee. ⚠"
            );
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);

            const gasPrice = await signer.getGasPrice();
            // const myContract = BNetwork();
            const planetById = getPlanetId(value.package);
            const newBelieverCurrentPlanet = await BNetworkContract.userPlannet(value.beliverAddress);

            if (newBelieverCurrentPlanet >= planetById) {
                alert(`New Believer Already Has ${value.package} Planet`);
                return;
            }
            const getFeeTokenAddress = await BNetworkContract.getFeeToken();
            const secondInstance = new ethers.Contract(getFeeTokenAddress, Token_ABI, signer);
            const planetName =
                value.package === "Earth"
                    ? "5000000000000000000"
                    : value.package === "Moon"
                    ? "10000000000000000000"
                    : value.package === "Mars"
                    ? "25000000000000000000"
                    : value.package === "Mercury"
                    ? "50000000000000000000"
                    : value.package === "Venus"
                    ? "100000000000000000000"
                    : value.package === "Jupiter"
                    ? "250000000000000000000"
                    : value.package === "Saturn"
                    ? "500000000000000000000"
                    : value.package === "Uranus"
                    ? "1000000000000000000000"
                    : value.package === "Neptune"
                    ? "2500000000000000000000"
                    : value.package === "Pluto"
                    ? "5000000000000000000000"
                    : "5000000000000000000";
            const approve = await secondInstance.approve(BNetworkContract.address, planetName, {
                gasPrice: gasPrice,
                gasLimit: "200000",
            });
            await approve.wait();
            setApprove(true);
            console.log(approve);
        } catch (error) {
            console.log(error);
        }
    };

    const checkApproveUSDT = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);

            const getFeeTokenAddress = await BNetworkContract.getFeeToken();
            const secondInstance = new ethers.Contract(getFeeTokenAddress, Token_ABI, signer);
            const checkAllowance = await secondInstance.allowance(userAddress, BNetworkContract.address);
            const allowance = Number(checkAllowance?._hex);
            setAllow(allowance.toString());
        } catch (error) {
            console.log(error);
        }
    };

    const buyPlanetUser = async (e: any) => {
        e.preventDefault();
        try {
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);

            const gasPrice = await signer.getGasPrice();
            const planetById = getPlanetId(value.package);

            const isUserExist = await BNetworkContract.isUserExists(value.beliverAddress);
            if (!isUserExist) {
                alert("New Believer is not registered!");
                return;
            }

            if (planetById && value.beliverAddress) {
                console.log("planet id", planetById);
                const buyPlanet = await BNetworkContract.buyPlannet_user(planetById, value.beliverAddress, {
                    gasPrice: gasPrice,
                    gasLimit: ethers.utils.hexlify(1000000),
                });
                await buyPlanet.wait();
                console.log(buyPlanet);

                alert(`Planet ${value.package}  Buy Successfully! 🚀`);
            } else {
                alert("Some value is missing");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkApproveUSDT();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setApprove(false);
    }, [value]);

    useEffect(() => {
        if (tranxHashhh && userDetails) {
            createUser(tranxHashhh);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tranxHashhh, userDetails]);

    return (
        <div>
            <div className="flex items-center justify-center">
                <p className="text-2xl my-5 w-fit font-semibold border-b-4 border-b-yellow-500">Create New Believer</p>
            </div>

            <div className="w-full h-full items-center justify-center flex flex-col my-4  ">
                <div className="w-fit  flex flex-col  ">
                    <div className="flex items-center justify-center">
                        <div className="my-3">
                            {["Registration", "Buy Planet"].map((option) => (
                                <Button
                                    key={option}
                                    className={classNames(
                                        "text-md mx-4  py-2 px-6 rounded-md transition-all duration-300",
                                        {
                                            "bg-yellow-500 hover:bg-yellow-700 text-white": selectedOption === option,
                                            "bg-zinc-800 text-gray-300": selectedOption !== option,
                                        }
                                    )}
                                    onClick={() => handleOptionChange(option)}
                                >
                                    {option}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        {selectedOption === "Registration" ? (
                            <form
                                action=""
                                className="w-[90%] md:w-full flex flex-col items-start  gap-y-5 px-4  bg-zinc-900 py-4 lg:px-6 rounded-lg "
                                onSubmit={registerUser}
                            >
                                <label htmlFor="">Your Address</label>
                                <Input
                                    type="text"
                                    placeholder="Enter your address"
                                    className="w-60 md:w-96 text-xs md:text-md"
                                    value={userAddress || value?.yourAddress}
                                    onChange={(e) => setValue({ ...value, yourAddress: e.target.value })}
                                />
                                <label htmlFor="">Referral Address</label>
                                <Input
                                    type="text"
                                    placeholder="Enter your referral address"
                                    value={value.refferalAddress}
                                    className="w-60 md:w-96 text-xs md:text-md"
                                    onChange={(e) => setValue({ ...value, refferalAddress: e.target.value })}
                                />
                                <label htmlFor="">New Believer Address</label>
                                <Input
                                    type="text"
                                    placeholder="Enter new believer address"
                                    value={value.beliverAddress}
                                    className="w-60 md:w-96 text-xs md:text-md"
                                    onChange={(e) => setValue({ ...value, beliverAddress: e.target.value })}
                                />

                                <div className="w-full flex items-center justify-center">
                                    <Button type="submit" variant="custom_yellow" className="w-fit px-6">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div className="w-[90%] md:w-ful flex flex-col items-center px-4 gap-y-5 bg-zinc-900  rounded-lg">
                                <form action="" className="flex flex-col gap-y-5 py-4 px-6" onSubmit={buyPlanetUser}>
                                    <label htmlFor="">Your Address</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter your address"
                                        className="w-60 md:w-96 text-xs md:text-md"
                                        value={userAddress || value?.yourAddress}
                                        onChange={(e) => setValue({ ...value, yourAddress: e.target.value })}
                                    />
                                    <label htmlFor="">Believer Address</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter  believer address"
                                        value={value.beliverAddress}
                                        className="w-60 md:w-96 text-xs md:text-md"
                                        onChange={(e) => setValue({ ...value, beliverAddress: e.target.value })}
                                    />
                                    <label>Select Planet Package</label>
                                    <Select
                                        name="selectedPackage"
                                        value={value.package}
                                        onValueChange={handleSelectPackageChange}
                                    >
                                        <SelectTrigger className="w-[180px] border border-yellow-400">
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {SelectData.map((item) => (
                                                <SelectItem key={item.id} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <div className="w-full flex items-center justify-center">
                                        {isApprove ? (
                                            <Button type="submit" variant="custom_yellow" className="w-fit px-6">
                                                Submit
                                            </Button>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </form>

                                {isApprove ? (
                                    ""
                                ) : (
                                    <div className="w-full flex items-center justify-center my-4">
                                        <Button variant="custom_yellow" onClick={approveUSDT}>
                                            Approve
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
