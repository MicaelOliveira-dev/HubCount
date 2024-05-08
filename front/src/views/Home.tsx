import Banner from "components/banner";
import Categories from "components/categories";
import Similar from "components/LastSearched";
import Trending from "components/Trending";
import LastTitleContext from "contexts/LastSearchedTitle";
import { MovieModel } from "models/entities/Movie";
import React, { useEffect, useState } from "react";

const Home = () => {
  const { lastSearchedTitle } = React.useContext(LastTitleContext);
  const [similarMovies, setSimilarMovies] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://localhost:7269/api/Movies/GetTheMoviesAccordingToYourSearch/${lastSearchedTitle}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar filmes semelhantes');
        }
        if (response.ok) {
          const data: MovieModel[] = await response.json();
          const movieIds = data.map(movie => movie.id);
          setSimilarMovies(movieIds);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar filmes semelhantes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (lastSearchedTitle) {
      fetchSimilarMovies();
    }
  }, [lastSearchedTitle]);

  return (
    <>
      <main className="flex flex-col gap-y-[80px] pt-[120px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto">
        <Banner />
        <Categories />
        <Trending />
        <Similar
          isLoading={isLoading}
          lastSearchedTitle={lastSearchedTitle}
          similarMovies={similarMovies}
          categorySimilar={false}
        />
      </main>
    </>
  );
};

export default Home;
