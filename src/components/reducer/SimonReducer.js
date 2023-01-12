// constant
export const SET_COLOR_CARD_STATE = 'SET_COLOR_CARD_STATE';

// initial
export const INITIAL_COLOR_CARD = { colorGreen: false, colorRed: false, colorYellow: false, colorBlue: false };

// colorReducer
export const colorActiveReducer = (state, action) => {
    switch (action.type) {
        case SET_COLOR_CARD_STATE: return action.payload;
        default: return state;
    }
}