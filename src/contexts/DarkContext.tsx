import { createContext, ReactNode, useState } from "react";

type DarkContextType = {
    isDark: boolean
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

type DarkContextProviderProps = {
    children: ReactNode
}

export const DarkContext = createContext({} as DarkContextType)

export function DarkContextProvider(props: DarkContextProviderProps) {
    const [isDark, setIsDark] = useState(false)

    return(
        <DarkContext.Provider value={{isDark, setIsDark}}>
            {props.children}
        </DarkContext.Provider>
    )
}