import { RECEIVE_DECKS, ADD_DECK, ADD_DECK_CARD } from '../actions'

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            }
        case ADD_DECK:

            return {
                ...state,
                [action.deck]: {
                    title: action.deck,
                    questions: []
                }
            };
        case ADD_DECK_CARD:
            const { card } = action;
            const { deck } = card;
            return {
                ...state,
                [deck]: {
                    ...state[deck], 
                    questions: [...state[deck].questions].concat(card)
                }
            }
        default:
            return state
    }
}

export default decks 