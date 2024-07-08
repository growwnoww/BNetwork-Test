'use client'
import React ,{useEffect}from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";

const FAQ = () => {
  const pathname = usePathname();

  useEffect(() => {
    const hash = pathname.split('#')[1]; 
    if (hash) {
      const element = document.getElementById(hash); 
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); 
      }
    }
  }, [pathname]); 

  
  return (
    <div id="faq"  className="flex flex-col  items-center justify-center mb-16">
      <div>
        <p className="text-2xl lg:text-4xl text-yellow-500 font-bold mb-8 px-5">
          Have questions? Frequently Asked Questions
        </p>
      </div>
      <div className="w-[85%]  lg:w-[75%]">
        <Accordion type="single" collapsible className="w-full ">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-[12px]">What is Believe Network?</AccordionTrigger>
            <AccordionContent >
              Believe Network (BNetwork in short) operates as an online business
              utilizing web technology 3.0, characterized by complete
              decentralization and universal accessibility. BNetwork operates on
              the BNB (Smart Chain) Smart Contract. Our venture constitutes a
              comprehensive ecosystem of cryptocurrency tools interconnected
              seamlessly, fostering rapid and organic implementation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-[12px]">
              Is Believe Network an official company?{" "}
            </AccordionTrigger>
            <AccordionContent>
              Believe Network is officially registered, and it also possesses a
              cryptocurrency license specifically for BN Coin.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-[12px]">Is Believe Network secure?</AccordionTrigger>
            <AccordionContent>
              Believe Network prioritizes security, with its operations
              safeguarded by blockchain technology. Participants maintain their
              anonymity by solely utilizing their cryptocurrency wallet address
              as a login, seamlessly connected via WEB 3.0, without the need to
              divulge personal data. The entire infrastructure of Believe
              Network relies on secure smart contracts, effectively shielding
              against external interference. The website solely presents data
              sourced directly from the blockchain.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-[12px]">
            What do I need to start with Believe Network?
            </AccordionTrigger>
            <AccordionContent>
              To participate, ensure you have either a smartphone, laptop, or
              tablet, along with a cryptocurrency wallet such as Trust Wallet,
              MetaMask, or Token Pocket. Additionally, have some BNB available
              to cover Binance Smart Chain network fees, as well as USDT for
              transactions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-[12px]">
            What&apos;s the minimum to start earning?
            </AccordionTrigger>
            <AccordionContent>
              You can initiate earnings with as little as 5 USDT, which is
              equivalent to $5.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-[12px]">What is a smart contract? </AccordionTrigger>
            <AccordionContent>
              A smart contract refers to a computer protocol enabling the
              automated and managed execution of financial transactions without
              reliance on third-party trust. By utilizing smart contracts, a
              secure and dependable framework for financial operations can be
              established, functioning autonomously without human involvement.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-[12px]">
            Where are Believe Network&apos;s smart contracts?
            </AccordionTrigger>
            <AccordionContent>
              To access them, navigate to the bottom of our main page and click
              on the web information regarding smart contracts to review all our
              smart contracts.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger className="text-[12px]">
              How can I earn with Believe Network?{" "}
            </AccordionTrigger>
            <AccordionContent>
              For a deeper comprehension, we recommend reading our PDF documents
              on Planet Upgrade, Universe, Royalty NFT, Global, and Galaxie.
              These resources are accessible from our homepage. Simply click on
              &quot;How It Works,&quot; where you&apos;ll find all our systems listed. Each
              system includes a &quot;Download PDF&quot; button for accessing the guide.
              Additionally, you can watch our explanatory videos on our official
              YouTube channel for further insights.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger className="text-[12px]">What is Royalty NFT? </AccordionTrigger>
            <AccordionContent>
              Royalty is a status program designed to grant Royalty bonuses,
              structured within the NFT format. This program encompasses six
              tiers of NFTs. Royalty bonuses are earned according to the 100%
              cumulative turnover generated by Believe Network programs.{" "}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger className="text-[12px]">How can I get Royalty NFT? </AccordionTrigger>
            <AccordionContent>
              You need to have 5 planets in each active and operational system
              to create Just Spaceship NFTs
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-11">
            <AccordionTrigger className="text-[12px]">
            What if my wallet gets stolen or hacked?
            </AccordionTrigger>
            <AccordionContent>
              Get in touch promptly with our technical support through the
              &quot;Help&quot; section or by email. Our team will assist you in changing
              your wallet. Please note that this process requires some time and
              thorough verification to ensure the account and wallet ownership.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-12">
            <AccordionTrigger className="text-[12px]">How can I contact you? </AccordionTrigger>
            <AccordionContent>
              You can reach us via email at BNetwork.space.official@gmail.com We
              prioritize prompt and thorough responses. For quick answers to
              straightforward queries, utilize the chat feature on the Main
              page.{" "}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
