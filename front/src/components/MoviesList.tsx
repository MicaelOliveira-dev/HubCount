import { useState, useEffect } from "react";
import Movie from "shared/movie";
import Slide from "shared/Slide";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import Button from "./button";
import { IoMdClose } from "react-icons/io";
import { MovieModel } from "models/entities/Movie"; 

interface MovieListProps {
  movies:number[];
  grid: boolean;
  extraItems: boolean;
  hasDarkBg?: boolean;
  hasMovies: boolean;
  disableRemoveButton?: boolean;
}

const MoviesList = ({ movies, grid, extraItems, hasDarkBg, hasMovies, disableRemoveButton }: MovieListProps) => {
  const [detailedMovies, setDetailedMovies] = useState<MovieModel[]>([]);

  useEffect(() => {
    const fetchDetailedMovies = async () => {
      const detailedMoviesData = await Promise.all(
        movies.map(async (movie) => {
          const response = await fetch(`https://localhost:7269/api/Movies/GetMovieById/${movie}`);
          const data = await response.json();
          return data;
        })
      );      
      setDetailedMovies(detailedMoviesData);
    };
    fetchDetailedMovies();
  }, [movies]);

  const handleRemoveFromList = async (movieId: number) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found");
      }
      const response = await fetch(`https://localhost:7269/api/RemoveFavoriteMovie/${userId}/${movieId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!response.ok) {
        throw new Error('Failed to remove movie from favorites list');
      }
      setDetailedMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error('Error removing movie from favorites list:', error);
    }
  };

  return (
    <>
      {!grid ? (
        <Slide movies={hasMovies} hasDarkBg={hasDarkBg} scrollBar modules={[Pagination, Scrollbar, Navigation]}>
          {detailedMovies.map((movie) => (
            <SwiperSlide key={movie.id} className="py-10">
              <div className="flex flex-col gap-y-2">
                <Movie movie={movie} onGrid={grid} />
                {extraItems && (
                  <>
                    <p className="text-xs italic text-bodyColor">
                      Adicionado em{" "}
                      {movie.addedDate &&
                        new Date(movie.addedDate).toLocaleDateString("pt-BR")}
                    </p>
                    <Button
                      onClick={() => handleRemoveFromList(movie.id)}
                      green={false}
                      onlyBorder
                      small
                      fullWidth
                    >
                      Remover da lista <IoMdClose className="font-black" />
                    </Button>
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Slide>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-3 w-full">
          {detailedMovies.map((movie) => (
            <div key={movie.id} className="flex flex-col gap-y-2">
              <Movie movie={movie} onGrid={grid} />
              {extraItems && (
                <>
                  {!disableRemoveButton && (
                    <Button
                      onClick={() => handleRemoveFromList(movie.id)}
                      green={false}
                      onlyBorder
                      small
                      fullWidth
                    >
                      Remover da lista <IoMdClose className="font-black" />
                    </Button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MoviesList;
