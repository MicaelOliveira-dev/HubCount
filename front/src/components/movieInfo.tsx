import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { AiFillStar } from "react-icons/ai";
import Loading from "views/Loading";
import { MovieModel } from "models/entities/Movie";
import { BsDash, BsPlayFill, BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

interface MovieInfoProps {
  movieId?: string;
}

const MovieInfo = ({ movieId }: MovieInfoProps) => {
  const [movieById, setMovieById] = useState<MovieModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  interface GenreMap {
    [key: number]: string;
  }
  
  const genreMap: GenreMap = {
    1: 'Action',
    2: 'Adventure',
    3: 'Animation',
    4: 'Comedy',
    5: 'Crime',
    6: 'Documentary',
    7: 'Drama',
    8: 'Family',
    9: 'Fantasy',
    10: 'History',
    11: 'Horror',
    12: 'Music',
    13: 'Mystery',
    14: 'Romance',
    15: 'ScienceFiction',
    16: 'TVMovie',
    17: 'Thriller',
    18: 'War',
    19: 'Western',
    20: 'Other',
  };

  useEffect(() => {
    const fetchMovieById = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://localhost:7269/api/Movies/GetMovieById/${movieId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }
        const movieData = await response.json();
        setMovieById(movieData);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
      setIsLoading(false);
    };

    fetchMovieById();
  }, [movieId]);
  const data = {
    labels: ["Gostaram", "Não gostaram"],
    datasets: [
      {
        data: [movieById?.liked, movieById?.didNotLike],
        backgroundColor: ["#00fa43", "#b5b5b5"],
        borderColor: ["#00fa43", "#b5b5b5"],
        minHeight: 1,
        minWidth: 1,
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("userId não encontrado no localStorage");
          return;
        }
        const response = await fetch(`https://localhost:7269/api/CheckIfMovieIsFavorited/${userId}/${movieId}`);
        const data = await response.json();
        setIsFavorited(data.isFavorited);
      } catch (error) {
        console.error('Erro ao verificar se o filme está favoritado:', error);
      }
    };
    if (data) {
      checkIfFavorited();    
    }
  }, [movieId]);

  const addToFavorites = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("userId não encontrado no localStorage");
        return;
      }
      const response = await fetch(`https://localhost:7269/api/AddMovieToFavorites/${userId}/${movieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsFavorited(true);
      } else {
        console.error("Erro ao adicionar o filme aos favoritos:", response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar o filme aos favoritos:', error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("userId não encontrado no localStorage");
        return;
      }

      // Fazer a chamada à sua API para remover o filme dos favoritos
      const response = await fetch(`https://localhost:7269/api/RemoveFavoriteMovie/${userId}/${movieId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setIsFavorited(false);
      } else {
        console.error("Erro ao remover o filme dos favoritos:", response.statusText);
      }
    } catch (error) {
      console.error('Erro ao remover o filme dos favoritos:', error);
    }
  };

  if (isLoading) return <Loading big />;
 
  return (
    <main className="w-full h-auto">
      {/* Banner */}
      <div className="h-[650px] w-full">
        <div className="h-full w-full relative">
          <img
            src={movieById?.backdropPath}
            className="h-full w-full object-cover"
            alt="Backdrop"
          />
          <div className="bg-black absolute inset-0 h-full w-full opacity-30" />
        </div>
      </div>

      {/* Sinopse do banner */}
      <div className="h-[1000px] sm:h-[1000px] md:h-[800px] lg:h-[600px] text-body ">
        <div className="h-auto min-h-[600px] bg-primaryBgBorder w-full px-4 md:w-[85%] md:px-0 mx-auto -mt-[30%] md:-mt-[10%] shadow-md rounded-lg absolute left-1/2 -translate-x-1/2 ">
          <div className="absolute left-[85%] top-[-35px] w-20 h-20 text-4xl flex items-center justify-center text-white border-2 border-primaryNeon p-3 rounded-full transition bg-primaryNeon duration-300 hover:text-black cursor-pointer" onClick={isFavorited ? removeFromFavorites : addToFavorites}>
            {isFavorited ? <BsDash /> : <BsPlus />}
          </div>          
          {/* Início da sinopse  */}
          <div className="p-4 md:p-8 flex flex-col gap-y-4">
            {/* Imagem e informações adicionais*/}
            <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="relative">
                <img
                  src={movieById?.posterPath}
                  className="w-full md:w-[250px] h-[300px] md:h-[20%] rounded-lg shadow-md object-cover"
                  alt="Poster"
                />
                <Link
                  to={`/trailer/${movieById?.originalTitle}`}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-primaryNeon p-3 rounded-full flex flex-col items-center justify-center text-iconSize hover:bg-primaryNeon cursor-pointer transition duration-300"
                >
                  <BsPlayFill />
                </Link>
            </div>  
            <div className="flex flex-col gap-4">
                {/* Titulo */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row items-baseline justify-between gap-2">
                    <div className="flex flex-row items-baseline gap-2 flex-wrap">
                      <div className="font-title font-black text-movieSlideTitle">
                        {movieById?.originalTitle}{" "}
                        <span className="font-normal text-title">
                          {" "}
                          <p>( {movieById?.releaseDate.substring(0, 4)} ) </p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Informacoes adicionais */}

                {/* Minutos e categorias */}
                <div className="flex flex-row flex-wrap gap-2 text-subBody items-center">
                  <p className="p-1 border border-primaryBg w-fit text-bodyColor rounded-lg">
                    {movieById?.adult ? "Filme adulto" : "Não adulto"}
                  </p>{" "}
                  -<p>{movieById?.releaseDate.substring(0,10)}</p> 
                  -
                  <div className="text-body">
                    {movieById?.duration}
                  </div>
                  <p className="p-1 border border-primaryBg w-fit text-bodyColor rounded-lg">
                  {movieById?.genreIds.map((genreId, index) => {
                    if (typeof genreId === 'number' && genreMap.hasOwnProperty(genreId)) {
                      return (
                        <span key={genreId}>
                          {genreMap[genreId]}
                          {index < movieById.genreIds.length - 1 && ', '}
                        </span>
                      );
                    }
                    return null;
                  })}
                  </p>
                </div>
                <div className="flex flex-col gap-4 text-bodyColor">
                  <p className="flex flex-row items-center gap-x-2">
                    Orçamento:{" "}
                    <span className="text-primary font-black">
                    {movieById && movieById.budget ? movieById.budget.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) : "N/A"}
                    </span>{" "}
                  </p>
                  <p className="flex flex-row items-center gap-x-2">
                    Bilheteria:{" "}
                    <span className="text-primary font-black">
                    {movieById && movieById.boxOffice ? movieById.boxOffice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) : "N/A"}
                    </span>{" "}
                  </p>
                </div>
                {/* Grafico de amostragem e outras coisas */}

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Grafico e titulo */}
                  <div className="flex flex-row-reverse items-center gap-4">
                    <p className="text-smallDevicesTitle font-title font-black max-w-[120px]">
                      Classificação geral do público
                    </p>
                    <div className="max-h-[80px] max-w-[80px] ">
                      <Doughnut
                        data={data}
                        options={{ plugins: { legend: { display: false } } }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row text-body text-bodyColor gap-2">
                    <p className="flex flex-row items-center gap-x-2">
                      <AiFillStar className="text-yellow-600" />
                      <span>{movieById?.voteAverage}</span>
                    </p>
                    /<p>{movieById?.voteCount} - Votantes</p>
                  </div>
                </div>
                {/* Sinopse */}
                <div className="flex flex-col gap-y-4">
                  <p className="text-smallDevicesTitle font-title font-black">
                    Sinopse
                  </p>
                  <p>{movieById?.synopsis}</p>
                </div>

                {/* Informacoes adicionais */}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-title font-black text-subTitle">
                Produzido por
              </p>
              <div className="flex flex-row items-center gap-4">
                {movieById?.producers.map((company: string, index: number) => (
                  <span key={index} className="text-subBody text-bodyColor">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieInfo;
