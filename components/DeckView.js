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

                <View style={styles.item}>
                    <Text style={styles.title}>{decks[title].title}</Text>
                    <Text style={styles.questions}>{decks[title].questions.length}</Text>

                    <TextButton 
                        styles={styles}
                        text={'New Card'}
                        color={purple}
                        onPress={() =>
                            this.props.navigation.navigate('NewCard', { entryId: title })
                        }/>
                    <TextButton 
                        styles={styles}
                        text={'Start Quiz'}
                        color={red}
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
    const { entryId } = navigation.state.params;

    return {
        decks,
        title: entryId
    }
}


export default connect(mapStateToProps)(DeckView);