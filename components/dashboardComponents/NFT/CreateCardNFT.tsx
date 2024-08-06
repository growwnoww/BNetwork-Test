"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { clubA_Address } from "@/contract/ClubAContract/ClubA_Instance";
import { ethers } from "ethers";
import {
  NFT_ABI,
  NFT_Address,
  PlanetUpgrade_Address,
  PlanetUprade_ABI,
} from "@/contract/Web3_Instance";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { escape } from "querystring";
import Confetti from "react-confetti";
import AlertDialog from "./AlertDialog";
import NFTAddAlertDialog from "./NFTAddAlertDialog";
import NFTLoader from "./NFTLoader";
import { useRecoilState } from "recoil";
import { updateYourNFTs } from "@/store/atom";

const SelectData = [
  {
    id: 1,
    value: "Just_Ship",
    label: "Just Spaceship",
  },
  {
    id: 2,
    value: "Earth_NFT",
    label: "Earth NFT",
  },
];

const NFTData = [
  {
    id: 1,
    value: "Earth_NFT",
    label: "Earth NFT",
  },
  {
    id: 2,
    value: "Mars_NFT",
    label: "Mars NFT",
  },
  {
    id: 3,
    value: "Venus_NFT",
    label: "Venus NFT",
  },
  {
    id: 4,
    value: "Saturn_NFT",
    label: "Saturn NFT",
  },
  {
    id: 5,
    value: "Neptune_NFT",
    label: "Neptune NFT",
  },
];

interface ValueType {
  receiverAddress: string;
  tokenId: number;
  tokenType: string;
}

