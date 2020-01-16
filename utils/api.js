import { AsyncStorage } from 'react-native'
import { decksData, FLASHCARDS_STORAGE_KEY } from './_DATA';

export function getDecksData() {
    return decksData;
}

export function getDecks() {
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
            title,
            questions: []
        }
    }));
}