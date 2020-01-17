import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import  { getDecksData, getDecks } from '../utils/api';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions';

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

  
function mapStateToProps(decks) {
    
    return {
        decks
    }
}


export default connect(mapStateToProps)(DeckList);

