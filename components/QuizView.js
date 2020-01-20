import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { 
    black,
    white,
    red,
    green,
    orange,
    gray
} from '../utils/colors';
import { NavigationActions } from 'react-navigation';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

const CORRECT = 'Correct';
const INCORRECT = 'Incorrect';

const ResultView = ({ correct, incorrect, restartQuiz, goBack }) => (
    <View style={styles.container}>
        <Text 
            style={styles.answer}>
            No of FlashCards - {correct + incorrect}
        </Text>
        <Text
            style={styles.answer}>
            Correctly answered - {correct}
        </Text>
        
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

    componentDidMount(){
        clearLocalNotification()
        .then(setLocalNotification);
    }
    
    state = {
        showAnswer: false,
        questionId: 0,
        correct: 0,
        incorrect: 0,
    };

    
    handleToggleSwitch = () => {
        // Toggle Switch value
        this.setState((state) => ({
            showAnswer: !state.showAnswer,
        }));
    };

    handleSubmitAnswer = (answer) => {
        // Keep track of questions for which Option correct has been clicked
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
        // Start quiz from questionId 0
        this.setState(() => ({
            showAnswer: false,
            questionId: 0,
            correct: 0,
            incorrect: 0
        }));
    };

    goBack = () => {
        // Go back to previous view
        this.props.navigation.dispatch(NavigationActions.back({ key: null }));
    };

    render() {
        const { decks } = this.props;
        const deckTitle = this.props.navigation.state.params.entryId;
        const { questionId, showAnswer, correct, incorrect } = this.state;

        // If there does not exist any question for the deck, display instruction to add card.
        if (decks[deckTitle].questions.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>There are no Cards in this Deck.</Text>
                    <Text style={{fontSize: 20}}>Click on Add Card to create a new card.</Text>
                </View>
            );
        }

        // If questionId reaches the end of the questions array, display ResultView component and pass in required props.
        if (questionId === decks[deckTitle].questions.length) {
            return (<ResultView 
                        deckTitle={deckTitle} 
                        correct={correct} 
                        incorrect={incorrect} 
                        restartQuiz={this.restartQuiz}
                        goBack={this.goBack}/>);
        }

        const { question, answer } = decks[deckTitle].questions[questionId];
        return (
            <View style={styles.container}>

                {/**
                 * Display Question Number and Total number of Questions
                 */}
                <Text style={styles.questionId}>
                    {`Question ${questionId + 1} of ${decks[deckTitle].questions.length}`}
                </Text>

                <View style={styles.item}>
                    
                    {/**
                     * Display Question text
                     */}
                    <View style={styles.container}>
                        <Text style={styles.question}>
                            {question}
                        </Text>

                        {/**
                         * Show Label for the Switch Button
                         */}
                        <Text style={{ marginTop: 30 }}>
                            {this.state.showAnswer ? 'Hide Answer' : 'Show Answer'}
                        </Text>

                        {/**
                         * Switch Button to show Answer on toggle
                         */}
                        <Switch
                            style={{ marginBottom: 25 }}
                            value={showAnswer}
                            onValueChange={this.handleToggleSwitch}
                        />
                        {/**
                         * Display Answer only when showAnswer is true
                         */}
                        {showAnswer === true && (
                            <Text style={styles.answer}>
                                {answer}
                            </Text>
                        )}
                    </View>

                    <View style={styles.buttonContainer}>
                        {/**
                         * Correct Button
                         */}
                        <TextButton
                            styles={styles}
                            text={CORRECT}
                            color={green}
                            onPress={() => this.handleSubmitAnswer(CORRECT)} />
                        {/**
                         * Incorrect Button
                         */}
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

// Returns decks as props to the QuizView Component.
function mapStateToProps(decks) {
    return {
        decks
    };
}

// Connects the QuizView component to the Redux store.
export default connect(mapStateToProps)(QuizView);