import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { gray } from '../utils/colors';

class QuizQuestion extends Component {
    state = {
        showAnswer: false
    };

    handleToggleSwitch = () => {
        this.setState((state) => ({
            showAnswer: !state.showAnswer,
        }));
    };
    render() {
        const { showAnswer } = this.state;
        const { question, answer } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.question}>
                    {question}
                </Text>
                <Text style={{marginTop:30}}>{this.state.showAnswer ? 'Hide Answer': 'Show Answer'}</Text>
                <Switch 
                    style={{marginBottom:25}}
                    value={showAnswer}
                    onValueChange={this.handleToggleSwitch}
                />
                {showAnswer === true && (
                    <Text style={styles.answer}>
                        {answer}
                    </Text>
                )}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    answer: {
        width: 270,
        padding: 10,
        borderWidth: 1,
        borderColor: gray,
        fontSize: 20
    },
    question: {
        fontSize: 40,
        marginTop: 60,
        textAlign: 'center'
    }
});

export default QuizQuestion;