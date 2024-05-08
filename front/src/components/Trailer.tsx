
import React from 'react';

interface TrailerProps {
  videoId?: string;
}

const Trailer: React.FC<TrailerProps> = ({ videoId }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mt-[100px]">
        {videoId && (
          <iframe
            width="800"
            height="500"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        )}
      </div>
    </div>    
  );  
};

export default Trailer;
