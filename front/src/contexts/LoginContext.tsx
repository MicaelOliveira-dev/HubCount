import { ChildrenPropsModel } from "models/contexts/ContextModels";
import React from "react";
import Loading from "views/Loading";

interface LoginContextProps {
    login: (email: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
    user: string;
    loading: boolean;
}

const LoginContext = React.createContext<LoginContextProps>({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    user: "",
    loading: false,
})

const LoginContextProvider: React.FC<ChildrenPropsModel> = ({ children }) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<string>("");
  
    React.useEffect(() => {
      const getItemFromStorage = async () => {
        try {
          const userEmail = await localStorage.getItem("user");
  
          if (userEmail) {
            setUser(userEmail);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Erro ao obter item do armazenamento:", error);
        } finally {
          setLoading(false);
        }
      };
  
      getItemFromStorage();
    }, []);
  
    const login = (email: string) => {
      setIsLoggedIn(true);
      localStorage.setItem("user", email);
    };
  
    const logout = () => {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    };
  
    if (loading) {
      return <Loading big />;
    }
  
    return (
      <LoginContext.Provider value={{ login, logout, isLoggedIn, user, loading }}>
        {children}
      </LoginContext.Provider>
    );
  };

export default LoginContext
export {LoginContextProvider}