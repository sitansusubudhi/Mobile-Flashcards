import React, { Component } from 'react';
import { 
    Button,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { white, orange, gray } from '../utils/colors';
import { addCardToDeck } from '../utils/api';
import { connect } from 'react-redux';
import { addDeckCard } from '../actions';

class NewCard extends Component {

    state = {
        question: '',
        answer: ''
    };

    handleSubmit = (deck) => {
        const { question, answer } = this.state;

        addCardToDeck(deck, { question, answer });
        this.props.dispatch(addDeckCard({ deck, question, answer }));
        this.setState(() => ({
            question: '',
            answer: ''
        }));

        // Go back to previous view
        this.props.navigation.dispatch(NavigationActions.back({ key: null }));
    }

    render() {
        const deckTitle = this.props.navigation.state.params.entryId;
        
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>What is the question?</Text>
                    <TextInput 
                        style={styles.input}
                        value={this.state.question}
                        onChangeText={(question) => this.setState(() => ({
                            question
                        }))}>
                    </TextInput>

                    <Text style={styles.title}>Type in the answer </Text>
                    <TextInput 
                        style={styles.input}
                        value={this.state.answer}
                        onChangeText={(answer) => this.setState(() => ({
                            answer
                        }))}>
                    </TextInput>

                    <TouchableOpacity 
                        style={styles.submitBtn}
                        onPress={() => this.handleSubmit(deckTitle)}>

                        <Text style={styles.submitBtnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        fontSize: 30,
        color: gray
    },
    submitBtn: {
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
        height: 50,
        padding: 10,
        margin: 50,
        borderRadius: 8
    },
});

export default connect()(NewCard);