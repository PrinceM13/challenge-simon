import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { END_GAME, gameReducer, INITIAL_GAME, SET_INITIAL_STATE, SET_PLAYER_NEW_COLORS, SET_PLAYER_TURN, SET_SIMON_COLORS, START_GAME } from "../reducer/SimonReducer";
import { timeout } from "../utilities/utilities";

const SimonContext = createContext();

export default function SimonContextProvider({ children }) {
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
        const IsSimonColorsValid = Boolean(game.simonColors.length);
        // set Simon's colors
        if (isPlay && game.simonTurn && !IsSimonColorsValid) {
            const mockUpColors = ['green', 'yellow', 'red', 'red', 'blue', 'green', 'yellow'];
            dispatchGame({ type: SET_SIMON_COLORS, payload: { ...game, simonColors: mockUpColors } });
        }
        // show Simon's colors to Player
        else if (isPlay && game.simonTurn && IsSimonColorsValid) {
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
                    dispatchGame({ type: SET_PLAYER_NEW_COLORS, payload: { ...game, playerColors: tempPlayerColorsArr } })
                } else {
                    // last color now, need to setup for next level (set to initial game for now, will update later)
                    dispatchGame({ type: END_GAME, payload: INITIAL_GAME });
                    alert('YOU WON!!!')
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
        <SimonContext.Provider value={{ isPlay, setIsPlay, blinkColor, handleCardClick }}>
            {children}
        </SimonContext.Provider>
    );
}

export function useSimon() {
    return useContext(SimonContext);
}