import React, { useState } from "react";
import Input from "components/input";
import { useNavigate } from "react-router-dom";
import { IoEye, IoPerson } from "react-icons/io5";
import LoginContext from "contexts/LoginContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>(""); 
  const { login } = React.useContext(LoginContext);
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginClick = async () => {
    try {
      const response = await fetch("https://localhost:7269/api/AuthLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const { id, name, linkFoto } = data; 
        login(email);
        localStorage.setItem("userId", id.toString()); 
        localStorage.setItem("userName", name); 
        localStorage.setItem("userPhoto", linkFoto); 
        navigate("/profile");
      } else {
        setLoginError("E-mail ou senha inválidos.");
        console.error("Falha no login:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao processar solicitação:", error);
    }
  };
  

  const isValidEmail = (value: string): boolean => {
    return value.includes("@");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <main className="bg-[#0D9E00] rounded-lg w-3/4 md:w-1/3 lg:w-1/3 xl:w-1/2 h-2/4 md:h-[400px] lg:h-[400px] xl:h-[400px] flex flex-col items-center justify-start gap-4 mx-auto">
        <h1 className="text-center text-3xl font-bold font-title mt-[40px] mb-[30px]">
          FAÇA LOGIN
        </h1>
        <div className="w-full md:w-[200px] lg:w-[200px] xl:w-[400px]">
          <Input
            type="text"
            placeholder="E-Mail"
            icon={<IoPerson />}
            withIcon={true}
            hasText
            left
            height={40}
            value={email}
            onChange={handleEmailChange}
          />
          {!isValidEmail && (
            <p className="text-black font-bold text-sm mt-1">
              Endereço de e-mail inválido
            </p>
          )}
        </div>
        <div className="w-full md:w-[200px] lg:w-[200px] xl:w-[400px]">
          <Input
            type="password"
            placeholder="Senha"
            icon={<IoEye />}
            withIcon={true}
            hasText
            left
            height={40}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {loginError && ( 
          <p className="text-black font-bold">{loginError}</p>
        )}
        <p className="font-bold font-title text-white cursor-pointer mt-2">
          Não tem conta.{" "}
          <a href="/Cadastro"><span className="text-black font-bold">Criar conta</span></a>
        </p>
        <button
          className="mt-[10px] h-[45px] w-[217px] font-bold font-title text-black bg-transparent border-2 rounded-2xl border-black hover:border-white hover:text-white"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </main>
    </div>
  );
};

export default LoginPage;
