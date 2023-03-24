// constant
export const INITIAL_STATE = 'INITIAL_STATE';
export const START_GAME = 'START_GAME';
export const UPDATE = 'UPDATE';
export const NEXT_LEVEL = 'NEXT_LEVEL'
export const END_GAME = 'END_GAME';

export const GAME_OVER_MESSAGE = 'GAME OVER !!!';

// initial
export const INITIAL_GAME = {
    simonColors: [],    // quest from Simon.
    simonTurn: false,   // state: Simon shows all colors to Player.
    playerColors: [],   // Player's answers.
    playerTurn: false,  // state: Play gives an answer to Simon.
    score: 0,
    message: 'SIMON GAME'
};

// gameReducer
export const gameReducer = (state, action) => {
    switch (action.type) {
        case INITIAL_STATE: return INITIAL_GAME;
        case START_GAME: return { ...INITIAL_GAME, simonTurn: true };
        case UPDATE: return { ...state, ...action.payload };
        case NEXT_LEVEL: return { ...state, ...action.payload, score: state.simonColors.length };
        case END_GAME: return { ...state, ...action.payload, message: GAME_OVER_MESSAGE };
        default: return state;
    }
}