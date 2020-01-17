import { AsyncStorage } from 'react-native';
import { decksData, FLASHCARDS_STORAGE_KEY } from './_DATA';

export function getDecksData() {
    return decksData;
}

export function getDecks() {
    //  AsyncStorage.clear();
      return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then(results => {
            if (results === null) {
                AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decksData));
                return decksData;
            }
            return JSON.parse(results);
        });
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }));
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            const decks = JSON.parse(results);
            decks[title].questions.push(card);
            AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
        })
}