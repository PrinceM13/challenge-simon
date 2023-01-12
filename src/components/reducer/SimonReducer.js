// constant
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const START_GAME = 'START_GAME'

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
        case SET_INITIAL_STATE: return action.payload;
        default: return state;
    }
}