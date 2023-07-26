import { createContext, useState } from "react";

export const LayoutContext = createContext();

export const LayoutContextProvider = ({ children }) => {
    const [headerImg, setHeaderImg] = useState(null);
 
    return (
        <LayoutContext.Provider value={{ headerImg, setHeaderImg }}>
            {children}
        </LayoutContext.Provider>
    );
};