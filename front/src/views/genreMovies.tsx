import { MovieModel } from "models/entities/Movie";
import React from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Movie from "shared/movie";
import Loading from "./Loading";
import Input from "components/input";

const GenreMovies = () => {
  const { movieGenre } = useParams();
  const [movies, setMovies] = React.useState<MovieModel[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [searchParam, setSearchParam] = React.useState<string>("");
  const [searchedMovies, setSearchedMovies] = React.useState<MovieModel[]>([]);
  const [isLoadingGenreMovies, setIsLoadingGenreMovies] =
    React.useState<boolean>(false);
  const [isLoadingSearchedMovies, ] =
    React.useState<boolean>(false);
  const [isPageCountSet, setIsPageCountSet] = React.useState<boolean>(false);

  const filterMovies = (searchText: string) => {
    if (searchText.trim() === "") {
      setSearchedMovies([]);
    } else {
      const filteredMovies = movies.filter((movie) =>
        movie.originalTitle.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchedMovies(filteredMovies);
    }
  };

  React.useEffect(() => {
    if (movieGenre) {
      setIsLoadingGenreMovies(true);
      fetch(`https://localhost:7269/api/Movies/GetMoviesByGenre/${movieGenre}?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data);
          setPageCount(data.length / 20); 
          setIsPageCountSet(true);
          setIsLoadingGenreMovies(false);
        })
        .catch((error) => {
          console.error('Error fetching movies by genre:', error);
          setIsLoadingGenreMovies(false);
        });
    }
  }, [movieGenre, page]);

  React.useEffect(() => {
    filterMovies(searchParam);
  }, [searchParam, movies]);

  const initialPage = isPageCountSet ? 0 : undefined;

  return (
    <>
      <main className="min-h-screen font-body text-body pt-[120px] pb-[100px] flex flex-col justify-between gap-y-10 w-full">
        <div className="w-full px-4 md:w-[85%] md:px-0 mx-auto flex flex-col items-center gap-y-5">
          <div className="flex flex-col gap-y-2 w-full">
            <label
              htmlFor="searchFilter"
              className="font-body text-sm font-bold text-bodyColor"
            >
              Use o campo abaixo para filtrar os filmes{" "}
            </label>
            <div className="w-full md:w-[70%]">
              <Input
                hasText={searchParam.length > 0}
                onChange={(e) => setSearchParam(e.target.value)}
                type="text"
                placeholder="Digite o nome do filme que está buscando..."
                onClick={() => setSearchParam("")}
                value={searchParam}
              />
            </div>
          </div>          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3 w-full">
            {!isLoadingGenreMovies && !isLoadingSearchedMovies ? (
              searchParam.length === 0 ? (
                movies.map((movie: MovieModel) => (
                  <Movie
                    key={movie.id}
                    movie={movie}
                    onGrid
                  />
                ))
              ) : (
                searchedMovies.map((sMovie: MovieModel) => (
                  <Movie
                    movie={sMovie}
                    key={sMovie.id}
                    onGrid
                  />
                ))
              )
            ) : (
              <Loading big />
            )}
          </div>
          <ReactPaginate
            className="flex flex-row gap-2 items-center justify-center w-fit md:max-w-full flex-wrap max-w-[300px]"
            pageClassName="border-2 border-primaryBgBorder rounded-lg px-3 py-1"
            activeClassName="bg-primaryBgBorder"
            breakLabel="..."
            pageCount={pageCount}
            onPageChange={(e) => setPage(e.selected + 1)}
            pageRangeDisplayed={5}
            renderOnZeroPageCount={null}
            nextLabel="Próximo"
            previousLabel="Anterior"
            initialPage={initialPage}
          />
        </div>
      </main>
    </>
  );
};

export default GenreMovies;