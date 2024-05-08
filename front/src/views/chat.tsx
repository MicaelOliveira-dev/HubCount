import React, { useState, useEffect } from "react";
import Card from "components/card";
import { IoSend } from "react-icons/io5";
import Input from "components/input";
import axios from "axios";

interface ChatUser {
  id: number;
  idUserOne: number;
  idUserTwo: number;
}

interface UserInfo {
  id: number;
  name: string;
  lastMessage: string;
  linkFoto: string;
}

interface ChatProps {
  chatsUsers: ChatUser[];
}
interface Message {
  id: number;
  sender: number;
  recipient: number;
  content: string;
  data: string;
}

const Chat: React.FC<ChatProps> = () => {
  const [usersInfo, setUsersInfo] = useState<UserInfo[]>([]); 
  const [searchChatParam, setSearchChatParam] = React.useState<string>(""); 
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null); 
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");

  const getUserInfoById = async (userId: number) => {
    try {
      const response = await axios.get(`https://localhost:7269/api/GetUserById/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
      return null;
    }
  };
  
  const getLastMessage = async (recipientId: number) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `https://localhost:7269/api/Chat/GetLastMessage?senderId=${userId}&recipientId=${recipientId}`
      );
      return response.data.content;
    } catch (error) {
      console.error("Error fetching the last message of the chat:", error);
      return null;
    }
  };

  const getMessages = async (senderId: number, recipientId: number) => {
    try {
      const response = await axios.get(
        `https://localhost:7269/api/Chat/GetAllMessages?senderId=${senderId}&recipientId=${recipientId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  const handleCardClick = async (userInfo: UserInfo) => {
    setSelectedUser(userInfo);
    const userId = localStorage.getItem("userId");
    const messages = await getMessages(Number(userId), userInfo.id);
    setMessages(messages);
  };

  const sendMessage = async () => {
    if (!selectedUser || !newMessage.trim()) return;

    try {
      const userId = localStorage.getItem("userId");
      await axios.post("https://localhost:7269/api/Chat/SendMessage", {
        senderId: Number(userId),
        recipientId: selectedUser.id,
        content: newMessage.trim()
      });
      // Atualiza a lista de mensagens após enviar a mensagem
      const updatedMessages = await getMessages(Number(userId), selectedUser.id);
      setMessages(updatedMessages);
      // Limpa o campo de nova mensagem
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const followingIds = localStorage.getItem("followingIds");
    if (followingIds) {
      const ids = JSON.parse(followingIds) as number[];
      Promise.all(
        ids.map(async (id) => {
          const userInfo = await getUserInfoById(id);
          const lastMsgResponse = await getLastMessage(id);
          return { ...userInfo, lastMessage: lastMsgResponse };
        })
      )
        .then((userInfos) => {
          const validUserInfos = userInfos.filter((userInfo) => userInfo !== null);
          setUsersInfo(validUserInfos);
        })
        .catch((error) =>
          console.error("Error fetching user info and last message:", error)
        );
    }
  }, []);
  
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser) {
        const userId = localStorage.getItem("userId");
        const messages = await getMessages(Number(userId), selectedUser.id);
        setMessages(messages);
      }
    };

    const interval = setInterval(fetchMessages, 2000); 

    return () => clearInterval(interval);
  }, [selectedUser]); 

  useEffect(() => {
    if (usersInfo.length > 0 && !lastMessage) { 
      getLastMessage(usersInfo[0].id).then((message) => {
        setLastMessage(message); 
      });
    }
  }, [usersInfo, lastMessage]); 
  
  return (
    <>
      <main className="h-screen overflow-auto flex flex-col md:flex-row w-full px-4 md:w-[90%] md:px-0 mx-auto pt-[60px] mb-[60px]">
        <section className="w-full md:w-1/4 border-r border-primaryBgBorder flex flex-col gap-y-6 p-4 ">
          <Input
            placeholder="Busque por um chat"
            onClick={() => setSearchChatParam("")}
            hasText={searchChatParam.length > 0}
            value={searchChatParam}
            onChange={(e) => setSearchChatParam(e.target.value)}
          />
          <div className="flex flex-col" >
            {usersInfo.map((userInfo, index) => (
              <button onClick={() => handleCardClick(userInfo)} key={index}><Card key={index} name={userInfo.name} lastMessage={userInfo.lastMessage} linkFoto={userInfo.linkFoto}/></button>              
            ))}            
          </div>
        </section>
        <section className="w-full md:w-3/4 p-4 flex flex-col justify-between">
          <div className="mt-[70px] ml-[10px] flex flex-col space-y-2">
            {/* Exibir as mensagens */}
            {messages.map((message, index) => {
              const userId = localStorage.getItem("userId");
              const parsedUserId = userId ? parseInt(userId) : null;
              return (
                <div
                  key={index}
                  className={`max-w-[70%] p-2 rounded-lg ${parsedUserId === message.sender ? 'ml-auto bg-green-800' : 'mr-auto bg-gray-800'}`}
                >
                  <p>{message.content}</p>
                </div>
              );
            })}
          </div>
          <div className="w-full px-4 flex flex-row items-center gap-x-2 h-[40px]">
            <input
              type="text"
              className="w-full text-sm bg-transparent border border-primaryBgBorder rounded-lg pl-4 pr-8 h-full"
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress} // Adiciona o manipulador de eventos para o evento onKeyPress
            />
            <button className="cursor-pointer h-full justify-center flex flex-col text-xl active:scale-90" onClick={sendMessage}>
              <IoSend />
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Chat;
