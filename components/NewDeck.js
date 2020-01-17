import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';
import { connect } from 'react-redux';
import { black } from '../utils/colors';

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
            <View style={styles.container}>
                <Text style={styles.title}>Deck name</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.title}
                    onChangeText={this.handleChange}>

                </TextInput>
                <Button
                    style={styles.submitBtn}
                    onPress={this.handleSubmit}
                    title="submit">

                </Button>
            </View>
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
        borderColor: '#757575',
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
    submitBtn: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
        borderRadius: 7,
        overflow: 'hidden'
    }
});

export default connect()(NewDeck);
