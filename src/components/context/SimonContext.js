import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { END_GAME, gameReducer, INITIAL_GAME, INITIAL_STATE, NEXT_LEVEL, START_GAME, UPDATE } from "../reducer/SimonReducer";
import { timeout } from "../utilities/utilities";

const SimonContext = createContext();

export default function SimonContextProvider({ children }) {
    // constant
    const colorsArr = ['green', 'red', 'yellow', 'blue'];

    // useState
    const [isPlay, setIsPlay] = useState(false);        // start-stop game
    const [blinkColor, setBlinkColor] = useState('');   // set color to blink (active)
    const [highScore, setHighScore] = useState(0);      // store and update high score

    // useReducer
    const [game, dispatchGame] = useReducer(gameReducer, INITIAL_GAME);

    // state 1: initialize -----------------------------------------------------------------------------------
    useEffect(() => {
        if (isPlay) dispatchGame({ type: START_GAME });
        else dispatchGame({ type: INITIAL_STATE });
    }, [isPlay]);
    // -------------------------------------------------------------------------------------------------------

    // state 2: Simon's turn ---------------------------------------------------------------------------------
    useEffect(() => {
        // set Simon's colors
        if (isPlay && game.simonTurn) {
            const newColor = colorsArr[Math.floor(4 * Math.random())];
            const tempColorsArr = [...game.simonColors, newColor];
            dispatchGame({ type: UPDATE, payload: { simonColors: tempColorsArr } });
        }
    }, [isPlay, game.simonTurn]);

    // need to split into 2 useEffect, to avoid infinity re-render due to updating value in dependency array [game.simonColors.length]
    useEffect(() => {
        // show Simon's colors to Player
        const IsSimonColorsValid = Boolean(game.simonColors.length);
        if (isPlay && game.simonTurn && IsSimonColorsValid) {
            showColors();
        }
    }, [isPlay, game.simonTurn, game.simonColors.length]);

    const showColors = async () => {
        // consequently blink each colors
        for (let i = 0; i < game.simonColors.length; i++) {
            await timeout();
            setBlinkColor(game.simonColors[i]);
            await timeout();
            setBlinkColor('');
        }
        // update game: end Simon's turn | start Player's turn | Player's colors
        const tempArrColors = [...game.simonColors];
        const updateObjGame = {
            simonTurn: false,
            playerTurn: true,
            playerColors: tempArrColors
        };
        await timeout(); // delay for turn display
        dispatchGame({ type: UPDATE, payload: updateObjGame });
    }
    // -------------------------------------------------------------------------------------------------------

    // state 3: Player's turn --------------------------------------------------------------------------------
    const handleCardClick = async (color) => {
        // handle click just when isPlay = true and it's also Player turn
        if (isPlay && game.playerTurn) {
            const tempPlayerColorsArr = [...game.playerColors];
            const currentColor = tempPlayerColorsArr.shift();
            setBlinkColor(color);
            await timeout(80);
            setBlinkColor('');
            await timeout(80);
            if (currentColor === color) {
                if (tempPlayerColorsArr.length) {
                    // Player need to play at least 1 more color
                    dispatchGame({ type: UPDATE, payload: { playerColors: tempPlayerColorsArr } });
                } else {
                    // setup for next level
                    const updateObjGame = {
                        playerColors: [],
                        playerTurn: false,
                        simonTurn: true,
                    }
                    await timeout(); // delay for turn display
                    dispatchGame({ type: NEXT_LEVEL, payload: updateObjGame });
                }
            } else {
                // select wrong color, so it's the end of the game
                if (game.simonColors.length - 1 > highScore) setHighScore(game.simonColors.length - 1);
                const updateObjGame = {
                    simonColors: [],
                    playerColors: []
                };
                dispatchGame({ type: END_GAME, payload: updateObjGame });
            }
        }
    }
    // -------------------------------------------------------------------------------------------------------

    return (
        <SimonContext.Provider value={{ game, dispatchGame, isPlay, setIsPlay, blinkColor, handleCardClick, colorsArr, highScore }}>
            {children}
        </SimonContext.Provider>
    );
}

export function useSimon() {
    return useContext(SimonContext);
}