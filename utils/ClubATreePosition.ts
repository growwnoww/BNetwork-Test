import React from "react";
import "./treePositionStyle.css";

interface ClubATreePositionType {
  divStyle: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  imgStyle: string;
  imgHeight: number;
  imgWidth: number;
  emptyStyle?: string;
  emptyHeight?: number;
  emptyWidth?: number;
  svgHeight?: string;
  svgWidth?: string;
  mobilesvgHeight?: string;
  mobilesvgWidth?: string;
}

export const ClubATreePositionData: ClubATreePositionType[] = [
  {
    divStyle: "absolute top-[2%] right-[47%]  w-fit",
    top: "9%",
    right: "47.5%",
    imgStyle: "img-responsive1",
    imgHeight: 30,
    imgWidth: 30,
    emptyHeight: 37,
    emptyWidth: 37,
    svgHeight: "38px",
    svgWidth: "46px",
    mobilesvgHeight: "18px",
    mobilesvgWidth: "27px",
  },
  

  {
    divStyle: "absolute top-[32%] right-[17%]  w-fit",
    top: "63%",
    left: "26%",
    imgStyle: "img-responsive1",
    imgHeight: 30,
    imgWidth: 30,
    emptyHeight: 37,
    emptyWidth: 37,
    svgHeight: "38px",
    svgWidth: "46px",
    mobilesvgHeight: "18px",
    mobilesvgWidth: "27px",
  },

  {
    divStyle: "absolute top-[32%] right-[27%]  w-fit",
    top: "62%",
    right: "27%",
    imgStyle: "img-responsive1",
    imgHeight: 30,
    imgWidth: 30,
    emptyHeight: 37,
    emptyWidth: 37,
    svgHeight: "38px",
    svgWidth: "46px",
    mobilesvgHeight: "18px",
    mobilesvgWidth: "27px",
  },



]