import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';

class NewDeck extends Component {

    state = {
        title: ''
    };

    handleChange = title => {
        this.setState(() => { 
            title 
        });
    };

    handleSubmit = () => {
        const { title } = this.state;
        saveDeckTitle(title)
        this.props.dispatch(addDeck(title));
        this.props.navigation.navigate('DeckView', {
            
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Deck Name</Text>
                <TextInput 
                    value={this.state.title}
                    onChangeText={this.handleChange}>

                </TextInput>
                <Button
                    onPress={this.handleSubmit}>

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
    }
  });

export default NewDeck;

