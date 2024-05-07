interface tableTypes {
    id: number;
    imgURL:string;
    planetName:string;
    amount:string;

  }
  export const ClubAGlobalTableData:tableTypes [] = [
    {
      id: 1,
      imgURL: "/Earth.png",
      planetName:'Earth',
      amount:"10$"
    },
    {
      id: 2,
      imgURL: "/Moon.png",
      planetName:'Moon',
      amount:"25$"
    },
    {
      id: 3,
      imgURL: "/Mars.png",
      planetName:'Mars',
      amount:"50$"
    },
    {
      id: 4,
      imgURL: "/Mercury.png",
      planetName:'Mercury',
      amount:"100$"
    },
    {
      id: 5,
      imgURL: "/Venus.png",
      planetName:'Venus',
      amount:"250$"
    },
    {
      id: 6,
      imgURL: "/Jupiter.png",
      planetName:'Jupiter',
      amount:"500$"
    },
    {
      id: 7,
      imgURL: "/Saturn.png",
      planetName:'Saturn',
      amount:"1000$"
    },
    {
      id: 8,
      imgURL: "/Uranus.png",
      planetName:'Uranus',
      amount:"2500$"
    },
    {
      id: 9,
      imgURL: "/Neptune.png",
      planetName:'Neptune',
      amount:"5000$"
    },
    {
      id: 10,
      imgURL: "/Pluto.png",
      planetName:'Pluto',
      amount:"10000$"
    },
  ];
  
  
  // <td className="px-3 py-2 whitespace-nowrap  font-medium flex items-center justify-center">
  // <Image
  //   className= 'h-12 w-12  rounded-full'
  //   width={20}
  //   height={20}
  //   loading="lazy"
  //   src={user.imgURL}
  //   alt="Avatar"
  // />
  // </td>