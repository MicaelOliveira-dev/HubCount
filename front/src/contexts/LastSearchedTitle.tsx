import React from "react"

interface LastTitleContextProps {
    lastSearchedTitle: string;
    handleLastSearchedTitle: (val: string) => void
}

interface LastTitleContextProviderProps {
    children: React.ReactNode
}

const LastTitleContext = React.createContext<LastTitleContextProps>({
    lastSearchedTitle: "",
    handleLastSearchedTitle: () => {}
})

const LastTitleContextProvider: React.FC<LastTitleContextProviderProps> = ({children}) => {
    const [lastSearchedTitle, setLastSearchedTitle] = React.useState<string>("");
    
    const handleLastSearchedTitle = React.useCallback((title: string) => {
        setLastSearchedTitle(prevTitle => {
            if (prevTitle !== title) {
                localStorage.setItem("lastSearchedTitle", title);
            }
            return title;
        });
    }, []);

    React.useEffect(() => {
        const titleFromStorage = localStorage.getItem("lastSearchedTitle")
        if(titleFromStorage){
            setLastSearchedTitle(titleFromStorage);
        }
    }, [])

    return (
        <LastTitleContext.Provider value={{lastSearchedTitle, handleLastSearchedTitle}} >
            {children}
        </LastTitleContext.Provider>
    )
}

export default LastTitleContext;
export {LastTitleContextProvider}