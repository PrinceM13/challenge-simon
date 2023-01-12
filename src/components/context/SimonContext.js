import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { gameReducer, INITIAL_GAME, SET_INITIAL_STATE, START_GAME } from "../reducer/SimonReducer";

const SimonContext = createContext();

export default function SimonContextProvider({ children }) {
    const [isPlay, setIsPlay] = useState(false);
    // useReducer
    const [game, dispatchGame] = useReducer(gameReducer, INITIAL_GAME);

    // state 1: initialize
    useEffect(() => {
        if (isPlay) dispatchGame({ type: START_GAME, payload: { ...INITIAL_GAME, simonTurn: true } });
        else dispatchGame({ type: SET_INITIAL_STATE, payload: INITIAL_GAME });
    }, [isPlay]);

    return (
        <SimonContext.Provider value={{ isPlay, setIsPlay }}>
            {children}
        </SimonContext.Provider>
    );
}

export function useSimon() {
    return useContext(SimonContext);
}