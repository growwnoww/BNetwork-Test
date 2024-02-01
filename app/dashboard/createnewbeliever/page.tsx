"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import classNames from "classnames";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useContext, useState } from "react";
import { bNetwork, signer } from "@/contract/Web3_Instance";
import { ethers } from "ethers";
import { Context } from "@/components/Context";

const Page = () => {
    const [selectedOption, setSelectedOption] = useState<string>("Registration");
    const { userAddress } = useContext(Context);
    const [value, setValue] = useState<any>({
        refferalAddress: "",
        beliverAddress: "",
        package: "",
    });

    console.log(value);

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const registerUser = async (e: any) => {
        e.preventDefault();
        try {
            const signers = signer;
            const gasPrice = await signers.getGasPrice();

            const myContract = bNetwork();
            const userExisit = await myContract.isUserExists(userAddress);
            if (!value.refferalAddress || !value.beliverAddress) {
                alert("Some value is missing");
                return;
            }
            if (userExisit === false) {
                const registration = await myContract.registrations_user(value.refferalAddress, value.beliverAddress, {
                    gasPrice: gasPrice,
                    gasLimit: "200000",
                    value: ethers.utils.parseEther("0.002"),
                });
                await registration.wait();
                console.log(registration);
            } else {
                alert("You already registered");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const buyPlanetUser = async (e: any) => {
        e.preventDefault();
        try {
            const signers = signer;
            const gasPrice = await signers.getGasPrice();

            const myContract = bNetwork();
            if (value.package && value.beliverAddress) {
                const buyPlanet = await myContract.buyPlannet_user(value.package, value.beliverAddress, {
                    gasPrice: gasPrice,
                    gasLimit: "200000",
                });
                await buyPlanet.wait();
                console.log(buyPlanet);
            } else {
                alert("Some value is missing");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center">
                <p className="text-2xl w-fit font-semibold border-b-4 border-b-yellow-500">Create New Believer</p>
            </div>

            <div className="w-full flex flex-col items-center justify-center mt-5">
                <Button variant="custom_yellow">Approve</Button>
                <p className="text-zinc-500 mt-2">Please, Approve the wallet before proceeding further</p>
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

                    {selectedOption === "Registration" ? (
                        <form
                            action=""
                            className="flex flex-col gap-y-5 bg-zinc-900 py-4 px-6 rounded-lg"
                            onSubmit={registerUser}
                        >
                            <label htmlFor="">Your Address</label>
                            <Input type="text" placeholder="Enter your address" className="w-96" value={userAddress} />
                            <label htmlFor="">Referral Address</label>
                            <Input
                                type="text"
                                placeholder="Enter your referral address"
                                value={value.refferalAddress}
                                onChange={(e) => setValue({ ...value, refferalAddress: e.target.value })}
                            />
                            <label htmlFor="">New Believer Address</label>
                            <Input
                                type="text"
                                placeholder="Enter new believer address"
                                value={value.beliverAddress}
                                onChange={(e) => setValue({ ...value, beliverAddress: e.target.value })}
                            />

                            <div className="w-full flex items-center justify-center">
                                <Button type="submit" variant="custom_yellow" className="w-fit px-6">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <form
                            action=""
                            className="flex flex-col gap-y-5 bg-zinc-900 py-4 px-6 rounded-lg"
                            onSubmit={buyPlanetUser}
                        >
                            <label htmlFor="">Your Address</label>
                            <Input type="text" placeholder="Enter your address" className="w-96" value={userAddress} />
                            <label htmlFor="">Believer Address</label>
                            <Input
                                type="text"
                                placeholder="Enter  believer address"
                                value={value.beliverAddress}
                                onChange={(e) => setValue({ ...value, beliverAddress: e.target.value })}
                            />
                            <label>Select Package</label>
                            <Select>
                                <SelectTrigger className="w-[180px] border border-yellow-400">
                                    <SelectValue
                                        placeholder=""
                                        onChange={(e: any) => setValue({ ...value, package: e.target.value })}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Earth 5$</SelectItem>
                                    <SelectItem value="2">Moon 10$</SelectItem>
                                    <SelectItem value="3">Mars 25$</SelectItem>
                                    <SelectItem value="4">Venus 50$</SelectItem>
                                    <SelectItem value="5">Mercury 100$</SelectItem>
                                    <SelectItem value="6">Jupiter 250$</SelectItem>
                                    <SelectItem value="7">Saturn 500$</SelectItem>
                                    <SelectItem value="8">Uranus 1000$</SelectItem>
                                    <SelectItem value="9">Neptune 2500$</SelectItem>
                                    <SelectItem value="10">Pluto 5000$</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="w-full flex items-center justify-center">
                                <Button type="submit" variant="custom_yellow" className="w-fit px-6">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
