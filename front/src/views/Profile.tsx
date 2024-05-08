import  { useState, useEffect } from "react";
import Title from "components/Title";
import Text from "components/Text";
import Row from "components/Row";
import GreenText from "components/GreenText";
import Link from "components/Link";
import MoviesList from "components/MoviesList";

interface UserDTO {
  id: number;
  name: string;
  filmesAssistidos: number;
  filmesFavoritos: number;
  linkFoto: string;
  followers: number;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserDTO | null>(null);
  const [userFavoriteMovies, setUserFavoriteMovies] = useState<number[]>([]);
  const [userTitle, setUserTitle] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const userDataResponse = await fetch(`https://localhost:7269/api/GetUserById/${userId}`);
          if (!userDataResponse.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData: UserDTO = await userDataResponse.json();
          setUserData(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserFavoriteMovies = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const userFavoriteMoviesResponse = await fetch(`https://localhost:7269/api/GetUserFavoriteMovies/${userId}`);
        if (!userFavoriteMoviesResponse.ok) {
          throw new Error('Failed to fetch user favorite movies');
        }
        const userFavoriteMovies: number[] = await userFavoriteMoviesResponse.json();
        setUserFavoriteMovies(userFavoriteMovies);
      } catch (error) {
        console.error('Error fetching user favorite movies:', error);
      }
    };

    fetchUserData();
    fetchUserFavoriteMovies();
  }, []);

  useEffect(() => {
    if (userData) {
      const { filmesFavoritos } = userData;
      if (filmesFavoritos >= 0 && filmesFavoritos <= 25) {
        setUserTitle("Assiste alguns filmes");
      } else if (filmesFavoritos > 25 && filmesFavoritos <= 50) {
        setUserTitle("Gosta de assistir filmes");
      }
      // Adicione outras condições conforme necessário
    }
  }, [userData]);

  return (
    <>
      <main className="flex flex-col gap-y-[80px] pt-[120px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto">
        {userData && (
          <div className="flex flex-wrap flex-row items-start gap-4 h-auto bg-primaryBgBorder p-4 rounded-lg shadow-lg shadow-black/30 w-full justify-center sm:justify-start">
            <div className="h-full w-full md:w-1/4 flex flex-row items-center md:justify-center gap-4">
              <img
                src={userData.linkFoto}
                className="object-cover rounded-lg"
                style={{ width: "300px", height: "300px" }} 
                alt="Descrição da imagem"
              />
            </div>
            <div className="flex flex-col gap-8 md:w-fit w-full">
              <Title
                bold
                center={false}
                green={false}
                message={
                  <Row baseline>
                    {userData.name} {" - "}
                    {userTitle}
                  </Row>
                }
                responsive
                fullWidth
              />
              <Row space>
                <Row baseline responsive>
                  {" "}
                  <GreenText bold> {userData.filmesFavoritos} </GreenText>{" "}
                  <Text text="Filmes favoritados" bold />
                </Row>
                <Row baseline responsive>
                  {" "}
                  <GreenText bold> {userData.followers} </GreenText>{" "}
                  <Text text="Seguidores cinéfilos" bold />
                </Row>
              </Row>
            </div>
          </div>
        )}
        
        <div className="flex flex-col gap-y-[10px]">
          <div className="flex flex-col gap-y-4">
            <Title
              bold
              center={false}
              green={false}
              message="Todos os filmes da sua lista você encontra aqui"
            />
            {userFavoriteMovies.length > 0 ? (
              <MoviesList
                hasMovies={true}
                extraItems={true}
                grid={true}
                movies={userFavoriteMovies}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-xs text-bodyColor gap-y-4">
                Você ainda não assistiu nenhum filme... Que pena. Vamos mudar isso!
                <Link bgNotPrimary onlyBorder to={`/`}>Navegar por Filmes</Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
