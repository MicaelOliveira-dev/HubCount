import Title from "./Title";
import Loading from "views/Loading";
import MoviesList from "./MoviesList";
interface LastSearchedProps {
  similarMovies: number[];
  isLoading: boolean;
  lastSearchedTitle?: string;
  categorySimilar: boolean;
}
const Similar = ({
  similarMovies,
  isLoading,
  lastSearchedTitle,
  categorySimilar,
}: LastSearchedProps) => {
  return (
    <>
      <section className="flex flex-col gap-y-4 h-[600px] md:h-[500px]">
        <Title
          bold
          center={false}
          green={false}
          message={
               `Filmes que são relavantes à sua ultima busca sobre ${
                  lastSearchedTitle &&
                  lastSearchedTitle.charAt(0).toUpperCase() +
                    lastSearchedTitle.slice(1)
                } `
          }
        />
        <div
          className={`${
            !categorySimilar &&
            "px-4 md:px-[30px] rounded-lg bg-primaryBgBorder h-full w-full"
          }`}
        >
          {!isLoading ? (
            <>
              {similarMovies.length > 0 ? (
                <MoviesList
                  hasMovies
                  grid={false}
                  extraItems={false}
                  movies={similarMovies.slice(0, 11)}
                  hasDarkBg={!categorySimilar}
                />
              ) : (
                <div className="flex flex-col justify-center items-center w-full h-full text-xs italic text-bodyColor">
                  Você ainda não pesquisou por nenhum filme...
                </div>
              )}
            </>
          ) : (
            <Loading big={false} />
          )}
        </div>
      </section>
    </>
  );
};

export default Similar;
