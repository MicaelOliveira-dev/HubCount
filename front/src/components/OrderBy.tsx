import { MovieModel } from "models/entities/Movie";
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { sortMoviesByReleaseDate, sortMoviesByTitle } from "utils/OrderBy";
interface SelectOptions {
  value: string;
  label: string;
}

interface OrderByProps {
  movies: MovieModel[];
  setMovies: React.Dispatch<React.SetStateAction<MovieModel[]>>
  searchParam?: string;
  searchedMovies?: MovieModel[];
  setSearchedMovies?: React.Dispatch<React.SetStateAction<MovieModel[]>>;
  fullWidth?: boolean;
  absolute?: boolean;
}

const OrderBy = ({
  movies,
  setMovies,
  searchParam,
  searchedMovies,
  setSearchedMovies,
  fullWidth,
  absolute,
}: OrderByProps) => {
  const [selectOptionsMenu, setSelectOptionsMenu] =
    React.useState<boolean>(false);

  const options: SelectOptions[] = [
    { value: "none", label: "Ordenar por" },
    { value: "relevants", label: "Mais relevantes" },
    { value: "news", label: "Mais recentes" },
    { value: "titleCresc", label: "Título A-Z" },
    { value: "titleDecresc", label: "Título Z-A" },
  ];

  const [selectedOption, setSelectedOption] = React.useState<SelectOptions>(
    options[0]
  );

  const sortMoviesTitle = (order: "asc" | "desc") => {
    return sortMoviesByTitle(
      order,
      movies,
      setMovies,
      searchParam,
      searchedMovies,
      setSearchedMovies
    );
  };

  const sortMoviesByDate = () => {
    return sortMoviesByReleaseDate(
      movies,
      setMovies,
      searchParam,
      searchedMovies,
      setSearchedMovies
    );
  };

  const openSelectOptions = () => {
    setSelectOptionsMenu(!selectOptionsMenu);
  };

  const handleOptionChange = (option: SelectOptions) => {
    setSelectedOption(option);
    if (option.value == "titleCresc") {
      sortMoviesTitle("asc");
    } else if (option.value == "titleDecresc") {
      sortMoviesTitle("desc");
    } else if (option.value == "news") {
      sortMoviesByDate();
    }
  };
  return (
    <div
      className={` ${
        fullWidth ? "w-full" : "w-fit"
      } self-end cursor-pointer hover:shadow-md transition duration-300`}
    >
      <div
        onClick={openSelectOptions}
        className={`border border-primaryBgBorder rounded-md shadow-lg shadow-black/40  h-fit p-4  text-body relative ${
          fullWidth ? "w-full" : "w-[200px]"
        } `}
      >
        <div className="flex flex-col gap-y-1">
          <p className="flex flex-row items-center justify-between w-full gap-x-4">
            Ordenar por
            <MdKeyboardArrowDown
              className={`${
                selectOptionsMenu ? "rotate-0" : "rotate-180"
              } transition duration-300`}
            />
          </p>
          {selectedOption.value !== "none" && (
            <p className="text-xs text-bodyColor pl-2"> {selectedOption.label} </p>
          )}
        </div>
        {/* Ordenação */}
        {absolute && absolute ? (
          <div>
            {selectOptionsMenu && (
              <div className="absolute cursor-pointer z-20 w-full top-full left-0 text-start mt-2 bg-primaryBgBorder rounded-md py-2">
                {options
                  .slice(1, options.length)
                  .map((option: SelectOptions) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionChange(option)}
                      className="hover:bg-primaryBg py-2 px-4 w-full text-start"
                    >
                      {option.label}
                    </button>
                  ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            {selectOptionsMenu && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-y-3 w-full text-xs pt-2">
                {options
                  .slice(1, options.length)
                  .map((option: SelectOptions) => (
                    <button
                      onClick={() => handleOptionChange(option)}
                      className="hover:bg-primaryBgBorder p-2 rounded-lg transition duration-300 w-full text-start"
                    >
                      {option.label}
                    </button>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBy;