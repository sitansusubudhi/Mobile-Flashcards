import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { getDecksData } from '../utils/api';
import { connect } from 'react-redux';

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { entryId } = navigation.state.params;
        return {
            title: entryId
        };
    };

    render() {
        const { decks, title } = this.props;

        return (
            <View style={styles.container}>
                <Text>{decks[title].title}</Text>
                <Text>{decks[title].questions.length}</Text>
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

function mapStateToProps(decks, { navigation } ) {
    const { entryId } = navigation.state.params;

    return {
        decks,
        title: entryId
    }
}


export default connect(mapStateToProps)(DeckView);