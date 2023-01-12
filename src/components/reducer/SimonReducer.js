// constant
export const START_GAME = 'START_GAME';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const SET_SIMON_COLORS = 'SET_SIMON_COLORS';
export const SET_PLAYER_TURN = 'SET_PLAYER_TURN';

// initial
export const INITIAL_GAME = {
    score: 0,
    simonColors: [],    // quest from Simon.
    simonTurn: false,   // state: Simon shows all colors to Player.
    playerColors: [],   // Player's answers.
    playerTurn: false   // state: Play gives an answer to Simon.
};

// gameReducer
export const gameReducer = (state, action) => {
    switch (action.type) {
        case START_GAME: return action.payload;
        case SET_INITIAL_STATE: return action.payload;
        case SET_SIMON_COLORS: return action.payload;
        case SET_PLAYER_TURN: return action.payload;
        default: return state;
    }
}