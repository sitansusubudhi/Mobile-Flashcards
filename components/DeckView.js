import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { 
    purple,
    white,
    green,
    orange
} from '../utils/colors';

class DeckView extends Component {

    //Specify header of the DeckView based on the Deck title 
    static navigationOptions = ({ navigation }) => {

        // Retrieve the entryId from the current route
        const { entryId } = navigation.state.params;

        return {
            title: entryId
        };
    };

    render() {
        const { decks, title } = this.props;

        return (
            <View style={styles.container}>

                <View style={styles.item}>
                    <Text style={styles.title}>{decks[title].title}</Text>
                    <Text 
                        style={styles.questions}>
                            {decks[title].questions.length} {decks[title].questions.length === 1 ? 'card': 'cards'}
                    </Text>
                    {/**
                     * Allow user to Add a New Card to current Deck. Navigate to NewCard on click on the button.
                     */}
                    <TextButton 
                        styles={styles}
                        text={'Add Card'}
                        color={orange}
                        onPress={() =>
                            this.props.navigation.navigate('NewCard', { entryId: title })
                        }/>
                    {/**
                     * Allow user to Start a Quiz for current Deck. Navigate to QuizView on click on the button.
                     */}
                    <TextButton 
                        styles={styles}
                        text={'Start a Quiz'}
                        color={green}
                        onPress={() =>
                            this.props.navigation.navigate('QuizView', { entryId: title })
                        }/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        height: 45,
        borderRadius: 2,
        width: 170,
        margin: 10
      },
      submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: "center"
      },
      item: {
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
    title: {
        fontSize: 40,
    },
    questions: {
        fontSize: 30,
        marginBottom: 150
    }
});

function mapStateToProps(decks, { navigation } ) {

    // Retrieve the entryId from the current route
    const { entryId } = navigation.state.params;

    // The Decks and the current Deck Title get passed as props to DeckView
    return {
        decks,
        title: entryId
    }
}

// Connects the DeckView component to the Redux store.
export default connect(mapStateToProps)(DeckView);