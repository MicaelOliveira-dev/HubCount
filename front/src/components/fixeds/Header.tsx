import { IoMenu } from "react-icons/io5";
import React, { useState, useContext } from "react";
import SideBarContext from "contexts/SidebarContext";
import useMediaQuery from "hooks/MediaScreen";
import Linksmapped from "components/Linksmapped";
import Input from "components/input";
import LastTitleContext from "contexts/LastSearchedTitle";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import SearchedMovies from "../../views/SearchedMovies"; 

interface HeaderProps {
  isOnTop: boolean;
  showNav: boolean;
}

const Header = ({ isOnTop, showNav }: HeaderProps) => {
  const [searchParam, setSearchParam] = useState<string>("");
  const { handleLastSearchedTitle } = useContext(LastTitleContext);
  const { isToggled, handleToggle, setIsToggled } =
    useContext(SideBarContext);
  const navigate = useNavigate();

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/searchedMovies?movieName=${searchParam}`);
    }
  };

  const handleGo = () => {
    navigate(`/searchedMovies?movieName=${searchParam}`);
  };

  if (searchParam.length > 0) {
    handleLastSearchedTitle(searchParam);
  }

  const isAboveLG = useMediaQuery("(min-width: 1024px)");
  if (isAboveLG) setIsToggled(false);

  return (
    <>
      {showNav && (
        <nav className="h-[80px] mt-0 md:mt-[10px] w-full fixed top-0  text-newWhite z-50">
          <div
            className={`${
              isOnTop
                ? !isToggled
                  ? "bg-transparent"
                  : "bg-primaryBg"
                : "bg-primary/90"
            } transition-all duration-300 flex justify-between items-center h-full flex-row w-full px-6 md:w-[85%] md:rounded-lg mx-auto`}
          >
            <a
              href="/"
              className={`${
                isOnTop ? "text-primary" : "text-newWhite"
              } text-smallDevicesTitle font-title font-black md:text-subTitle lg:text-title xl:text-navTitle cursor-pointer`}
            >
              HubFilmes
            </a>
            <div className="w-3/4 px-4 md:px-0 md:w-1/3 h-1/2 relative flex flex-row items-center gap-1">
              <Input
                hasText={searchParam.length > 0}
                onChange={(e) => setSearchParam(e.target.value)}
                onClick={() => setSearchParam("")}
                type="text"
                onKeyDown={handleEnter}
                placeholder="Pesquise por um filme..."
                value={searchParam}
                withIcon
                icon={<IoMdClose />}
              />
              {searchParam.length > 0 && (
                <button
                  className="border border-primaryBgBorder hover:bg-primaryBgBorder transition duration-300 active:scale-95 h-full px-4 rounded-lg font-semibold text-xs"
                  onClick={handleGo}
                >
                  Ir
                </button>
              )}
            </div>
            <div className="text-links font-bold flex flex-row items-center gap-x-8">
              {isAboveLG ? (
                <Linksmapped isAboveLG={isAboveLG} isOnTop={isOnTop} />
              ) : (
                <button
                  className="text-iconSize active:scale-90 transition duration-300"
                  onClick={handleToggle}
                >
                  <IoMenu />
                </button>
              )}
            </div>
          </div>
        </nav>
      )}
      {/* Renderize o componente SearchedMovies com o nome do filme como propriedade */}
      {searchParam && <SearchedMovies movieName={searchParam} />}
    </>
  );
};

export default Header;
