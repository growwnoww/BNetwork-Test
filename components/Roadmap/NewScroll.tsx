"use client";
import React, { useRef, useEffect, useState } from "react";
import Details from "./Details";
 // Ensure you import the updated Details component

const Experience = () => {
  const handleMouseEnter = () => {
    document.body.style.overflow = "hidden";
  };

  const handleMouseLeave = () => {
    document.body.style.overflow = "auto";
  };

  const detailsData = [
    {
      position: "Software Engineer",
      company: "Google",
      time: "2022-Present",
      address: "Mountain View, CA",
      companyLink: "https://www.google.com",
      work: "Worked on a team responsible for developing new features for Google's search engine, including improving the accuracy and relevance of search results and developing new tools for data analysis and visualization.",
      completed: true,
    },
    {
      position: "Software Engineer",
      company: "Google",
      time: "2022-Present",
      address: "Mountain View, CA",
      companyLink: "https://www.google.com",
      work: "Worked on a team responsible for developing new features for Google's search engine, including improving the accuracy and relevance of search results and developing new tools for data analysis and visualization.",
      completed: true,
    },
    {
      position: "Software Engineer",
      company: "Google",
      time: "2022-Present",
      address: "Mountain View, CA",
      companyLink: "https://www.google.com",
      work: "Worked on a team responsible for developing new features for Google's search engine, including improving the accuracy and relevance of search results and developing new tools for data analysis and visualization.",
      completed: true,
    },
    {
      position: "Software Engineer",
      company: "Google",
      time: "2022-Present",
      address: "Mountain View, CA",
      companyLink: "https://www.google.com",
      work: "Worked on a team responsible for developing new features for Google's search engine, including improving the accuracy and relevance of search results and developing new tools for data analysis and visualization.",
      completed: true,
    },
    {
      position: "Software Engineer",
      company: "Google",
      time: "2022-Present",
      address: "Mountain View, CA",
      companyLink: "https://www.google.com",
      work: "Worked on a team responsible for developing new features for Google's search engine, including improving the accuracy and relevance of search results and developing new tools for data analysis and visualization.",
      completed: true,
    },
    {
      position: "Software Engineer",
      company: "Google",
      time: "2022-Present",
      address: "Mountain View, CA",
      companyLink: "https://www.google.com",
      work: "Worked on a team responsible for developing new features for Google's search engine, including improving the accuracy and relevance of search results and developing new tools for data analysis and visualization.",
      completed: true,
    },
    {
      position: "Software Engineer",
      company: "Google",
      time: "2022-Present",
      address: "Mountain View, CA",
      companyLink: "https://www.google.com",
      work: "Worked on a team responsible for developing new features for Google's search engine, including improving the accuracy and relevance of search results and developing new tools for data analysis and visualization.",
      completed: false,
    },
    {
      position: "Software Engineer",
      company: "Google",
      time: "2022-Present",
      address: "Mountain View, CA",
      companyLink: "https://www.google.com",
      work: "Worked on a team responsible for developing new features for Google's search engine, including improving the accuracy and relevance of search results and developing new tools for data analysis and visualization.",
      completed: false,
    },
    {
      position: "Software Engineer",
      company: "Google",
      time: "2022-Present",
      address: "Mountain View, CA",
      companyLink: "https://www.google.com",
      work: "Worked on a team responsible for developing new features for Google's search engine, including improving the accuracy and relevance of search results and developing new tools for data analysis and visualization.",
      completed: false,
    },


    // Add more details objects as needed...
  ];

  const listRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (listRef.current) {
      //@ts-ignore
      const ulHeight = listRef.current.scrollHeight;
      setLineHeight(ulHeight);
    }
  }, [detailsData.length]);

  return (
    <>
      <div className="my-64">
        <div className="grid grid-cols-2">
          <div className="w-full h-full flex mx-16 items-start justify-center">
            <div>
              <p className="text-8xl font-extrabold text-yellow-400">Roadmap</p>
              <p className="w-96 h-auto">
                Get acquainted with our plans and upcoming updates. Find out the
                key dates and important milestones in the development of our
                project.
              </p>
            </div>
          </div>

          <div
            className="w-[70%] mx-auto relative lg:w-[90%] md:w-full h-[70vh] overflow-y-scroll flex"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ul ref={listRef} className="w-auto flex flex-col items-start justify-between ml-4 xs:ml-2 relative">
              {detailsData.map((detail, index) => (
                <Details
                  key={index}
                  position={detail.position}
                  company={detail.company}
                  time={detail.time}
                  address={detail.address}
                  companyLink={detail.companyLink}
                  work={detail.work}
                  completed={detail.completed} // Pass the completed status
                />
              ))}
              <div
                className="absolute left-[20%] top-0 w-[4px] md:w-[2px] md:left-[calc(4%-1px)]"
                style={{
                  height: `${lineHeight}px`,
                  background: `linear-gradient(to bottom, yellow ${calculateCompletedHeight(
                    detailsData
                  )}%, white ${calculateCompletedHeight(detailsData)}%)`,
                }}
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to calculate the percentage of completed items' height
const calculateCompletedHeight = (data:any) => {
  const totalItems = data.length;
  const completedItems = data.filter((item:any) => item.completed).length;
  return (completedItems / totalItems) * 100;
};

export default Experience;
