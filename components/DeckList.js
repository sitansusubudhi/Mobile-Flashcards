import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions';
import { white } from '../utils/colors';


const Deck = ({title, questions, onPress }) => (
    <View style={styles.container}>
        <TouchableOpacity
            onPress={onPress}>
            <View style={styles.item}>
                <Text style={styles.itemText}>{title}</Text>
                <Text style={styles.itemText}>{questions} {questions === 1 ? 'card' : 'cards'}</Text>
            </View>
        </TouchableOpacity>
    </View>
);

class DeckList extends Component {

    // Use props.dispatch (received by connected component) to dispatch action for fetching initial data
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    navigateToDeck = (deck) => {
        
        // Specify which Screen to display based on the Deck selected. Pass in the Deck title as parameter for 'entryId'
        this.props.navigation.navigate(
            'DeckView',
            { entryId: deck }
        );
    };

    render() {

        const { decks } = this.props;

        // Sort Decks in the descending order of number of questions
        // Populate DATA to be used in FlatList
        const DATA = Object.keys(decks).map(deck => ({
            title: decks[deck].title,
            questions: decks[deck].questions.length
        })).sort((a, b) => b.questions - a.questions);

        return (
            <View style={styles.container}>
                
                {/**
                 * FlatList would be efficient for handling infinite lists. 
                 * Use item.title as the id for the react keys.
                 * Render Deck Component defined above. And pass in the required props.
                 */}
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Deck 
                                                title={item.title}
                                                questions={item.questions}
                                                onPress={() => this.navigateToDeck(item.title)}/>}
                    keyExtractor={item => item.title} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 5
    },
    item: {
        backgroundColor: white,
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
    itemText: {
        fontSize: 20
    },
    itemBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

// Returns decks as props to the DeckList Component.
function mapStateToProps(decks) {
    return {
        decks
    }
}

// Connects the DeckList component to the Redux store.
export default connect(mapStateToProps)(DeckList);

