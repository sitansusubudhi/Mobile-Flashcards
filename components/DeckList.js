import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { getDecksData, getDecks } from '../utils/api';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions';
import { orange, white } from '../utils/colors';

class DeckList extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {

        const { decks } = this.props;

        return (
            <View style={styles.container}>
                {Object.keys(decks).map((deck) => {
                    const { title, questions } = decks[deck];
                    return (
                        <View key={deck} style={styles.item}>
                            <Text style={styles.itemText}>{title}</Text>
                            <Text style={styles.itemText}>{questions.length}</Text>

                            <Button
                                style={styles.itemBtn}
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
        alignSelf: 'stretch',
        padding: 5
    },
    item: {
        backgroundColor: white,
        borderRadius: 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    itemText: {
        fontSize: 20
    },
    itemBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


function mapStateToProps(decks) {

    return {
        decks
    }
}


export default connect(mapStateToProps)(DeckList);

