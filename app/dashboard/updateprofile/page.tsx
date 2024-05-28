"use client";
import React, { FormEvent, useState } from "react";
import classNames from "classnames";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
const Page = () => {
    const submitHandler = (e: FormEvent) => [e.preventDefault()];

    const [userInfo, setUserInfo] = useState({
        name: "",
        uplineBnid: "",
        uplineMobileNo: "",
        country: "",
        mobileNo: "",
        email: "",
    });

    const handleSelectPackageChange = (selectedValue: string) => {
        setUserInfo((prevState: any) => ({
            ...prevState,
            country: selectedValue,
        }));
    };

    const createRegister = async (e: any) => {
        e.preventDefault();
        try {
            const payload = {
                // Include your data here
                name: userInfo.name,
                email: userInfo.email,
                upline_id: userInfo.uplineBnid,
                upline_mobile_no: userInfo.uplineMobileNo,
                country: userInfo.country,
                mobile_no: userInfo.mobileNo,
            };

            await axios.post(`${process.env.NEXT_PUBLIC_URL}/createUser`, payload).then((data) => console.log(data));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black z-50">
            <div className="w-full max-w-lg mx-auto bg-[#121212] rounded-lg shadow-lg p-8">
                <h2 className="text-4xl bg-gradient-to-r from-orange-300 to-yellow-400 bg-clip-text text-transparent text-center font-bold mb-6">
                    Update You&rsquo;re Profile
                </h2>

                <div>
                    <form action="" className="flex flex-col gap-y-2" onSubmit={createRegister}>
                        <label htmlFor="">Name</label>
                        <Input
                            type="text"
                            placeholder="Enter a name"
                            className=" border-yellow-400"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        />
                        <label htmlFor="">Upline BN Id</label>
                        <Input
                            type="text"
                            placeholder="Enter Upline Id"
                            className=" border-yellow-400"
                            value={userInfo.uplineBnid}
                            onChange={(e) => setUserInfo({ ...userInfo, uplineBnid: e.target.value })}
                        />
                        <label htmlFor="">Upline Mobile No</label>
                        <Input
                            type="text"
                            placeholder="Enter Upline mobile no."
                            className=" border-yellow-400"
                            value={userInfo.uplineMobileNo}
                            onChange={(e) => setUserInfo({ ...userInfo, uplineMobileNo: e.target.value })}
                        />

                        <label htmlFor="">Select Country</label>
                        <Select value={userInfo.country} onValueChange={handleSelectPackageChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="India">India</SelectItem>
                                    <SelectItem value="south_africa">South Africa</SelectItem>
                                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                    <SelectItem value="france">france</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <label htmlFor=""> Mobile No</label>
                        <Input
                            type="text"
                            placeholder="Enter  mobile no."
                            className=" border-yellow-400"
                            value={userInfo.mobileNo}
                            onChange={(e) => setUserInfo({ ...userInfo, mobileNo: e.target.value })}
                        />

                        <label htmlFor="">Email Id</label>
                        <Input
                            type="email"
                            placeholder="john@gmail.com"
                            className=" border-yellow-400"
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        />

                        <div className="text-center py-4">
                            <button className="bg-yellow-500 px-10 py-1 rounded-md" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
