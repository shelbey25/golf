import { ReactNode, createContext, useContext, useState } from "react";

const StateContext = createContext<{ 
  mode: string; setMode: React.Dispatch<React.SetStateAction<string>>; 
  club: string; setClub: React.Dispatch<React.SetStateAction<string>>; 
  previewProfile: any; setPreviewProfile: React.Dispatch<React.SetStateAction<any>>; 
} | undefined>(undefined);
  


const RouteWrap = ({children}: {children: ReactNode}) => {
    const [mode, setMode] = useState('INIT');
    const [club, setClub] = useState('');
    const [previewProfile, setPreviewProfile] = useState(null);

return <StateContext.Provider value={{ mode, setMode, club, setClub, previewProfile, setPreviewProfile }}>{children}</StateContext.Provider>
}

export default RouteWrap

export const useAppState = () => {
    const context = useContext(StateContext);
    if (!context) {
      throw new Error('useAppState must be used within a StateProvider');
    }
    return context;
  };