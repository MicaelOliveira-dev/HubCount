import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Trailer from '../components/Trailer';
import { getVideoIdFromTitle } from 'services/Services';

const VideoTrailer = () => {
    const { movieName } = useParams<{ movieName?: string }>();
    const [videoId, setVideoId] = useState<string | undefined>(undefined);
  
    useEffect(() => {
      const fetchVideoId = async () => {
        if (movieName) {
          const id = await getVideoIdFromTitle(movieName);
          setVideoId(id || undefined); 
        }
      };
  
      fetchVideoId();
    }, [movieName]);
  
    return <Trailer videoId={videoId} />;
  };
  
  export default VideoTrailer;