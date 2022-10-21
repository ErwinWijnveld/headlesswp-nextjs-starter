import { createContext, useContext } from "react";

export const OptionsContext = createContext(null);

export const OptionsContextProvider = ({ children, value }) => {
    return (
        <OptionsContext.Provider value={value}>
            {children}
        </OptionsContext.Provider>
    );
};

export function useOptions() {
    const options = useContext(OptionsContext);

    return options;
}
