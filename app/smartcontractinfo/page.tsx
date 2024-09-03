import React from 'react';
import { FaFileContract } from 'react-icons/fa';
import ContractInfo from '@/components/sub/ContractInfo';
import Footer from '@/components/Footer/Footer';

const contracts = [
    {
      title: '1. Planet Upgrade',
      date: '(Live-20 Sep. 2023)',
      address: '0xF1DE517a755011E691E2Eb664274062ddF4cC211',
    },
    {
      title: '2. After Migration Energy token and Autopol level Update',
      date: '(Live- Feb-12-2024)',
      address: '0x5ea64Ab084722Fa8092969ED45642706978631BD',
    },
    {
      title: '3. BNS Energy Token',
      date: '(Distribution Started- Feb-12-2024)',
      address: '0xE9Fd094111F6A79b08737058B0BF736B41BAB619',
    },
    {
      title: '4. Universe Club-A',
      date: '(Live May-16-2024)',
      address: '0x60533ef9d54eFA687B9D8150A911660f90b9afD9',
    },
    {
      title: '5. Universe Club-A Restructure',
      date: '(Live June-08-2024)',
      address: '0xb4E4feaF2663df1e83f5dB0B319320C6218967c4',
    },
    {
      title: '6. BNS Royalty NFT',
      date: ' (Live August-06-2024)',
      address: '0x8B71290A1E46765C58796fEc2c7d9A0ABB3B2409',
    },
    {
      title: '7. BN GAMIMG 🎲🎯🎮',
      date: '(Coming soon)',
      address: '0x0000000000000000000000000000000000000000',
    },
    {
      title: '8. BN Fx and Crypto Robot 🤖 Auto Trading',
      date: '(Coming soon)',
      address: '0x0000000000000000000000000000000000000000',
    },
    {
      title: '9. BN COIN Staking Smart Contract',
      date: '(Coming soon)',
      address: '0x0000000000000000000000000000000000000000',
    },
    {
      title: '10. BN GLOBAL SYSTEM',
      date: '(Coming soon)',
      address: '0x0000000000000000000000000000000000000000',
    },
    {
      title: '11. BN GALAXY SYSTEM',
      date: '(Coming soon)',
      address: '0x0000000000000000000000000000000000000000',
    },
    {
      title: '12. BN METAVERSE',
      date: '(Coming soon)',
      address: '0x0000000000000000000000000000000000000000',
    },
  ];
  

const SmartCInfo = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="mt-28 w-full flex flex-col items-center justify-center">
        <div>
          <FaFileContract className="text-9xl text-yellow-500 flex items-center justify-center" />
        </div>
        <p className="text-2xl lg:text-6xl font-semibold my-2">Smart Contract Info</p>
      </div>
      <div className="mt-12 ">
        <div className="flex flex-col gap-y-3 items-center justify-center">
          {contracts.map((contract, index) => (
            <ContractInfo
              key={index}
              title={contract.title}
              date={contract.date}
              address={contract.address}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default SmartCInfo;
