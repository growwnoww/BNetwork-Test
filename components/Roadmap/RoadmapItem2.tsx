import Image from 'next/image'; // Import Image for rendering within SVG
import horseImage from "../../public/Green.png";
import grayImage from "../../public/Silver.png";
import bgImage from "../../public/image.png";
import orangeImage from "../../public/Orange.png"// Replace with your actual image import

const RenderItem1 = (details: any[], Component: any, itemsPerRow: number) => {
  const rows = [];
  
  for (let i = 0; i < details.length; i += itemsPerRow) {
    rows.push(details.slice(i, i + itemsPerRow));
  }

  return rows.map((row, rowIndex) => (
    <div className="relative flex justify-center items-center" key={rowIndex} style={{ marginBottom: "20px" }}>
      <svg
        className="absolute top-0 left-0 w-[75%] lg:w-full h-full"
        viewBox={`0 0 ${700 * row.length / itemsPerRow} 100`}
        preserveAspectRatio="none"
      >
       <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,-90 1,0 00,50"
            />
            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,50 1500,50"
            />

            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,50000 1500,50"
            />
        {/* Render foreignObjects (images) inside SVG */}
        {row.map((_, index) => (
          <foreignObject
            key={index}
            x={index * 260 + 48}
            y="12"
            width="274"
            height="74"
          >
            <div>
              <Image
                src={index === 4 ? orangeImage.src : horseImage.src}
                width={70}
                height={10}
                alt="Roadmap Item"
                className=""
              />
            </div>
          </foreignObject>
        ))}
      </svg>
      {row.map((detail, index) => (
        <div key={index} style={{ width: 100 }} className="relative z-10 flex flex-col">
          <Component title={detail.title} date={detail.time} visible={true} />
        </div>
      ))}
    </div>
  ));
};

export default RenderItem1;