export function CardWithForm() {
  const [selectVal, setSlectedVal] = React.useState<any>({
    nft: "Just_Ship",
  });
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();
  const [value, setValue] = React.useState<ValueType>({
    receiverAddress: "",
    tokenId: 0,
    tokenType: "Earth_NFT",
  });
  const [loader, setLoader] = React.useState(false);

  const provider = new ethers.providers.Web3Provider(walletProvider as any);
  const signer = provider.getSigner();
  const nftContractInstnace = new ethers.Contract(NFT_Address, NFT_ABI, signer);
  const CosMostContractInstance = new ethers.Contract(
    PlanetUpgrade_Address,
    PlanetUprade_ABI,
    signer
  );
  const [buy, setBuy] = React.useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectNFT, setSelectNFT] = React.useState<boolean>(false);
  const [isVerify, setVerify] = React.useState(true);
  const [updateNFT, setUpdateNFT] = useRecoilState(updateYourNFTs);

  const handleSelectNFT = (selectValue: String) => {
    setSlectedVal((prev: any) => ({
      ...prev,
      nft: selectValue,
    }));
  };

  const handleTransferrNFT = (selectNft: string) => {
    setValue((prev: any) => ({
      ...prev,
      tokenType: selectNft,
    }));
  };

  const handleBuyClick = () => {
    setIsDialogOpen(true);
    setBuy(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setBuy(false);
  };

  const checkUserisValid = async (userAddress: any) => {
    try {
      const isUserValid = await nftContractInstnace.checkPackage(userAddress);
      console.log("user is valid ", isUserValid);

      if (isUserValid) {
        return true;
      }

      return false;
    } catch (error) {
      console.log("somethin went wrong in checkUserisValid", error);
    }
  };

  const isJustNFTBuy = async (userAddress: any) => {
    try {
      const methodInfo = await nftContractInstnace.userMetadata(userAddress);
      const isBought = methodInfo._justToken;
      console.log("metadata info is ", methodInfo);
      console.log("isBought is  ", isBought);

      if (isBought) {
        return true;
      }

      return false;
    } catch (error) {
      console.log("something went wrong in isJustNFTBuy ", error);
    }
  };

  const getJustNFT = async (userAddress: any) => {
    try {
      const isValid = await checkUserisValid(userAddress);
      if (isValid) {
        const buyJustToken = await nftContractInstnace.purchaseJustToken();
        toast.success("You're Verified", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        await buyJustToken.wait();
        setLoader(false);
      } else {
        toast.error("You don't have enough packages for NFT.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setLoader(false);
      }
    } catch (error) {
      console.log("something went wrong getJustNFT ", error);
     
    } finally {
      setUpdateNFT(true);
    }
  };

  const getEarthNFT = async () => {
    try {
      const energyToken = "0xE9Fd094111F6A79b08737058B0BF736B41BAB619";
      const buyEarthNFT = await nftContractInstnace.mint(energyToken);
      await buyEarthNFT.wait();
      setLoader(false);
      const transactionReceipt = buyEarthNFT.hash;
      if (transactionReceipt) {
        handleBuyClick();
      }
    } catch (error) {
      console.log("something went wrong in getEarthNFT ", error);

      setLoader(false);
      toast.error("Something Went Wrong.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
     
    } finally {
      setUpdateNFT(true);
    }
  };

  const handleVerify = async () => {
    try {
      console.log("seleted val is ", selectVal.nft);
      setLoader(true);

      if (selectVal.nft === "Earth_NFT") {
        console.log("helo in");
        const isBuy = isJustNFTBuy(address);
        if (await isBuy) {
          getEarthNFT();
        } else {
          return;
        }
      } else if (selectVal.nft === "Just_Ship") {
        const isBuy = await isJustNFTBuy(address);
        if (isBuy) {
         setLoader(false)
        }
        getJustNFT(address);
      }
    } catch (error) {
     
    }
  };

  const checkReceiverRegister = async () => {
    try {
      const isRegiser = await CosMostContractInstance.UserRegister(
        value.receiverAddress
      );
      if (!isRegiser) {
        toast.error("Receiver address is not registered");
        return false;
      }
      return true;
    } catch (error) {}
  };

  const getNFTType = (nftString: string) => {
    const nftName: { [id: string]: number } = {
      Earth_NFT: 1,
      Mars_NFT: 2,
      Venus_NFT: 3,
      Saturn_NFT: 4,
      Neptune_NFT: 5,
    };

    return nftName[nftString];
  };

  const transferNFT = async () => {
    try {
      //Register user .
      const isRegiser = await checkReceiverRegister();
      if (!isRegiser) {
        return;
      }
      //if receiver doesn't have  planets  --> note.
      const isReceiverHasPlanet = await checkUserisValid(value.receiverAddress);

      if (!isReceiverHasPlanet) {
        toast.info("Receiver doesn't have Just Spaceship NFT");
      }
      console.log(
        "Checking user input of transfer before sends to smart contract",
        value.receiverAddress,
        value.tokenId,
        value.tokenType
      );
      const nftType = getNFTType(value.tokenType);
      console.log("NFT Type ", nftType);
      const tranferNFT = await nftContractInstnace.TransferNFT(
        value.receiverAddress,
        value.tokenId,
        nftType
      );

      await tranferNFT.wait();
      const transactionReceipt = tranferNFT.hash;

      if (transactionReceipt) {
        toast.success("NFT Transfer Successfully 🎉", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.error("Something went wrong ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {}
  };

  const transferNFTHandle = () => {
    transferNFT();
  };

  React.useEffect(() => {
    console.log(selectVal);
    if (selectVal.nft === "Earth_NFT") {
      setVerify(false);
    } else {
      setVerify(true);
    }
  }, [selectVal]);

  React.useEffect(() => {
    console.log("value type", value);
  }, [value]);

  return (
    <div>
      {loader ? (
        <NFTLoader />
      ) : (
        <div>
          <Tabs
            defaultValue="account"
            className="flex flex-col items-center justify-center b lg:w-[400px]  "
          >
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
              <TabsTrigger className=" text-white " value="account">
                Create NFT
              </TabsTrigger>
              <TabsTrigger className=" text-white " value="password">
                Transfer NFT
              </TabsTrigger>
            </TabsList>
            <TabsContent className="bg-black" value="account">
              <Card className=" h-[25rem] bg-black border-gray-700  ">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">
                    Create NFTs
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Creating Just Spaceship NFT will be available after gaining
                    Planet Package 5 in CosMos Network and Planet Package 5 in
                    Universe Club A. & For Earth NFT Creating Earth NFT will be
                    available after gaining 3000 BNS Energy Tokens. In CosMos
                    Network and Universe Club A
                  </CardDescription>
                </CardHeader>
                <div className="  lg:translate-y-[20%]">
                  <CardContent className=" ">
                    <form className="">
                      <div className="flex items-center w-full gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label className="text-white" htmlFor="framework">
                            NFTs
                          </Label>

                          <Select
                            name="selectedPackage"
                            value={selectVal.nft}
                            onValueChange={handleSelectNFT}
                            
                          >
                            <SelectTrigger className="w-[180px] border text-white border-yellow-400">
                              <SelectValue
                                className="text-white"
                                placeholder=""
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-black z-50 ">
                              {SelectData.map((item) => (
                                <SelectItem
                                  key={item.id}
                                  value={item.value}
                                  className="text-white  bg-black border-b border-yellow-500 "
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex items-start  mx-6  ">
                    <Button variant="custom_yellow" onClick={handleVerify}>
                      {isVerify ? "Verify" : "Create (Mint) NFT"}
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </TabsContent>
            <TabsContent className="bg-black text-white" value="password">
              <Card className="h-[25rem] bg-black border-gray-700 text-white">
                <CardHeader>
                  <CardTitle>Transfer NFT</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you ll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 b">
                  <div className="space-y-1">
                    <Label htmlFor="receiver_address">Receiver Address</Label>
                    <Input
                      id="receiver_address"
                      type="receiver_address"
                      value={value.receiverAddress}
                      placeholder="eg. 0x2391....5bd2"
                      onChange={(e) => {
                        setValue({ ...value, receiverAddress: e.target.value });
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">NFT Id</Label>
                    <Input
                      id="tokenId"
                      type="tokenId"
                      value={value.tokenId}
                      onChange={(e) => {
                        setValue({ ...value, tokenId: Number(e.target.value) });
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">NFTs</Label>
                    <Select
                      name="selectTransferNFT"
                      value={value.tokenType}
                      onValueChange={handleTransferrNFT}
                    >
                      <SelectTrigger className="w-[180px] border text-white border-yellow-400">
                        <SelectValue className="text-white" placeholder="" />
                      </SelectTrigger>
                      <SelectContent className="bg-black ">
                        {NFTData.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.value}
                            className="text-white  bg-black border-b border-yellow-500 "
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex items-start  mx-6 ">
                  <Button variant="custom_yellow" onClick={transferNFT}>
                    Transfer NFT
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          {isDialogOpen && (
            <AlertDialog
              title={`${selectVal.nft} NFTs`}
              message={`You have successfully mint the ${selectVal.nft} NFT 🎉🤟`}
              NFTName={selectVal.nft}
              onCancel={handleCancel}
            />
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
