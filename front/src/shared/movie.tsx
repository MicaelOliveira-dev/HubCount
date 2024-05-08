import { MovieModel } from "models/entities/Movie";
import { FaInfo } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import React from 'react'
import Link from "components/Link";
import Button from "components/button";
interface MovieProps {
  movie: MovieModel;
  onGrid?: boolean
}

const Movie = ({movie,onGrid}: MovieProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isFavorited, setIsFavorited] = React.useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  }

  const addToFavorites = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("userId não encontrado no localStorage");
        return;
      }
      const response = await fetch(`https://localhost:7269/api/AddMovieToFavorites/${userId}/${movie.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsFavorited(true);
      } else {
        console.error("Erro ao adicionar o filme aos favoritos:", response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar o filme aos favoritos:', error);
    }
  };

  return (
       <div className={`${onGrid ? "w-full" : "w-[230px]"} flex flex-col gap-y-2 h-auto cursor-pointer hover:shadow-lg hover:shadow-black/40 transition duration-300 relative`}>
        <div className="h-[350px] w-full relative">
          <img
            src={`${movie.posterPath}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="bg-black absolute inset-0 h-full w-full z-10 opacity-25 rounded-lg" />
        </div>
        <button
          onClick={
            handleModalOpen
          }
          className="absolute right-2 top-2 z-10 rounded-full p-1 border-2 border-primaryNeon hover:bg-primaryNeon transition duration-300"
        >
          <FaInfo />
        </button>
        {isModalOpen && (
           <div id="modalinfo" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-primaryBg shadow-xl shadow-black/40 overflow-auto rounded-lg flex flex-col justify-between pb-2 sm:pb-4 w-full md:px-0 h-auto border border-primaryBgBorder">
            <div className="h-full w-full">
              <button
                className="absolute top-2 right-2 p-1 border-2 border-primaryNeon rounded-full text-body hover:bg-primaryNeon transition duration-300"
                onClick={handleModalOpen}
              >
                <IoClose />
              </button>
              <img
                src={`${movie.backdropPath}`}
                className="w-full h-[220px] object-cover"
              />
              <div className="flex flex-col gap-y-1 p-2 font-body text-xs">
                <h1 className="font-title font-black text-white flex flex-wrap items-center gap-1">
                  <span className="line-clamp-1">{movie.originalTitle}</span>
                  <span className="text-subBody">
                    {" "}
                    ( {new Date(movie?.releaseDate).toLocaleDateString()} )
                  </span>
                </h1>
                <p className="flex flex-row items-center gap-x-2 text-[10px] text-bodyColor">
                  <AiFillStar className="text-yellow-600" />
                  <span>
                    {movie?.voteAverage.toFixed(1)} / 10 - {movie?.voteCount} Avaliações
                  </span>
                </p>
                <p className="line-clamp-1 text-white">{movie?.overview}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 w-full px-2 text-xs">
                <Link bgNotPrimary fullWidth to={`/movie/${movie.id}`} onlyBorder={false}>Ver mais</Link>
                {!isFavorited ? (
                  <Button fullWidth small={false} green={false} onlyBorder onClick={() => addToFavorites()} type="button">Favoritar</Button>
                ) : (
                  <Button fullWidth small={false} green={false} onlyBorder disabled type="button">Favoritado</Button>
                )}
            </div>
          </div>
        )}
      </div>
  );
};
export default Movie;
