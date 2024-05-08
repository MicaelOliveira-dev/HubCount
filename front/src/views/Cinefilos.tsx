import React, { useState, useEffect } from 'react';
import Input from "../components/input";
import Button from "../components/button";
import { IoPerson, IoSearch } from 'react-icons/io5';
import axios, { AxiosError } from 'axios'; 
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  linkFoto: string;
  filmesFavoritos: number;
  filmesAssistidos: number;
  followers: number[];
}

const Cinefilos: React.FC = () => {
  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUserId, setLoggedInUserId] = useState<number>(0); 
  const [error, setError] = useState<string | null>(null); 
    const [followingStatus, setFollowingStatus] = useState<{ [userId: number]: boolean }>({});
  const [, setFollowingIds] = useState<number[]>([]);

  useEffect(() => {    
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://localhost:7269/api/GetAllUsers');
        setUsers(response.data);        
        const followersResponse = await axios.get<number[]>(`https://localhost:7269/Follower/GetAllFollowersById/${loggedInUserId}`);
        const loggedInUserFollowers = followersResponse.data;
        const followerIds = loggedInUserFollowers.map(follower => follower); 
        setFollowingIds(followerIds);
        localStorage.setItem("followingIds", JSON.stringify(followerIds));
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
  }, [loggedInUserId]);

  const handleProfileClick = (id: number) => {
    localStorage.setItem('profileUserId', id.toString());
    history(`/profile/${id}`);
  };

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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) && user.id !== loggedInUserId
  );
  
  const handleSendMessage = async () => {    
    history(`/chat`);
  };
    
  return (
    <div className="min-h-screen flex flex-col gap-y-[20px] pt-[50px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto" style={{ marginTop: '100px' }}>
      <div className='w-[300px]' style={{ marginTop: '20px' }}>
        <Input
          type="text"
          placeholder="Busque um amigo cinéfilo"
          icon={<IoSearch />}
          withIcon={true}
          hasText
          left
          height={40}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      
      {filteredUsers.map(user => (
        <div key={user.id} className="mb-4 mt-4 rounded-lg">
          <div className="flex items-center gap-6">
            <img src={user.linkFoto} alt="Profile" className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <div className='w-[500px] flex items-start space-x-2'>
              <Button
                green={true}
                onlyBorder
                small
                fullWidth
                onClick={() => handleFollowUser(user.id)}
              >
                {followingStatus[user.id] ? 'Parar de Seguir' : 'Seguir'}
              </Button>
              <Button
                green={true}
                onlyBorder
                small
                fullWidth
                onClick={() => handleProfileClick(user.id)}
              >
                Perfil
              </Button>
              {followingStatus[user.id] && ( 
              <Button
                green={true}
                onlyBorder
                small
                fullWidth
                onClick={() => handleSendMessage()}
              >
                Enviar Mensagem
              </Button>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <p className="flex items-center gap-[10px]">
              <IoPerson className="w-5 h-5 ml-2" />
              {`Seguidores: ${user.followers}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cinefilos;
