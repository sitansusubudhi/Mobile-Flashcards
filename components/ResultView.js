import React from 'react';
import { Text, View } from 'react-native';
import TextButton from './TextButton';
import { black } from '../utils/colors';

export default function ResultView ({ correct, incorrect, restartQuiz, goBack, styles }) {
    return (
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
                onPress={restartQuiz} />
            <TextButton
                styles={styles}
                text={'Back to Deck'}
                color={black}
                onPress={goBack} />
        </View>
    );
}
