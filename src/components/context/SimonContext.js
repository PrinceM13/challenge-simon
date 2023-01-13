import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { END_GAME, gameReducer, INITIAL_GAME, SET_INITIAL_STATE, SET_NEXT_LEVEL, SET_PLAYER_NEW_COLORS, SET_PLAYER_TURN, SET_SIMON_COLORS, START_GAME } from "../reducer/SimonReducer";
import { timeout } from "../utilities/utilities";

const SimonContext = createContext();

export default function SimonContextProvider({ children }) {
    // constant
    const colorsArr = ['green', 'red', 'yellow', 'blue'];

    // useState
    const [isPlay, setIsPlay] = useState(false);    // start-stop game
    const [blinkColor, setBlinkColor] = useState('');

    // useReducer
    const [game, dispatchGame] = useReducer(gameReducer, INITIAL_GAME);

    // state 1: initialize -----------------------------------------------------------------------------------
    useEffect(() => {
        if (isPlay) dispatchGame({ type: START_GAME, payload: { ...INITIAL_GAME, simonTurn: true } });
        else dispatchGame({ type: SET_INITIAL_STATE, payload: INITIAL_GAME });
    }, [isPlay]);
    // -------------------------------------------------------------------------------------------------------

    // state 2: Simon's turn ---------------------------------------------------------------------------------
    useEffect(() => {
        // set Simon's colors
        if (isPlay && game.simonTurn) {
            const newColor = colorsArr[Math.floor(4 * Math.random())];
            const tempColorsArr = [...game.simonColors, newColor];
            dispatchGame({ type: SET_SIMON_COLORS, payload: { ...game, simonColors: tempColorsArr } });
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
        await timeout(800); // wait between NewGameButton <--> start Simon's turn
        // consequently blink each colors
        for (let i = 0; i < game.simonColors.length; i++) {
            setBlinkColor(game.simonColors[i]);
            await timeout(350);
            setBlinkColor('');
            await timeout(500);
        }
        // update game: end Simon's turn | start Player's turn | Player's colors
        const tempArrColors = [...game.simonColors];
        const updateObjGame = {
            ...game,
            simonTurn: false,
            playerTurn: true,
            playerColors: tempArrColors
        };
        dispatchGame({ type: SET_PLAYER_TURN, payload: updateObjGame });
    }
    // -------------------------------------------------------------------------------------------------------

    // state 3: Player's turn --------------------------------------------------------------------------------
    const handleCardClick = async (color) => {
        // handle click just when isPlay = true and it's also Player turn
        if (isPlay && game.playerTurn) {
            const tempPlayerColorsArr = [...game.playerColors];
            const currentColor = tempPlayerColorsArr.shift();
            setBlinkColor(color);

            if (currentColor === color) {
                if (tempPlayerColorsArr.length) {
                    // Player need to play at least 1 more color
                    dispatchGame({ type: SET_PLAYER_NEW_COLORS, payload: { ...game, playerColors: tempPlayerColorsArr } });
                } else {
                    // setup for next level
                    const updateObjGame = {
                        ...game,
                        score: game.simonColors.length,
                        playerColors: [],
                        playerTurn: false,
                        simonTurn: true,
                    }
                    dispatchGame({ type: SET_NEXT_LEVEL, payload: updateObjGame });
                }
            } else {
                // selet wrong color, so it's the end of the game
                dispatchGame({ type: END_GAME, payload: INITIAL_GAME });
                setIsPlay(false);
                alert('GAME OVER')
            }
            await timeout(350);
            setBlinkColor('');
        }
    }
    // -------------------------------------------------------------------------------------------------------

    return (
        <SimonContext.Provider value={{ game, isPlay, setIsPlay, blinkColor, handleCardClick, colorsArr }}>
            {children}
        </SimonContext.Provider>
    );
}

export function useSimon() {
    return useContext(SimonContext);
}