import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { getDecksData } from '../utils/api';

class DeckView extends Component {
    render() {
        const deck = this.props.navigation.state.params.entryId;
        const decks = getDecksData();

        return (
            <View style={styles.container}>
                <Text>{decks[deck].title}</Text>
                <Text>{decks[deck].questions.length}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default DeckView;