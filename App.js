import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Container, Content, Card, CardItem, Text, Tab } from 'native-base';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import MainNavigator from './navigation/MainNavigator';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <SafeAreaView style={styles.container}>
          {/* <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        /> */}
          <MainNavigator />
        </SafeAreaView>
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