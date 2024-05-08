import React, { useState, useEffect  } from "react";
import Title from "components/Title";
import Text from "components/Text";
import Row from "components/Row";
import Button from "components/button";
import { BiUser, BiSolidChat } from "react-icons/bi";
import GreenText from "components/GreenText";
import Link from "components/Link";
import MoviesList from "components/MoviesList";
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios'; 


interface UserDTO {
  id: number;
  name: string;
  filmesAssistidos: number;
  filmesFavoritos: number;
  linkFoto: string;
  followers: number;
}


const ProfileUsers = () => {
  const { profileUserId } = useParams<{ profileUserId: string }>();
  const [, setError] = useState<string | null>(null); 
  const [followingStatus, setFollowingStatus] = useState<{ [userId: number]: boolean }>({});
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
  const [userData, setUserData] = React.useState<UserDTO | null>(null);
  const [, setUsers] = useState<UserDTO[]>([]);
  const [userFavoriteMovies, setUserFavoriteMovies] = useState<number[]>([]);
  const [userMostRepeatedCategoryName] = React.useState<string>("");
  const [userMoviesCount] = React.useState<number>();
  const [userTitle, setUserTitle] = React.useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (profileUserId) {
        try {
          const response = await axios.get<UserDTO>(`https://localhost:7269/api/GetUserById/${profileUserId}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };        
    fetchUserData();
    const userId = localStorage.getItem('userId');
    if (userId) {
      setLoggedInUserId(parseInt(userId));
    }
  }, [profileUserId]);

  useEffect(() => {
    const fetchUserFavoriteMovies = async () => {
      if(userData?.id) {
        const userFavoriteMoviesResponse = await fetch(`https://localhost:7269/api/GetUserFavoriteMovies/${userData?.id}`);
        const userFavoriteMovies = await userFavoriteMoviesResponse.json();
        setUserFavoriteMovies(userFavoriteMovies);
      }      
    };
    fetchUserFavoriteMovies();
  }, [userData?.id])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserDTO[]>('https://localhost:7269/api/GetAllUsers');
        setUsers(response.data);        
        const followersResponse = await axios.get<number[]>(`https://localhost:7269/Follower/GetAllFollowersById/${userId}`);
        const loggedInUserFollowers = followersResponse.data;
        const followingStatusCopy: { [userId: number]: boolean } = {};
        response.data.forEach(user => {
          followingStatusCopy[user.id] = loggedInUserFollowers.includes(user.id);
        });
        setFollowingStatus(followingStatusCopy);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };    
    fetchUsers();
    const userId = localStorage.getItem('userId');
    if (userId) {
      setLoggedInUserId(parseInt(userId));
    }
  }, []);

  const handleFollowUser = async (userId: number) => {
    try {      
      if (loggedInUserId !== null) { 
        if (followingStatus[userId]) {
          await axios.post('https://localhost:7269/Follower/unfollow', {
            seguidorId: loggedInUserId,
            seguidoId: userId
          });
          window.location.reload();
        } else {
          await axios.post('https://localhost:7269/Follower/follow', {
            seguidorId: loggedInUserId,
            seguidoId: userId
          });
          window.location.reload();
        }
        const followingStatusCopy = { ...followingStatus };
        followingStatusCopy[userId] = !followingStatus[userId];        
        setFollowingStatus(followingStatusCopy);        
      }
    } catch (error) {
      if ((error as AxiosError).response?.status === 400) {
        setError('Usuário já está sendo seguido.');
      } else {
        console.error('Erro ao seguir o usuário:', error);
        setError('Erro ao seguir o usuário. Tente novamente mais tarde.');
      }
    }
  };
  
  React.useEffect(() => {
    const userId = localStorage.getItem('profileUserId');
    if (userId) {
      fetch(`https://localhost:7269/api/GetUserById/${userId}`)
        .then(response => {
          if (!response.ok) {            
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then(data => {
          setUserData(data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const { filmesFavoritos } = userData;
      if (filmesFavoritos >= 0 && filmesFavoritos <= 25) {
        setUserTitle("Assiste alguns filmes");
      } else if (filmesFavoritos > 25 && filmesFavoritos <= 50) {
        setUserTitle("Gosta de assistir filmes");
      }
    }
  }, [userData]);

  return (
    <>
      <main className="flex flex-col gap-y-[80px] pt-[120px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto">
        <div className="flex flex-wrap flex-row items-start gap-4 h-auto bg-primaryBgBorder p-4 rounded-lg shadow-lg shadow-black/30 w-full justify-center sm:justify-start">
          <div className="h-full w-full md:w-1/4 flex flex-row items-center md:justify-center gap-4">
          <img
              src={userData?.linkFoto}
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
                  {userData?.name} {" - "}
                  {userTitle}
                </Row>
              }
              responsive
              fullWidth
            />
            <Row space>
              <Row baseline responsive>
                {" "}
                <GreenText bold> {userData?.filmesFavoritos} </GreenText>{" "}
                <Text text="Filmes favoritados" bold />
              </Row>
              <Row baseline responsive>
                {" "}
                <GreenText bold> {userData?.followers} </GreenText>{" "}
                <Text text="Amigos cinéfilos" bold />
              </Row>
            </Row>
            <Row space responsive>
              <div className="border border-primaryBg p-4 rounded-lg w-fit text-sm gap-y-2 flex flex-col">
                {userMostRepeatedCategoryName &&
                userMostRepeatedCategoryName !== "" &&
                userFavoriteMovies.length > 0 ? (
                  <>
                    <p>
                      O gênero preferido do {userData?.name} é: {" "}
                      <GreenText bold>{userMostRepeatedCategoryName}</GreenText>
                    </p>
                    <p>
                      Este usuário assistiu{" "}
                      <GreenText bold> {userMoviesCount}</GreenText> filmes
                      deste gênero{" "}
                    </p>
                  </>
                ) : (
                  <p>{userData?.name} ainda não assistiu filme.</p>
                )}
              </div>
              <div className="gap-2 flex flex-col w-full sm:w-fit">
                <Button fullWidth green={false} onlyBorder={false} small>
                  <BiSolidChat className="text-2xl" />
                  Enviar mensagem{" "}
                </Button>
                <Button fullWidth green={false} onlyBorder={false} small onClick={() => userData && handleFollowUser(userData.id)}>
                  <BiUser className="text-2xl" />
                  {userData && userData.id && followingStatus[userData.id] ? 'Parar de Seguir' : 'Seguir'}
                </Button>
              </div>
            </Row>
          </div>
        </div>
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
                disableRemoveButton={true}
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

export default ProfileUsers;
