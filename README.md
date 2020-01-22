# Mobile Flashcards Project

The "Mobile Flashcards" is a React Native app for Android that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

For this application, most of the application’s state is managed by Redux. 


## View project locally

To view the project in your local machine:

* clone this repository using `git clone `
* `cd` into the project folder
* install all project dependencies with `yarn install`
* start the development server with `yarn start`

This would open the Expo Developer Tools in the browser. To test the app in device, scan the QR Code using the Expo Client app ([Expo Client for Android & iOS](https://expo.io/tools#client)).

Click on the Reload button if you face an error "Could not load exp://* Network response timed out..."
Change the connection mode to 'Tunnel' and try opening the project in Expo again, if there still exists an error while running on 'LAN'.

## Testing

This project has been tested on - 

* Google Pixel 2 XL - Android 9.0 - API 28 (Android Simulator)
* Nokia 7 Plus (Android 10) (Mobile).

## Component Hierarchy

```
|- App # The Redux store is created here and passed on to the react-redux Provider component.
|-- MainNavigator # All navigation options for different screens present in the app are configured here. Consists of TabNavigator and StackNavigator.
|-- NewDeck # This component is used to add a New Deck to the DeckList.
|-- DeckList #  This component is used to display all the Decks present. Initial data gets handled here.
|--- DeckView # This component gets rendered when the user clicks on any item from the DeckList view. User will be given option to Add Card or Start a Quiz.
|---- NewCard # This component is used to create a new card for the selected deck.
|---- QuizView # This component is used to render the questions for a given deck. At a time, one question is displayed on the screen.
```

## Store data locally

To manage AsyncStorage database, below helper methods are created.

* `getDecks()`
* `saveDeckTitle(title)`
* `addCardToDeck(title, card)`

1) `getDecks()` Method

*Description*: Return all of the decks along with their titles, questions, and answers

2) `saveDeckTitle(title)` Method

*Description*: Takes in a single title argument and add it to the decks. 

3) `addCardToDeck(title, card)` Method

*Description*: Take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 