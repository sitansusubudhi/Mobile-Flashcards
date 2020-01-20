import React, { Component } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { getDecksData } from '../utils/api';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { purple, white, red, green, orange, gray } from '../utils/colors';
import { NavigationActions } from 'react-navigation';
import QuizQuestion from './QuizQuestion';

class QuizView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { entryId } = navigation.state.params;

        return {
            title: entryId
        };
    };

    state = {
        questionId: 0
    };

    render() {
        const { decks } = this.props;
        const deckTitle = this.props.navigation.state.params.entryId;
        const { questionId }  = this.state;
        const { question, answer } = decks[deckTitle].questions[questionId];
        return (
            <View style={styles.container}>

                <Text style={styles.questionId}>
                        {`Question ${questionId+1} of ${decks[deckTitle].questions.length}`}
                </Text>

                <View style={styles.item}>
                    
                    <QuizQuestion question={question} answer={answer} />

                    <View style={styles.buttonContainer}>
                        <TextButton 
                                styles={styles}
                                text={'Correct'}
                                color={green}
                                onPress={() => this.handleSubmit(deckTitle)}/>
                        <TextButton 
                                styles={styles}
                                text={'Incorrect'}
                                color={red}
                                onPress={() => this.handleSubmit(deckTitle)}/>
                    </View>
                </View>
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
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    title: {
        fontSize: 30,
        color: gray
    },
    AndroidSubmitBtn: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
        backgroundColor: orange,
        borderRadius: 7,
        overflow: 'hidden',
        margin: 10,
        height: 55
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionId: {
        alignSelf: 'flex-start',
        left: 15,
        top: 15,
        fontSize: 20,
        margin: 5,
        position: 'absolute'
    }
});

function mapStateToProps(decks) {

    return {
        decks
    }
}
export default connect(mapStateToProps)(QuizView);