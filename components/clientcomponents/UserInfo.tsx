import React, { useContext } from "react";
import { FaDirections, FaRegCopy } from "react-icons/fa";
import { GiTeamDowngrade } from "react-icons/gi";
import { Context } from "../Context";

const UserInfo = () => {
    const { userAddress } = useContext(Context);

    const copyToClipboard = (text: string) => {
        try {
            navigator.clipboard.writeText(text);
            alert("Copied");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
            <div className="bg-black py-4 my-2 sm:w-96  md:w-96 px-3 rounded-md">
                <div className="flex items-center justify-between pb-1">
                    <div>
                        <span className="text-zinc-500">My BN ID: </span>
                        <span>BNO91287</span>
                    </div>
                    <div>
                        <FaRegCopy />
                    </div>
                </div>
                <hr />
                <div className="flex items-center justify-between pt-1">
                    <div>
                        <span className="text-zinc-500">Current Package : </span>
                        <span>$ 5000(Pluto)</span>
                    </div>
                    <div>
                        <FaRegCopy />
                    </div>
                </div>
            </div>

            <p className="py-2">My Upline: </p>
            <div className="bg-black py-4   px-3 rounded-md">
                <div className="flex items-center justify-between pb-1">
                    <div>
                        <span className="text-zinc-500">Upline BN ID: </span>
                        <span>BNO52767</span>
                    </div>
                    <div>
                        <FaRegCopy />
                    </div>
                </div>
                <hr />
                <div className="flex items-center justify-between pt-1">
                    <div>
                        <span className="text-zinc-500">Upline Wallet : </span>
                        <span>{`${userAddress?.slice(0, 8)}...${userAddress?.slice(
                            userAddress?.length - 8,
                            userAddress?.length
                        )}`}</span>
                    </div>
                    <div>
                        <FaRegCopy className="cursor-pointer" onClick={() => copyToClipboard(userAddress)} />
                    </div>
                </div>
            </div>

            <div className="bg-black py-4  px-3 mt-4 rounded-md">
                <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-x-2">
                        <span>
                            <FaDirections />
                        </span>
                        <span className="text-zinc-500 text-xl font-bold">Direct Team: </span>
                        <span>BNO52767</span>
                    </div>
                </div>
                <hr />
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-x-1">
                        <span>
                            <GiTeamDowngrade />
                        </span>
                        <span className="text-zinc-500 text-xl font-bold">Total Team : </span>
                        <span>4191</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
