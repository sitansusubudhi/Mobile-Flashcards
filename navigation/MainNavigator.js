import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { purple, white, black } from '../utils/colors';
import DeckList from '../components/DeckList';
import NewDeck from '../components/NewDeck';
import DeckView from '../components/DeckView';
import NewCard from '../components/NewCard';
import QuizView from '../components/QuizView';

const Tabs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
};

const navigationOptions = {
  tabBarOptions: {
    activeTintColor: white,
    style: {
      height: 50,
      backgroundColor: black,
    }
  }
};

const TabNavigator = createAppContainer(createBottomTabNavigator(Tabs, navigationOptions));
const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => ({
      // title: 'Deck Details',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    }),
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: ({ navigation }) => ({
      title: 'New Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    }),
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: ({ navigation }) => ({
      // title: 'Quiz ',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    }),
  }
}));

export default MainNavigator;