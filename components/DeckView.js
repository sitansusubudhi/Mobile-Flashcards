import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { getDecksData } from '../utils/api';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { purple, white, red } from '../utils/colors';

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

                <TextButton 
                    styles={styles}
                    text={'Add Card'}
                    color={purple}
                    onPress={() =>
                        this.props.navigation.navigate('NewDeck', { entryId: title })
                    }/>
                <TextButton 
                    styles={styles}
                    text={'Start Quiz'}
                    color={red}
                    onPress={() =>
                        this.props.navigation.navigate('QuizView', { entryId: title })
                    }/>
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
});

function mapStateToProps(decks, { navigation } ) {
    const { entryId } = navigation.state.params;

    return {
        decks,
        title: entryId
    }
}


export default connect(mapStateToProps)(DeckView);