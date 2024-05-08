import { MovieGenreModel } from "models/entities/movieGenre";
import React from "react";
import Title from "./Title";
import { AllCategories } from "data/Categories";

const Categories = () => {
  const [showMore, setShowMore] = React.useState(true);
  const handleToggleItems = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  return (
    <>
      <main className="flex flex-col gap-y-4 text-body">
        <Title
          bold
          center={false}
          green={false}
          message="Explore novas categorias"
        />
        <div className="flex flex-col gap-y-6 h-auto">
          <div
            className={` ${
              !showMore ? "h-auto md:h-[560px] lg:h-[440px] xl:h-[420px]" : "h-[200px] overflow-hidden "
            } grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full gap-4 transition-all duration-300 relative`}
          >
            {showMore && (<div className="absolute bottom-0 w-full h-[80px] bg-gradient-to-b from-transparent to-primaryBg"></div>)}
            {AllCategories.map((cat: MovieGenreModel) => (
              <div
                key={cat.id}
                className="h-[100px] rounded-lg border border-primaryBgBorder p-2 flex flex-row gap-2 w-full justify-between items-center hover:shadow-lg hover:shadow-black/40 transition duration-300 opacity-100 ease-in"
              >
                <div className="w-full self-center">
                  <p className="p-4 justify-center items-center flex bg-primaryBg rounded-2xl text-primary text-3xl">
                    {cat.icon &&
                      React.createElement(cat.icon as React.ElementType)}
                  </p>
                </div>
                <div className="flex flex-col h-full w-full justify-center gap-4">
                  <p className="text-xs sm:text-sm font-semibold">{cat.name.length > 10 ? cat.name.slice(0, 6) + "..." : cat.name}</p>
                  <a
                    className="text-xs italic underline text-primary"
                    href={`/genre/${cat.id}`}
                  >
                    Ver mais
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleToggleItems}
            className="text-bodyColor text-xs underline italic"
          >
            {showMore ? "Mostrar mais" : "Mostrar menos"}
          </button>
        </div>
      </main>
    </>
  );
};

export default Categories;
