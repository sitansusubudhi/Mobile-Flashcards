import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { purple, white } from '../utils/colors';
import DeckList from '../components/DeckList';
import NewDeck from "../components/NewDeck";

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
    activeTintColor: purple,
    style: {
      height: 50,
      backgroundColor: white,
    }
  }
};

const TabNavigator = createAppContainer(createBottomTabNavigator(Tabs, navigationOptions));


export default TabNavigator;