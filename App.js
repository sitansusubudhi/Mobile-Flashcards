import React, { Component }  from 'react';
import { SafeAreaView, View, FlatList, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {Container, Content, Card, CardItem, Text} from 'native-base';
import DeckList from './components/DeckList';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function Item({ title }) {
  return (
      <Content>
        <Card>
          <CardItem header>
            <Text>{title}</Text>
          </CardItem>

          <CardItem>
            <Text>
            //Your text here
            </Text>
          </CardItem>

          <CardItem footer button onPress={() => alert("This is Card Footer")}>
            <Text>Card Footer</Text>
          </CardItem>
        </Card>
      </Content>
  );
}

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        /> */}
        <DeckList />
      </SafeAreaView>
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