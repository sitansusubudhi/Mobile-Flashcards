import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';
import { connect } from 'react-redux';
import { black, gray, white } from '../utils/colors';
import TextButton from './TextButton';

class NewDeck extends Component {

    state = {
        title: ''
    };

    handleChange = title => {
        this.setState(() => ({
            title
        }));
    };

    handleSubmit = () => {
        const { title } = this.state;
        saveDeckTitle(title);
        this.props.dispatch(addDeck(title));
        this.setState(() => ({
            title: ''
        }));
        this.props.navigation.navigate('DeckView', { entryId: title });

    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.title}>Deck name</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.title}
                    onChangeText={this.handleChange}>

                </TextInput>
                <TextButton 
                        styles={styles}
                        text={'Submit'}
                        color={black}
                        onPress={this.handleSubmit}/>
            </KeyboardAvoidingView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: gray,
        width: 200,
        height: 50,
        padding: 10,
        margin: 50,
        borderRadius: 8
    },
    title: {
        fontSize: 30,
        color: '#333'
    },
    AndroidSubmitBtn: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
        borderRadius: 7,
        overflow: 'hidden'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
});

export default connect()(NewDeck);

