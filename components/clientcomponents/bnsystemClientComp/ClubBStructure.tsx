import Image from 'next/image'
import React from 'react'

interface ClubBType{
  centerImg : string;
  ornageImg:string;
  sil1Img:string;
  sil2Img:string;
  redImg:string;
  green1Img:string;
  green2Img:string;
}


const ClubBStructure = ({centerImg, ornageImg,sil1Img,sil2Img,redImg,green1Img,green2Img}:ClubBType) => {
    return (
        <div className='w-96 relative'>
            <div data-v-3265f81b="" className="system_circle_levels"><svg width="100%" viewBox="0 90 380 228"
                fill="none" xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <rect width="628" height="628"
                    transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 -114)"
                    fill="#1A1A1A"></rect>
                <path
                    d="M187.081 111.174C227.879 111.174 267.007 120.53 295.856 137.185C324.705 153.839 340.912 176.427 340.912 199.98L283.26 199.98C283.26 185.254 273.127 171.132 255.09 160.719C237.053 150.306 212.589 144.456 187.081 144.456L187.081 111.174Z"
                    fill="white" fill-opacity="0.1" stroke="#1A1A1A" stroke-linejoin="round"></path>
                <path
                    d="M187.081 288.787C146.282 288.787 107.154 279.431 78.3054 262.776C49.4564 246.122 33.2492 223.534 33.2492 199.98L90.9011 199.98C90.9011 214.706 101.034 228.829 119.071 239.242C137.109 249.655 161.572 255.505 187.081 255.505L187.081 288.787Z"
                    fill="white" fill-opacity="0.1" stroke="#1A1A1A" stroke-linejoin="round"></path>
                <circle r="78.5"
                    transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 199.981)"
                    stroke="#4D4D4D" stroke-linejoin="round"></circle>
                <circle r="125.6"
                    transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 199.98)"
                    stroke="#4D4D4D" stroke-linejoin="round"></circle>
                <circle r="172.7"
                    transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 199.98)"
                    stroke="#333333" stroke-linejoin="round"></circle>
                <circle r="219.8"
                    transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 199.981)"
                    stroke="#333333" stroke-linejoin="round"></circle>
                <circle r="266.9"
                    transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 199.98)"
                    stroke="#333333" stroke-linejoin="round"></circle>
                <circle r="12.775"
                    transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 288.286)"
                    fill="#1F1F1F" stroke="#1A1A1A" stroke-width="2" stroke-linejoin="round"></circle>
                <path
                    d="M21.3523 205.384C27.4626 208.911 37.3694 208.911 43.4797 205.384C49.5901 201.856 49.5901 196.137 43.4797 192.61C37.3694 189.082 27.4626 189.082 21.3523 192.61C15.242 196.137 15.242 201.856 21.3523 205.384Z"
                    fill="#1F1F1F" stroke="#1A1A1A" stroke-width="2" stroke-linejoin="round"></path>
                <circle r="12.775"
                    transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 109.71)"
                    fill="#1F1F1F" stroke="#1A1A1A" stroke-width="2" stroke-linejoin="round"></circle>
                <path
                    d="M330.681 205.384C336.792 208.911 346.699 208.911 352.809 205.384C358.919 201.856 358.919 196.137 352.809 192.61C346.699 189.082 336.792 189.082 330.681 192.61C324.571 196.137 324.571 201.856 330.681 205.384Z"
                    fill="#1F1F1F" stroke="#1A1A1A" stroke-width="2" stroke-linejoin="round"></path>
                <circle r="24.55"
                    transform="matrix(0.866044 0.499967 -0.866044 0.499967 119.096 239.226)"
                    fill="#1F1F1F" stroke="#1A1A1A" stroke-width="2" stroke-linejoin="round"></circle>
                <path
                    d="M233.804 173.006C245.546 179.785 264.584 179.785 276.326 173.006C288.069 166.227 288.069 155.237 276.326 148.458C264.584 141.679 245.546 141.679 233.804 148.458C222.061 155.237 222.061 166.227 233.804 173.006Z"
                    fill="#1F1F1F" stroke="#1A1A1A" stroke-width="2" stroke-linejoin="round">
                </path>
    
            </svg>
            </div>


            <div className='absolute top-[26%] left-[35%]'>
                <Image
                src={centerImg}
                alt='yellow'
                loading='lazy'
                height={100}
                width={100}
                />
            </div>

            <div className='absolute top-[51%] left-[23%]'>
                <Image
                src={ornageImg}
                alt='orange'
                loading='lazy'
                height={60}
                width={60}
                />
            </div>

            <div className='absolute top-[17%] right-[25%]'>
                <Image
                src={sil1Img}
                alt='silver'
                loading='lazy'
                height={60}
                width={60}
                />
            </div>

            <div className='absolute top-[37%] left-[4%]'>
                <Image
                src={green1Img}
                alt='green'
                loading='lazy'
                height={40}
                width={40}
                />
            </div>


            <div className='absolute bottom-[3%] left-[44%]'>
                <Image
                src={green2Img}
                alt='green'
                loading='lazy'
                height={40}
                width={40}
                />
            </div>

            <div className='absolute -top-[1%] left-[45%]'>
                <Image
                src={redImg}
                alt='red'
                loading='lazy'
                height={37}
                width={37}
                />
            </div>

            
            <div className='absolute top-[37%] left-[4%]'>
                <Image
                src={green1Img}
                alt='green'
                loading='lazy'
                height={40}
                width={40}
                />
            </div>

            <div className='absolute top-[40%] right-[5%]'>
                <Image
                src={sil2Img}
                alt='green'
                loading='lazy'
                height={40}
                width={40}
                />
            </div>
        </div>
    )
}

export default ClubBStructure