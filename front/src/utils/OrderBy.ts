import { MovieModel } from "models/entities/Movie";

export const sortMoviesByTitle = (order: "asc" | "desc", movies: MovieModel[], setMovies: React.Dispatch<React.SetStateAction<MovieModel[]>>, searchParam?: string, searchedMovies?: MovieModel[], setSearchedMovies?: React.Dispatch<React.SetStateAction<MovieModel[]>>) => {
    let sortedMovies: MovieModel[] = [];
    if(searchParam){
        if (searchParam.length == 0) {
          sortedMovies = [...movies];
        } else if(searchedMovies) {
          sortedMovies = [...searchedMovies];
        }
    } else {
        sortedMovies = [...movies];
    }
    sortedMovies.sort((a, b) => {
      const titleA = a.original_title.toLowerCase();
      const titleB = b.original_title.toLowerCase();

      if (order == "asc") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
    if(searchParam){
        if (searchParam.length == 0) {
          setMovies(sortedMovies);
        } else if (searchedMovies) {
          setSearchedMovies?.(sortedMovies);
        }
    } else {
        setMovies(sortedMovies);
    }
};


export const sortMoviesByReleaseDate = (movies: MovieModel[], setMovies: React.Dispatch<React.SetStateAction<MovieModel[]>>, searchParam?: string, searchedMovies?: MovieModel[], setSearchedMovies?: React.Dispatch<React.SetStateAction<MovieModel[]>>) => {
    let sortedMovies: MovieModel[] = [];

    if (searchParam) {
        if (searchParam.length == 0) {
            sortedMovies = [...movies];
        } else if (searchedMovies) {
            sortedMovies = [...searchedMovies];
        }
    } else {
        sortedMovies = [...movies];
    }
    sortedMovies.sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);

        return dateB.getTime() - dateA.getTime();
    });

    if (searchParam) {
        if (searchParam.length == 0) {
            setMovies(sortedMovies);
        } else if (searchedMovies) {
            setSearchedMovies?.(sortedMovies);
        }
    } else {
        setMovies(sortedMovies);
    }
};