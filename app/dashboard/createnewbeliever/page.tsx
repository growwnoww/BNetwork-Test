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
} from "@/components/ui/select";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { SelectData } from "@/utils/SelectData";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Registration");

  const [registrationData, setRegistrationData] = useState({
    yourAddress: "",
    referralAddress: "",
    newBelieverAddress: "",
  });

  // States for "Buy Planet"
  const [buyPlanetData, setBuyPlanetData] = useState({
    yourAddress: "",
    believerAddress: "",
    selectedPackage: "Earth",
  });

  const registrationChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegistrationData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buyPlanetChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBuyPlanetData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRegistration = (event: FormEvent) => {
    event.preventDefault();
    console.log(registrationData);
  };

  const handlebuyPlanet = (event: FormEvent) => {
    event.preventDefault();
    console.log(buyPlanetData);
  };

  const handleSelectPackageChange = (selectedValue: string) => {
    setBuyPlanetData(prevState => ({
      ...prevState,
      selectedPackage: selectedValue,
    }));
    console.log(buyPlanetData.selectedPackage)
  };

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
        <Button variant="custom_yellow">Approve</Button>
        <p className="text-zinc-500 mt-2">
          Please, Approve the wallet before proceeding further
        </p>
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
              onSubmit={(e) => handleRegistration(e)}
            >
              <label htmlFor="">Your Address</label>
              <Input
                name="yourAddress"
                type="text"
                placeholder="Enter your address"
                className="w-96"
                value={registrationData.yourAddress}
                onChange={(e) => registrationChangeHandler(e)}
              />
              <label htmlFor="">Referral Address</label>
              <Input
                name="referralAddress"
                type="text"
                placeholder="Enter your referral address"
                value={registrationData.referralAddress}
                onChange={(e) => registrationChangeHandler(e)}
              />
              <label htmlFor="">New Believer Address</label>
              <Input
                name="newBelieverAddress"
                type="text"
                placeholder="Enter new believer address"
                value={registrationData.newBelieverAddress}
                onChange={(e) => registrationChangeHandler(e)}
              />

              <div className="w-full flex items-center justify-center">
                <Button
                  type="submit"
                  variant="custom_yellow"
                  className="w-fit px-6"
                >
                  Submit
                </Button>
              </div>
            </form>
          ) : (
            <form
              action=""
              className="flex flex-col gap-y-5 bg-zinc-900 py-4 px-6 rounded-lg"
              onSubmit={(e) => handlebuyPlanet(e)}
            >
              <label htmlFor="">Your Address</label>
              <Input
                name="yourAddress"
                type="text"
                placeholder="Enter your address"
                className="w-96"
                value={buyPlanetData.yourAddress}
                onChange={(e) => buyPlanetChangeHandler(e)}
              />
              <label htmlFor="">Believer Address</label>
              <Input
                name="believerAddress"
                type="text"
                placeholder="Enter  believer address"
                value={buyPlanetData.believerAddress}
                onChange={(e) => buyPlanetChangeHandler(e)}
              />
              <label>Select Package</label>
              <Select
                // options={perPageDropDownOptions}
                // onValueChange={onValueChange}
                // defaultValue={value}
                name="selectedPackage"
                value={buyPlanetData.selectedPackage}
                onValueChange={handleSelectPackageChange}
              >
                <SelectTrigger className="w-[180px] border border-yellow-400">
                  <SelectValue placeholder=""  />
                </SelectTrigger>
                <SelectContent >
                  {SelectData.map((item) => (
                    <SelectItem key={item.id} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="w-full flex items-center justify-center">
                <Button
                  type="submit"
                  variant="custom_yellow"
                  className="w-fit px-6"
                >
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
