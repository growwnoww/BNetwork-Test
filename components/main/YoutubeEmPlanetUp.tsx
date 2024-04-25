import React from 'react'

const YoutubeEmPlanetUp = () => {
    const videoUrl = 'https://www.youtube.com/embed/t5uMk28ob7c?si=eBNjcEVAY1MZ9GgE'; // Embed URL

  return (
    <div className="flex flex-col items-center justify-center text-center z-50 p-4">
    <p className="text-4xl font-bold my-5">Planet Upgrade Plan Presentation</p>
    <div className="relative w-full h-auto flex items-center justify-center " style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 lg:left-[25%] w-full h-full md:w-[60%] md:h-[60%] lg:w-[50%] lg:h-[50%] rounded-lg"
        src={videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
      />
    </div>
  </div>
  )
}

export default YoutubeEmPlanetUp