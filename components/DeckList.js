import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import  { getDecksData } from '../utils/api';
import { AsyncStorage } from 'react-native';

class DeckList extends Component {
    render() {

        const decks = getDecksData();

        return (
            <View style={styles.container}>
                {Object.keys(decks).map((deck) => {
                    const { title, questions } = decks[deck];
                    return (
                        <View key={deck}>
                            <Text>{title}</Text>
                            <Text>{questions.length}</Text>

                            <Button
                                title="Show Deck"
                                onPress={() => this.props.navigation.navigate(
                                    'DeckView',
                                    { entryId: deck }
                                )}>
                            </Button>
                        </View>
                    )
                })}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default DeckList;

