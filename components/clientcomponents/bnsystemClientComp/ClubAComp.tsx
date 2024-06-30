"use client";
import React, { useEffect, useRef, useState } from "react";
import ClubAStructure from "./ClubAStructure";
import { v4 as uuidv4 } from "uuid";
import { RiGroupLine } from "react-icons/ri";
import { Progress } from "@/components/ui/progress";

interface ClubACompType {
    PlanetName: string;
    PlanetPrice?: number;
    Recycle: number;
    Members: number;
    globalCount: number;
}

const ClubAComp = ({ PlanetName, PlanetPrice, Members, Recycle, globalCount }: ClubACompType) => {
    const [value, setValue] = useState<number>(60);
    const uniqueId = useRef<string>(uuidv4());
    const getPlanetPackage = (planetId: string): string | undefined => {
        const planetNames: { [id: string]: string } = {
            Earth: "10$",
            Moon: "25$",
            Mars: "50$",
            Mercury: "100$",
            Venus: "250$",
            Jupiter: "500$",
            Saturn: "1000$",
            Uranus: "2500$",
            Neptune: "5000$",
            Pluto: "10000$",
        };

        return planetNames[planetId];
    };

    useEffect(() => {
        // Calculate the progress value based on globalCount
        if (globalCount >= 1 && globalCount <= 12) {
            setValue(globalCount * 8.33);
        } else {
            setValue(0);
        }
    }, [globalCount]);

    return (
        <div className="w-[21rem] md:w-[16rem] xl:[15rem] 2xl:w-[95%] bg-[#262626] rounded-md py-1 ">
            <div className="flex items-center justify-between py-2 px-2">
                <span>
                    {PlanetName} {getPlanetPackage(PlanetName)}
                </span>
                <span className="mr-5">{Recycle} Cycles</span>
                <span className="flex items-center">
                    {Members} <RiGroupLine />
                </span>
            </div>
            <div className="relative">
                <ClubAStructure key={uniqueId.current} PlanetName={PlanetName} globalCount={globalCount} />
            </div>

            <div className="flex items-center justify-center py-4"></div>

            <div className="py-3 px-2 relative">
                <Progress value={value} />
                <div className={`absolute top-1 right-[1%] bg-black rounded-xl p-1 text-xs`}>
                    {Number(value).toFixed(2)}%
                </div>
            </div>
        </div>
    );
};

export default ClubAComp;
