import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { IoArchive, IoEye, IoPerson } from 'react-icons/io5';
import axios from 'axios'; 

const Cadastro: React.FC = () => {
  const [Name, setNome] = useState<string>('');
  const [Email, setEmail] = useState<string>('');
  const [Password, setSenha] = useState<string>('');
  const [LinkFoto, setFoto] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };

  const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFoto(event.target.value);
  };

  const handleCadastroClick = async () => {
    if (isValidEmail(Email)) {
      try {
        const response = await axios.post('https://localhost:7269/api/RegisterUser', {
          Name: Name,
          Email: Email,
          Password: Password,
          FilmesFavoritos: 0, 
          FilmesAssistidos: 0,
          LinkFoto: LinkFoto
        });
        navigate('/login');
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
    } else {
      setIsEmailValid(false);
    }
  };

  const isValidEmail = (value: string): boolean => {
    return value.includes('@');
  };

  return (
    <div className="flex items-center justify-start h-screen">
      <div className="bg-[#141A1F] w-[50%] h-[84%] mt-[116px] flex flex-col items-center">
        <h1 className="text-center text-[#14FF00] text-3xl font-bold font-title mt-[180px] mb-[30px]">Bem vindo de volta!</h1>   
        <button
          className="mt-[10px] h-[45px] w-[217px] font-bold font-title text-[#14FF00] bg-transparent border-2 rounded-2xl border-[#14FF00] hover:border-white hover:text-white"
          onClick={() => navigate('/login')}
        >
          Login
        </button>              
      </div>
      <div className="bg-[#0D9E00] w-[50%] h-[84%] mt-[116px] flex flex-col items-center">
        <h1 className="text-center text-3xl font-bold font-title mt-[40px] mb-[30px]">Criar Conta.</h1>
        <div className="w-full md:w-[200px] lg:w-[200px] xl:w-[400px] mb-[20px]">
          <Input
            type="text"
            placeholder="Nome ou Apelido"
            icon={<IoPerson />}
            withIcon={true}
            hasText
            left
            height={40}
            value={Name}
            onChange={handleNomeChange}
          />
        </div>
        <div className="w-full md:w-[200px] lg:w-[200px] xl:w-[400px] mb-[20px]">
          <Input
            type="text"
            placeholder="E-Mail"
            icon={<IoPerson />}
            withIcon={true}
            hasText
            left
            height={40}
            value={Email}
            onChange={handleEmailChange}
          />
          {!isEmailValid && <p className="text-black font-bold text-sm mt-1">Endereço de e-mail inválido</p>}
        </div>
        <div className="w-full md:w-[200px] lg:w-[200px] xl:w-[400px] mb-[20px]">
          <Input
            type="password"
            placeholder="Senha"
            icon={<IoEye />}
            withIcon={true}
            hasText
            left
            height={40}
            value={Password}
            onChange={handleSenhaChange}
          />
        </div>
        <div className="w-full md:w-[200px] lg:w-[200px] xl:w-[400px] mb-[20px]">
          <Input
            type="text"
            placeholder="Link da sua foto"
            icon={<IoArchive />}
            withIcon={true}
            hasText
            left
            height={40}
            value={LinkFoto}
            onChange={handleFotoChange}
          />
        </div>
        <button
          className="mt-[10px] h-[45px] w-[217px] font-bold font-title text-black bg-transparent border-2 rounded-2xl border-black hover:border-white hover:text-white"
          onClick={handleCadastroClick}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default Cadastro;