import React from "react";

interface WatchedListContextProps {
  addToWatchedList: (val: number) => void;
  watchedList: number[];
  checkIfMovieExists: (val: number) => boolean;
  alreadyAdded: boolean;
}

interface WatchedListContextProviderProps {
  children: React.ReactNode;
}

const WatchedListContext = React.createContext<WatchedListContextProps>({
  addToWatchedList: () => {},
  watchedList: [],
  checkIfMovieExists: () => false,
  alreadyAdded: false,
});

const WatchedListContextProvider: React.FC<WatchedListContextProviderProps> = ({
  children,
}) => {
  const [watchedList, setWatchedList] = React.useState<number[]>([]);
  const [alreadyAdded, setAlreadyAdded] = React.useState<boolean>(false);
  
  const addToWatchedList = (movieId: number) => {
    setWatchedList((prevList) => {
      const movieExists = prevList.some((id) => id === movieId);
      if (!movieExists) {
        setAlreadyAdded(true);
        const newList = [...prevList, movieId];
        localStorage.setItem(
          "watchedList",
          JSON.stringify(newList)
        );
        return newList;
      }
      setAlreadyAdded(false);
      return prevList;
    });
  };

  const checkIfMovieExists = (movieId: number) => {
    if (watchedList) {
      const movieExists = watchedList.some((id) => id === movieId);
      if (movieExists) {
        setAlreadyAdded(true);
        return true;
      } else {
        setAlreadyAdded(false);
        return false;
      }
    }
    return false;
  };

  React.useEffect(() => {
    const watchedMovieList = localStorage.getItem("watchedList");
    if (watchedMovieList) {
      setWatchedList(JSON.parse(watchedMovieList));
    }
  }, []);
  return (
    <WatchedListContext.Provider
      value={{ addToWatchedList, watchedList, checkIfMovieExists, alreadyAdded }}
    >
      {children}
    </WatchedListContext.Provider>
  );
};

export default WatchedListContext;
export { WatchedListContextProvider };
