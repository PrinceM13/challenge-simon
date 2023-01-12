import { createContext, useContext, useReducer } from "react";
import { colorActiveReducer, INITIAL_COLOR_CARD, SET_COLOR_CARD_STATE } from "../reducer/SimonReducer";

const SimonContext = createContext();

// constant
const lightOn_all = { colorGreen: true, colorRed: true, colorYellow: true, colorBlue: true }
const lightOff_all = { colorGreen: false, colorRed: false, colorYellow: false, colorBlue: false }

export default function SimonContextProvider({ children }) {
    // useReducer
    const [isColorCardActive, dispatchColor] = useReducer(colorActiveReducer, INITIAL_COLOR_CARD);

    // blinking ColorCard -------------------------------------------------------------------------
    const lightOn = (c) => dispatchColor({ type: SET_COLOR_CARD_STATE, payload: { ...isColorCardActive, [c]: true } });
    const lightOff = (c) => dispatchColor({ type: SET_COLOR_CARD_STATE, payload: { ...isColorCardActive, [c]: false } });

    const blink = (color, time = 220) => {
        lightOn(color);
        setTimeout(() => lightOff(color), time);
    };
    const blinkAll = (time = 220) => {
        dispatchColor({ type: SET_COLOR_CARD_STATE, payload: { ...isColorCardActive, ...lightOn_all } });
        setTimeout(() => dispatchColor({ type: SET_COLOR_CARD_STATE, payload: { ...isColorCardActive, ...lightOff_all } }), time);
    };
    // --------------------------------------------------------------------------------------------

    return (
        <SimonContext.Provider value={{ isColorCardActive, blink, blinkAll }}>
            {children}
        </SimonContext.Provider>
    );
}

export function useSimon() {
    return useContext(SimonContext);
}