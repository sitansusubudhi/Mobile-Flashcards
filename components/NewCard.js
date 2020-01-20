import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { black, white, orange, gray } from '../utils/colors';
import { addCardToDeck } from '../utils/api';
import { connect } from 'react-redux';
import { addDeckCard } from '../actions';
import TextButton from './TextButton';

class NewCard extends Component {

    state = {
        question: '',
        answer: ''
    };

    handleSubmit = (deck) => {
        const { question, answer } = this.state;

        if (question.trim() && answer.trim()) {

            // Save Card data locally using api helper
            addCardToDeck(deck, { question, answer });

            // Dispatch addDeckCard action creator
            this.props.dispatch(addDeckCard({ deck, question, answer }));

            // Update component state
            this.setState(() => ({
                question: '',
                answer: ''
            }));
            
            // Go back to previous view
            this.props.navigation.dispatch(NavigationActions.back({ key: null }));
        } else {
            alert(`Can't create card with blank Question or Answer`);
            return;
        }
    }

    render() {
        const deckTitle = this.props.navigation.state.params.entryId;

        return (
            <View behavior='padding' style={styles.container}>
                <View style={styles.container}>
                    {/**
                     * Question Input
                     */}
                    <Text style={styles.title}>What is the question?</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.question}
                        onChangeText={(question) => this.setState(() => ({
                            question
                        }))}>
                    </TextInput>
                    
                    {/**
                     * Answer Input
                     */}
                    <Text style={styles.title}>Type in the answer </Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.answer}
                        onChangeText={(answer) => this.setState(() => ({
                            answer
                        }))}>
                    </TextInput>
                </View>

                <View style={styles.container}>
                    <TextButton
                        styles={styles}
                        text={'Submit'}
                        color={black}
                        onPress={() => this.handleSubmit(deckTitle)} />
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
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    title: {
        fontSize: 25,
        color: gray
    },
    AndroidSubmitBtn: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
        backgroundColor: orange,
        borderRadius: 7,
        overflow: 'hidden'
    },
    input: {
        borderWidth: 1,
        borderColor: gray,
        width: 270,
        height: 40,
        padding: 10,
        margin: 20,
        borderRadius: 8
    },
});

// Connects the NewCard component to the Redux store.
export default connect()(NewCard);