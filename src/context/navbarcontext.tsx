import { createContext, ReactNode, useContext, useState } from "react";

export const navbarContext = createContext({
    activeItem: "",
    setActiveItem: (item: string) => {}
});

export const useNavbar = ()=>{
  return useContext(navbarContext)
}

export const NavbarProvider =  ({ children }: { children: ReactNode }) => {
    const [activeItem, setActiveItem] = useState<string>("");
  
    return (
      <navbarContext.Provider value={{ activeItem, setActiveItem }}>
        {children}
      </navbarContext.Provider>
    );
  };