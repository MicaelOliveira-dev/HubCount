import axios from "axios";
import { MovieModel } from "models/entities/Movie";
import { useState, useEffect } from "react";
import Movie from "shared/movie";

interface SearchedMoviesProps {
  movieName: string;
}

const SearchedMovies: React.FC<SearchedMoviesProps> = ({ movieName }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieModel[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!movieName) return; // Don't fetch if movieName is empty
      setLoading(true);
      try {
        const response = await axios.get(
          `https://localhost:7269/api/Movies/GetMoviesByName/${movieName}`
        );
        setMovies(response.data);
      } catch (error) {
        setError("Erro ao carregar os filmes");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      // Cleanup if necessary
    };
  }, [movieName]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with your loading component
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <main className="pb-[100px] pt-[120px] min-h-screen w-[85%] flex flex-col gap-4 md:flex-row mx-auto">
      <div className="w-full md:w-[80%] relative">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
          {movies.map((movie) => (
            <Movie movie={movie} key={movie.id} onGrid />
          ))}
        </div>
      </div>
    </main>
  );
};

export default SearchedMovies;
