import React, { Component } from 'react';
import { SafeAreaView, View, StatusBar, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MainNavigator from './navigation/MainNavigator';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import { setLocalNotification, clearLocalNotification } from './utils/helpers';

function DeckStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: StatusBar.currentHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {
 
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={styles.container}>
          {/* <DeckStatusBar backgroundColor={black} barStyle="light-content" /> */}
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