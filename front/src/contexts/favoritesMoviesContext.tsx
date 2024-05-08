import React from "react";
import { ChildrenPropsModel } from "models/contexts/ContextModels";
import { MovieModel } from "models/entities/Movie";

interface FavoritesMoviesContextModel {
  movies: MovieModel[];
  recentlyAdded: MovieModel[];
  userFavoriteList: MovieModel[];
  checkIfMovieExistsInFavorites: (val: number) => boolean;
  movieAlreadyAdded: boolean;
  setUserFavoriteList: React.Dispatch<React.SetStateAction<MovieModel[]>>;
  addMovie: (val: MovieModel) => void;
  removeMovie: (val: number) => void;
  clearMovies: () => void;
}

export const FavoritesMoviesContext =
  React.createContext<FavoritesMoviesContextModel>({
    movies: [],
    recentlyAdded: [],
    userFavoriteList: [],
    checkIfMovieExistsInFavorites: () => false,
    movieAlreadyAdded: false,
    setUserFavoriteList: () => {},
    removeMovie: () => {},
    addMovie: () => {},
    clearMovies: () => {},
  });

const FavoritesMoviesContextProvider: React.FC<ChildrenPropsModel> = ({
  children,
}) => {
  const [movies, setMovies] = React.useState<MovieModel[]>([]);
  const [recentlyAdded, setRecentlyAdded] = React.useState<MovieModel[]>([]);
  const [userFavoriteList, setUserFavoriteList] = React.useState<MovieModel[]>(
    []
  );
  const [movieAlreadyAdded, setMovieAlreadyAdded] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (movies.length > 0) {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const recentlyAddedMovies = movies.filter(
        (movie: MovieModel) =>
          movie.addedDate && new Date(movie.addedDate) >= twoDaysAgo
      );
      setRecentlyAdded(recentlyAddedMovies);
      setUserFavoriteList(movies);
    }
  }, [movies]);

  const checkIfMovieExistsInFavorites = (movieId: number) => {
    if (movies) {
      const movieExists = movies.some((id) => id.id === movieId);
      if (movieExists) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const getMovies = () => {
    const moviesInStorage = localStorage.getItem("userFavoriteMovies");
    if (moviesInStorage) {
      setMovies(JSON.parse(moviesInStorage));
    }
  };

  React.useEffect(() => {
    getMovies();
  }, []);

  const addMovie = (movie: MovieModel) => {
    setMovies((prevMovies) => {
      const movieExists = prevMovies.some(
        (newMovie) => newMovie.id === movie.id
      );

      if (!movieExists) {
        const newMovie = { ...movie, addedDate: new Date() };
        const newMovies = [...prevMovies, newMovie];
        setMovieAlreadyAdded(true);
        localStorage.setItem("userFavoriteMovies", JSON.stringify(newMovies));
        return newMovies;
      }
      setMovieAlreadyAdded(true);
      return prevMovies;
    });
  };

  const removeMovie = (movieId: number) => {
    const movieInFavorites = movies.some((id) => id.id == movieId);
    if (movieInFavorites) {
      const newMoviesList: MovieModel[] = movies.filter((movie) => {
        return movie.id !== movieId;
      });
      setMovies(newMoviesList);
      localStorage.setItem("userFavoriteMovies", JSON.stringify(newMoviesList));
    }
  };

  const clearMovies = () => {
    setRecentlyAdded([]);
    setUserFavoriteList([]);
    setMovies([]);
    localStorage.removeItem("userFavoriteMovies");
  };

  return (
    <FavoritesMoviesContext.Provider
      value={{
        movies,
        addMovie,
        removeMovie,
        recentlyAdded,
        userFavoriteList,
        setUserFavoriteList,
        checkIfMovieExistsInFavorites,
        movieAlreadyAdded,
        clearMovies,
      }}
    >
      {children}
    </FavoritesMoviesContext.Provider>
  );
};

export default FavoritesMoviesContext;
export { FavoritesMoviesContextProvider };
