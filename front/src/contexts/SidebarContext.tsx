import { ChildrenPropsModel } from 'models/contexts/ContextModels';
import React, { createContext } from 'react'

interface SideBarContextModel {
    isToggled: boolean;
    setIsToggled: (val: boolean) => void;
    handleToggle: () => void
}

export const SideBarContext = createContext<SideBarContextModel>({
    isToggled: false,
    setIsToggled: () => {},
    handleToggle: () => {}
});

const SideBarContextProvider: React.FC<ChildrenPropsModel> = ({children}) => {
    const [isToggled, setIsToggled] = React.useState<boolean>(false);
    const handleToggle = () => {
        setIsToggled(!isToggled);
    }

    return (
        <>
            <SideBarContext.Provider value={{
                isToggled, handleToggle, setIsToggled
            }}>
                {children}
            </SideBarContext.Provider>
        </>
    )
}

export default SideBarContext
export {SideBarContextProvider}