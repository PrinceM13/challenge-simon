import { createContext, useContext, useReducer } from "react";
import { colorActiveReducer, INITIAL_COLOR, SET_COLOR_CARD_STATE } from "../reducer/SimonReducer";

const SimonContext = createContext();

export default function SimonContextProvider({ children }) {
    // useReducer
    const [isColorActive, dispatchColor] = useReducer(colorActiveReducer, INITIAL_COLOR);

    // set ColorCard state ------------------------------------------------------------------------
    const setColorCardState = (obj) => {
        const tempObj = { ...isColorActive, ...obj }
        dispatchColor({ type: SET_COLOR_CARD_STATE, payload: tempObj });
    }
    // --------------------------------------------------------------------------------------------

    return (
        <SimonContext.Provider value={{ isColorActive, setColorCardState }}>
            {children}
        </SimonContext.Provider>
    );
}

export function useSimon() {
    return useContext(SimonContext);
}