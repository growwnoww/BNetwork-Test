import './treePositionStyle.css'

interface treePositionType{
    divStyle:string;
    top?:string;
    right?:string;
    bottom?:string;
    left?:string
    imgStyle:string;
    imgHeight:number;
    imgWidth:number;
    emptyHeight:number;
    emptyWidth:number;
    svgHeight:string;
    svgWidth:string;
}


export const treePositionData:treePositionType[] = [
    {
      divStyle:"absolute top-[32%] right-[47%]  w-fit",
      top:'32%',
      right:'48%',
      imgStyle:'img-responsive1',
      imgHeight:30,
      imgWidth:30,
      emptyHeight:27,
      emptyWidth:27,
      svgHeight:"18px",
      svgWidth:"26px"

    },
    {
        divStyle:"absolute bottom-[32%] right-[54%]  w-fit",
        bottom:'33%',
        right:'47%',
        imgStyle:'img-responsive1',
        imgHeight:30,
        imgWidth:30,
        emptyHeight:27,
        emptyWidth:27,
        svgHeight:"18px",
        svgWidth:"26px"
  
    },
    
    // level 2

    {
          divStyle:"absolute ",
          top:"29%",
          left:"34%",
          imgStyle:'img-responsiveTw',
          imgHeight:27,
          imgWidth:27,
          emptyHeight:22,
          emptyWidth:22,
          svgHeight:"18px",
          svgWidth:"26px"
    
      },

  
    {
      divStyle:"absolute ",
      top:"29%",
      right:"34%",
    //   imgStyle:"w-full border-2 border-zinc-600  p-1  bg-black rounded-full hover:border-yellow-400 duration-300",
      imgStyle:'img-responsiveTw',
      imgHeight:27,
      imgWidth:27,
      emptyHeight:22,
      emptyWidth:22,
      svgHeight:"18px",
      svgWidth:"26px"

    },

    {
      divStyle:"absolute bottom-[29%] left-[33%] ",
      bottom:"29%",
      left:"33%",
      imgStyle:'img-responsiveTw',
      imgHeight:27,
      imgWidth:27,
      emptyHeight:22,
      emptyWidth:22,
      svgHeight:"18px",
      svgWidth:"26px"

  },
  
    {
        divStyle:"absolute bottom-[29%] right-[34%]",
        bottom:"29%",
        right:"34%",
        imgStyle:'img-responsiveTw',
        imgHeight:27,
        imgWidth:27,
        emptyHeight:22,
        emptyWidth:22,
        svgHeight:"18px",
        svgWidth:"26px"
  
    },


    // level3
    {
      divStyle:"absolute top-[34%] left-[19%] ",
      top:"34%",
      left:"21%",
      imgStyle:'img-responsiveM',
      imgHeight:25,
      imgWidth:25,
      emptyHeight:30,
      emptyWidth:28,
      svgHeight:"18px",
      svgWidth:"26px"

  },


    {
        divStyle:"absolute top-[18%] left-[37%]",
        top:"18%",
        left:"37%",
        imgStyle:'img-responsiveM',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"14px",
        svgWidth:"22px" 
    },
    {
        divStyle:"absolute top-[18%] right-[37%]",
        top:"18%",
        right:"37%",
        imgStyle:'img-responsiveM',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"14px",
        svgWidth:"22px" 
    },

    {
        divStyle:"absolute top-[34%] right-[20%] ",
        top:"34%",
        right:"22%",
        imgStyle:'img-responsiveM',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"14px",
        svgWidth:"22px" 
    },

    {
        divStyle:"absolute bottom-[35%] left-[19%] ",
        bottom:"35%",
        left:"21%",
        imgStyle:'img-responsiveM',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"14px",
        svgWidth:"22px" 
    },

    {
        divStyle:"absolute bottom-[19%] left-[37%]",
        bottom:"19%",
        left:"37%",
        imgStyle:'img-responsiveM',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"14px",
        svgWidth:"22px" 
    },
    {
        divStyle:"absolute bottom-[19%] right-[37%]",
        bottom:"19%",
        right:"37%",
        imgStyle:'img-responsiveM',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"14px",
        svgWidth:"22px" 
    },
 
  

    {
        divStyle:"absolute bottom-[35%] right-[19%] ",
        bottom:"35%",
        right:"22%",
        imgStyle:'img-responsiveM',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"14px",
        svgWidth:"22px" 
    },

    // level4 

    {
        divStyle:"absolute top-[39%] left-[9%]",
        top:"39%",
        left:"12%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"11px",
        svgWidth:"19px" 
    },

    {
        divStyle:"absolute top-[25%] left-[15%] ",
        top:"25%",
        left:"18%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"14px",
        svgWidth:"22px" 
    },

    {
        divStyle:"absolute top-[15%] left-[25%]",
        top:"15%",
        left:"27%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"14px",
        svgWidth:"22px" 
    },


    {
        divStyle:"absolute top-[9%] left-[41%]  ",
        top:"9%",
        left:"41%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"11px",
        svgWidth:"19px" 
    },
    {
        divStyle:"absolute top-[9%] right-[41%] ",
        top:"9%",
        right:"41%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"11px",
        svgWidth:"19px" 
    },

    {
        divStyle:"absolute top-[15%] right-[27%]",
        top:"15%",
        right:"28%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"11px",
        svgWidth:"19px" 
    },

    {
        divStyle:"absolute top-[25%] right-[16%] ",
        top:"25%",
        right:"18%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"11px",
        svgWidth:"19px" 
    },
  
    {
        divStyle:"absolute top-[38%] right-[10%]",
        top:"39%",
        right:"13%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"11px",
        svgWidth:"19px" 
    },

    
{
    divStyle:"absolute bottom-[39%] left-[9%]",
    bottom:"41%",
    left:"12%",
    imgStyle:'img-responsive',
    imgHeight:25,
    imgWidth:25,
    emptyHeight:18,
    emptyWidth:18,
    svgHeight:"11px",
    svgWidth:"19px" 
},
    {
        divStyle:"absolute bottom-[25%] left-[15%] ",
        bottom:"26%",
        left:"18%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:5,
        emptyWidth:5,
        svgHeight:"11px",
        svgWidth:"19px" 
    },

    {
        divStyle:"absolute bottom-[16%] left-[25%] ",
        bottom:"17%",
        left:"27%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:12,
        emptyWidth:12,
        svgHeight:"11px",
        svgWidth:"19px" 
    },

    {
        divStyle:"absolute bottom-[9%] left-[41%]",
        bottom:"11%",
        left:"41%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:12,
        emptyWidth:12,
        svgHeight:"11px",
        svgWidth:"19px" 
    },

    {
        divStyle:"absolute bottom-[9%] right-[41%]  ",
        bottom:"11%",
        right:"41%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"11px",
        svgWidth:"19px" 
    },

    {
        divStyle:"absolute bottom-[15%] right-[27%] ",
        bottom:"17%",
        right:"27%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"11px",
        svgWidth:"19px" 
    },
   






 
    {
        divStyle:"absolute bottom-[25%] right-[16%] ",
        bottom:"26%",
        right:"18%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"11px",
        svgWidth:"19px" 
    },
    
  
    {
        divStyle:"absolute bottom-[40%] right-[10%]",
        bottom:"41%",
        right:"13%",
        imgStyle:'img-responsive',
        imgHeight:25,
        imgWidth:25,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"11px",
        svgWidth:"19px" 
    },

// level 5 

{
    divStyle:"absolute top-[43%] left-[0%]",
    top:"43%",
    left:"5%",
    imgStyle:'img-responsive2',
    imgHeight:10,    
    imgWidth:10,
    emptyHeight:18,
    emptyWidth:18,
    svgHeight:"7px",
    svgWidth:"15px" 
},

{
    divStyle:"absolute top-[33%] left-[2%]",
    top:"33%",
    left:"7%",
    imgStyle:'img-responsive2',
    imgHeight:10,    
    imgWidth:10,
    emptyHeight:18,
    emptyWidth:18,
    svgHeight:"7px",
    svgWidth:"15px" 
},

{
    divStyle:"absolute top-[26%] left-[5%]  ",
    top:"26%",
    left:"9%",
    imgStyle:'img-responsive2',
    imgHeight:10,    
    imgWidth:10,
    emptyHeight:18,
    emptyWidth:18,
    svgHeight:"11px",
        svgWidth:"19px" 
},

{
    divStyle:"absolute top-[18%] left-[11%]",
    top:"18%",
    left:"14%",
    imgStyle:'img-responsive2',
    imgHeight:10,    
    imgWidth:10,
    emptyHeight:18,
    emptyWidth:18,
    svgHeight:"7px",
    svgWidth:"15px" 
},



{
    divStyle:"absolute ",
    top:'12%',
    left:"20%",
    imgStyle:'img-responsive2',
    imgHeight:10,    
    imgWidth:10,
    emptyHeight:18,
    emptyWidth:18,
    svgHeight:"7px",
    svgWidth:"15px" 
},

{
    divStyle:"absolute top-[12%] left-[16%]",
    top:'7%',
    left:"27%",
    imgStyle:'img-responsive2',
    imgHeight:10,    
    imgWidth:10,
    emptyHeight:18,
    emptyWidth:18,
    svgHeight:"7px",
    svgWidth:"15px" 
},



    {
        divStyle:"absolute top-[2%] left-[34%]",
        top:"3%",
        left:"35%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },
    {
        divStyle:"absolute top-[0%] left-[45%]",
        top:"1.5%",
        left:"44%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute top-[0%] right-[45%]",
        top:"1.5%",
        right:"45%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },


    
    {
        divStyle:"absolute top-[6%] left-[25%]",
        top:"4%",
        right:"34%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },
    {
        divStyle:"absolute top-[6%] right-[25%]",
        top:"8%",
        right:"27%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

 

    {
        divStyle:"absolute top-[12%] right-[17%]",
        top:'13%',
        right:"20%", 
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },


    {
        divStyle:"absolute top-[18%] right-[11%]",
        top:"19%",
        right:"15%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },


    {
        divStyle:"absolute top-[26%] right-[6%] ",
        top:"27%",
        right:"10%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute top-[33%] right-[3%]",
        top:"34%",
        right:"7%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute top-[43%] right-[1%]",
        top:"43%",
        right:"6%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },
   //bottom level 5


   {
    divStyle:"absolute  bottom-[43%] left-[0%]  ",
    bottom:"44%",
    left:"5%",
    imgStyle:'img-responsive2',
    imgHeight:10,    
    imgWidth:10,
    emptyHeight:18,
    emptyWidth:18,
    svgHeight:"7px",
    svgWidth:"15px" 
},

    {
        divStyle:"absolute  bottom-[33%] left-[2%]",
        bottom:"34%",
        left:"7%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute  bottom-[26%] left-[5%]  ",
        bottom:"26%",
        left:"10%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute  bottom-[18%] left-[11%]  ",
        bottom:"18%",
        left:"15%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute  bottom-[13%] left-[16%]  ",
        bottom:"13%",
        left:"20%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute  bottom-[6%] left-[25%]",
        bottom:"8%",
        left:"27%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },





    {
        divStyle:"absolute  bottom-[3%] left-[34%]  ",
        bottom:"4%",
        left:"36%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },
    




    {
        divStyle:"absolute  bottom-[1%] left-[45%]",
        bottom:"3%",
        left:"44%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },



    {
        divStyle:"absolute  bottom-[1%] right-[45%]",
        bottom:"3%",
        right:"44%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute  bottom-[3%] right-[34%]  ",
        bottom:"5%",
        right:"34%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute  bottom-[6%] right-[26%]",
        bottom:"8%",
        right:"28%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute  bottom-[13%] right-[18%]  ",
        bottom:"14%",
        right:"20%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute  bottom-[18%] right-[11%]  ",
        bottom:"20%",
        right:"14%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute  bottom-[26%] right-[5%]  ",
        bottom:"27%",
        right:"10%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },
    
    {
        divStyle:"absolute  bottom-[33%] right-[3%]",
        bottom:"35%",
        right:"7%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },

    {
        divStyle:"absolute  bottom-[43%] right-[1%]  ",
        bottom:"44%",
        right:"5%",
        imgStyle:'img-responsive2',
        imgHeight:10,    
        imgWidth:10,
        emptyHeight:18,
        emptyWidth:18,
        svgHeight:"7px",
        svgWidth:"15px" 
    },


   
  ]