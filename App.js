import React, { Component } from 'react';
import { SafeAreaView, View, StatusBar, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import MainNavigator from './navigation/MainNavigator';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import { black, gray, whitepurple, white, blue } from './utils/colors';
import QuizView from './components/QuizView';
import ShowAnswer from './components/QuizQuestion';

function DeckStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: StatusBar.currentHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={styles.container}>
          {/* <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        /> */}
          <DeckStatusBar backgroundColor={black} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});