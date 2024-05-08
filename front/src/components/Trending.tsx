import { MovieModel } from "models/entities/Movie";
import Title from "./Title";
import React, { useEffect, useState } from "react";
import Loading from "views/Loading";
import MoviesList from "./MoviesList";

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState<number[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://localhost:7269/api/Movies/GetMoviesByYear/2024");
        if (response.ok) {
          const data: MovieModel[] = await response.json();
          // Extrair os IDs dos filmes
          const movieIds = data.map(movie => movie.id);
          setTrendingMovies(movieIds);
          setIsLoading(false);
        } else {
          throw new Error("Erro ao carregar os filmes");
        }
      } catch (error) {
        console.error("Erro:", error)
      }
    };
  
    fetchMovies();
  }, []);
  return (
    <>
      <main>
        <Title
          bold
          center={false}
          green={false}
          message="Os mais populares no momento"
        />
        {!isLoading && trendingMovies ? (
          <>
            <MoviesList
              hasMovies
              grid={false}
              extraItems={false}
              movies={trendingMovies}
            />
          </>
        ) : (
          <Loading big={false} />
        )}
      </main>
    </>
  );
};

export default Trending;
