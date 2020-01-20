import React, { Component } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Switch, StyleSheet } from 'react-native';
import { getDecksData } from '../utils/api';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { black, purple, white, red, green, orange, gray } from '../utils/colors';
import { NavigationActions } from 'react-navigation';

const CORRECT = 'Correct';
const INCORRECT = 'Incorrect';

const ResultView = ({ correct, incorrect, restartQuiz, goBack }) => (
    <View style={styles.container}>
            <Text style={styles.answer}>No of FlashCards - {correct + incorrect}</Text>
            <Text style={styles.answer}>Correctly answered - {correct}</Text>
            <TextButton
                styles={styles}
                text={'Restart Quiz'}
                color={black}
                onPress={restartQuiz}/>
            <TextButton
                styles={styles}
                text={'Back to Deck'}
                color={black}
                onPress={goBack}/>
    </View>
);

class QuizView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { entryId } = navigation.state.params;

        return {
            title: entryId
        };
    };

    state = {
        showAnswer: false,
        questionId: 0,
        correct: 0,
        incorrect: 0,
    };

    handleToggleSwitch = () => {
        this.setState((state) => ({
            showAnswer: !state.showAnswer,
        }));
    };

    handleSubmitAnswer = (answer) => {

        if (answer === CORRECT) {
            this.setState((prevState) => ({
                correct: prevState.correct + 1
            }));
        } else {
            this.setState((prevState) => ({
                incorrect: prevState.incorrect + 1
            }));
        }

        this.setState((prevState) => ({
            questionId: prevState.questionId + 1,
            showAnswer: false
        }));
    };

    restartQuiz = () => {
        this.setState(() => ({
            showAnswer: false,
            questionId: 0,
            correct: 0,
            incorrect: 0
        }));
    };

    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back({ key: null }));
    };

    render() {
        const { decks } = this.props;
        const deckTitle = this.props.navigation.state.params.entryId;
        const { questionId, showAnswer, correct, incorrect } = this.state;

        if (decks[deckTitle].questions.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>There are no Cards in this Deck.</Text>
                    <Text style={{fontSize: 20}}>Click on Add Card to create a new card.</Text>
                </View>
            );
        }

        if (questionId === decks[deckTitle].questions.length) {
            return <ResultView 
                        deckTitle={deckTitle} 
                        correct={correct} 
                        incorrect={incorrect} 
                        restartQuiz={this.restartQuiz}
                        goBack={this.goBack}/>;
        }

        const { question, answer } = decks[deckTitle].questions[questionId];
        return (
            <View style={styles.container}>

                <Text style={styles.questionId}>
                    {`Question ${questionId + 1} of ${decks[deckTitle].questions.length}`}
                </Text>

                <View style={styles.item}>

                    <View style={styles.container}>
                        <Text style={styles.question}>
                            {question}
                        </Text>
                        <Text style={{ marginTop: 30 }}>{this.state.showAnswer ? 'Hide Answer' : 'Show Answer'}</Text>
                        <Switch
                            style={{ marginBottom: 25 }}
                            value={showAnswer}
                            onValueChange={this.handleToggleSwitch}
                        />
                        {showAnswer === true && (
                            <Text style={styles.answer}>
                                {answer}
                            </Text>
                        )}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TextButton
                            styles={styles}
                            text={CORRECT}
                            color={green}
                            onPress={() => this.handleSubmitAnswer(CORRECT)} />
                        <TextButton
                            styles={styles}
                            text={INCORRECT}
                            color={red}
                            onPress={() => this.handleSubmitAnswer(INCORRECT)} />
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
    },
    answer: {
        width: 270,
        padding: 10,
        borderWidth: 1,
        borderColor: gray,
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    question: {
        fontSize: 40,
        marginTop: 60,
        textAlign: 'center'
    }
});

function mapStateToProps(decks) {

    return {
        decks
    }
}
export default connect(mapStateToProps)(QuizView);