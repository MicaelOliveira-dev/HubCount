import axios from "axios";

const youtubeApiKey = `${import.meta.env.VITE_API_YOUTUBE}`; 

export const getVideoIdFromTitle = async (movieTitle: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${movieTitle}&key=${youtubeApiKey}&part=snippet&type=video`
      );
  
      if (response.status === 200) {
        const videos = response.data.items;
  
        if (videos.length > 0) {
          return videos[0].id.videoId;
        } else {
          console.error('Nenhum vídeo encontrado para o título fornecido.');
          return null;
        }
      } else {
        console.error(`Erro na solicitação ao YouTube: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error('Erro na solicitação ao YouTube:', (error as Error).message);
      return null;
    }
  };