"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import classNames from "classnames";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



import React, { useState } from "react";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Registration");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <p className="text-2xl w-fit font-semibold border-b-4 border-b-yellow-500">
          Create New Believer
        </p>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-5">
        <Button variant='custom_yellow'>Approve</Button>
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
                      "bg-yellow-500 hover:bg-yellow-700 text-white":
                        selectedOption === option,
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
            >
              <label htmlFor="">Your Address</label>
              <Input
                type="text"
                placeholder="Enter your address"
                className="w-96"
              />
              <label htmlFor="">Referral Address</label>
              <Input type="text" placeholder="Enter your referral address" />
              <label htmlFor="">New Believer Address</label>
              <Input type="text" placeholder="Enter new believer address" />

              <div className="w-full flex items-center justify-center">
              <Button type="submit" variant= 'custom_yellow' className="w-fit px-6">Submit</Button>
              </div>
            </form>
          ) : (
            <form action=""
            className="flex flex-col gap-y-5 bg-zinc-900 py-4 px-6 rounded-lg"
            >
              <label htmlFor="">Your Address</label>
              <Input
                type="text"
                placeholder="Enter your address"
                className="w-96"
              />
              <label htmlFor="">Believer Address</label>
              <Input type="text" placeholder="Enter  believer address" />
              <label>Select Package</label>
              <Select>
                <SelectTrigger className="w-[180px] border border-yellow-400">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Earth">Earth 5$</SelectItem>
                  <SelectItem value="Moon">Moon 10$</SelectItem>
                  <SelectItem value="Mars">Mars 25$</SelectItem>
                  <SelectItem value="Venus">Venus 50$</SelectItem>
                  <SelectItem value="Mercury">Mercury 100$</SelectItem>
                  <SelectItem value="Jupiter">Jupiter 250$</SelectItem>
                  <SelectItem value="Saturn">Saturn 500$</SelectItem>
                  <SelectItem value="Uranus">Uranus 1000$</SelectItem>
                  <SelectItem value="Neptune">Neptune 2500$</SelectItem>
                  <SelectItem value="Pluto">Pluto 5000$</SelectItem>
                </SelectContent>
              </Select>

              <div className="w-full flex items-center justify-center">
              <Button type="submit" variant= 'custom_yellow' className="w-fit px-6">Submit</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
