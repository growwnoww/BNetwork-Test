import Image from "next/image";
import React from "react";
import LevelIcon from "@/components/dashboardComponents/LevelIcon";
import { IoIosArrowForward } from "react-icons/io";

const page = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="m-5 w-fit">
        <div className="h-24 w-full bg-zinc-800 flex  justify-between items-center ">
          <div className="flex items-center gap-x-3 p-2">
            <Image
              src="/Earth.png"
              alt="Earth"
              height={50}
              width={50}
              loading="lazy"
            />

            <p className="text-xl">Earth - $ 5</p>
          </div>

          <div className="text-center">
            <p>Each Cycled Benefits</p>
            <p>2310%</p>
          </div>
        </div>

        <div className="bg-[#111010] w-fit relative">
          <Image
            src="/concentriccircle1.png"
            alt="concentriccircle"
            height={800}
            width={800}
            className=""
          />

          {/* center  */}
          <div className="absolute top-[45%] right-[46%]  w-fit">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={40}
              width={40}
              className="w-full border-2 border-zinc-600  p-3  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 1 top  */}
          <div className="absolute top-[32%] right-[48%]  w-fit">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={30}
              width={30}
              className="w-full border-2 border-zinc-600  p-2  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 2 bottom  */}
          <div className="absolute bottom-[32%] right-[47%]  w-fit">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={30}
              width={30}
              className="w-full border-2 border-zinc-600  p-2  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 2 top empty  */}
          <div className="absolute top-[29%] right-[34%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "20px", height: "28px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 2 top   */}
          <div className="absolute top-[29%] left-[33%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={27}
              width={27}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 2 bottom empty  */}
          <div className="absolute bottom-[29%] right-[34%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "20px", height: "28px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 2 bottom  */}
          <div className="absolute bottom-[29%] left-[33%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={27}
              width={27}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 3 top left empty  */}

          <div className="absolute top-[18%] left-[37%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "14px", height: "22px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 3 top right empty  */}
          <div className="absolute top-[18%] right-[37%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "14px", height: "22px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 3 bottom right empty  */}
          <div className="absolute bottom-[19%] left-[37%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "14px", height: "22px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 3 bottom left empty */}
          <div className="absolute bottom-[19%] right-[37%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "14px", height: "22px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 3 top left */}
          <div className="absolute top-[34%] left-[19%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={27}
              width={27}
              className="w-full border-2 border-zinc-600    bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 3 top right  */}
          <div className="absolute top-[34%] right-[20%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={27}
              width={27}
              className="w-full border-2 border-zinc-600    bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 3 bottom left  */}
          <div className="absolute bottom-[35%] left-[19%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={27}
              width={27}
              className="w-full border-2 border-zinc-600    bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 3 bottom right  */}
          <div className="absolute bottom-[34%] right-[20%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={27}
              width={27}
              className="w-full border-2 border-zinc-600    bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 4 top left 1 */}
          <div className="absolute top-[9%] left-[41%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={15}
              width={15}
              className="w-full border-2 border-zinc-600  p-1.5  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 4 top right 1 */}
          <div className="absolute top-[9%] right-[41%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={15}
              width={15}
              className="w-full border-2 border-zinc-600  p-1.5  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 4 top left  empty-1 */}
          <div className="absolute top-[15%] left-[25%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "11px", height: "19px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 4 top right  empty-1 */}
          <div className="absolute top-[15%] right-[27%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "11px", height: "19px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 4 top left 2 */}
          <div className="absolute top-[25%] left-[15%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={15}
              width={15}
              className="w-full border-2 border-zinc-600  p-1.5  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 4 top right 2 */}
          <div className="absolute top-[25%] right-[16%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={15}
              width={15}
              className="w-full border-2 border-zinc-600  p-1.5  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 4 top left empty-2  */}
          <div className="absolute top-[39%] left-[9%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "11px", height: "19px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 4 top left empty-2  */}
          <div className="absolute top-[38%] right-[10%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "11px", height: "19px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 4 bottom left 1 */}
          <div className="absolute bottom-[9%] left-[41%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={15}
              width={15}
              className="w-full border-2 border-zinc-600  p-1.5  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 4 bottom right 1 */}
          <div className="absolute bottom-[9%] right-[41%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={15}
              width={15}
              className="w-full border-2 border-zinc-600  p-1.5  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 4 bottom left  empty-1 */}
          <div className="absolute bottom-[16%] left-[25%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "11px", height: "19px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 4 bottom right  empty-1 */}
          <div className="absolute bottom-[15%] right-[27%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "11px", height: "19px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 4 bottom left 2 */}
          <div className="absolute bottom-[25%] left-[15%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={15}
              width={15}
              className="w-full border-2 border-zinc-600  p-1.5  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 4 bottom right 2 */}
          <div className="absolute bottom-[25%] right-[16%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={15}
              width={15}
              className="w-full border-2 border-zinc-600  p-1.5  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 4 bottom left empty-2  */}
          <div className="absolute bottom-[39%] left-[9%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "11px", height: "19px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 4 top bottom empty-2  */}
          <div className="absolute bottom-[40%] right-[10%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "11px", height: "19px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="2"
                />
              </svg>
            </p>
          </div>

          {/* level 5 top left empty-1  */}

          <div className="absolute top-[0%] left-[45%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 top right empty-1  */}

          <div className="absolute top-[0%] right-[45%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 top left 1  */}

          <div className="absolute top-[2%] left-[34%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 top right 1  */}

          <div className="absolute top-[2%] right-[34%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 top left empty-2  */}

          <div className="absolute top-[6%] left-[25%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 top right empty-2  */}

          <div className="absolute top-[6%] right-[25%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 top left 2  */}

          <div className="absolute top-[12%] left-[16%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 top right 2  */}

          <div className="absolute top-[12%] right-[17%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 top left empty-3  */}

          <div className="absolute top-[18%] left-[11%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 top right empty-3  */}

          <div className="absolute top-[18%] right-[11%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 top left 3  */}

          <div className="absolute top-[26%] left-[5%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 top right 3  */}

          <div className="absolute top-[26%] right-[6%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 top left empty-4  */}

          <div className="absolute top-[33%] left-[2%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 top right empty-4  */}

          <div className="absolute top-[33%] right-[3%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 top left 4  */}

          <div className="absolute top-[43%] left-[0%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 top right 4  */}

          <div className="absolute top-[43%] right-[1%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* ----------------bottom--------  */}

          {/* level 5 bottom left empty-1  */}

          <div className="absolute bottom-[1%] left-[45%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 bottom right empty-1  */}

          <div className="absolute bottom-[1%] right-[45%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 bottom left 1  */}

          <div className="absolute bottom-[3%] left-[34%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 bottom right 1  */}

          <div className="absolute bottom-[3%] right-[34%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 bottom left empty-2  */}

          <div className="absolute bottom-[6%] left-[25%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 bottom right empty-2  */}

          <div className="absolute bottom-[6%] right-[26%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 bottom left 2  */}

          <div className="absolute bottom-[13%] left-[16%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 bottom right 2  */}

          <div className="absolute bottom-[12%] right-[18%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 bottom left empty-3  */}

          <div className="absolute bottom-[18%] left-[11%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 bottom right empty-3  */}

          <div className="absolute bottom-[18%] right-[11%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 bottom left 3  */}

          <div className="absolute bottom-[26%] left-[5%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 bottom right 3  */}

          <div className="absolute bottom-[26%] right-[6%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 bottom left empty-4  */}

          <div className="absolute bottom-[33%] left-[2%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 bottom right empty-4  */}

          <div className="absolute bottom-[33%] right-[3%]">
            <p
              className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 "
              data-tippy-directive=""
              tabIndex={0}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "7px", height: "15px" }}
              >
                <path
                  d="M12 0L12 24M0 12L24 12"
                  stroke="#666666"
                  fill="#122143"
                  strokeWidth="4"
                />
              </svg>
            </p>
          </div>

          {/* level 5 bottom left 4  */}

          <div className="absolute bottom-[43%] left-[0%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>

          {/* level 5 bottom right 4  */}

          <div className="absolute bottom-[43%] right-[1%]  ">
            <Image
              src="/BNSymbol2.png"
              alt="BNsymbol1"
              height={10}
              width={10}
              className="w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300"
            />
          </div>
        </div>

        <div className="h-16 w-full flex bg-zinc-800">
          <div className="flex items-center  gap-x-2 px-3 w-fit">
            <p>1</p>
            <p>Cycles</p>
            <p><IoIosArrowForward /></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
