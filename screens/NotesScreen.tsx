/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotesAction } from '../actions/notesActions';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const _get45Percent = (str) => {
    const numberOfLetters = Math.ceil(str.length * 45 / 100);
    return str.slice(0, numberOfLetters);
};

const Note = ({ id, title, color, body, navigation }) => {
    const formattedBody = body.length <= 124 ? body : _get45Percent(body) + '...';

    return (
        <TouchableOpacity onPress={() => navigation.navigate('edit_notes_screen', { data: { id, title, color, body } })}>
            <View style={{ ...styles.card, backgroundColor: color }}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardBody}>{formattedBody}</Text>
            </View>
        </TouchableOpacity>
    );
};

const _separateNotesColumns = (notes) => {
    const notesLeftCol = notes.map((note, index) => ({ index, note })).filter(item => item.index % 2 === 0).map((noteObject) => ({ ...noteObject.note }));
    const notesRightCol = notes.map((note, index) => ({ index, note })).filter(item => item.index % 2 !== 0).map((noteObject) => ({ ...noteObject.note }));
    return [notesLeftCol, notesRightCol];
};

const NotesScreen = ({ navigation }): React.JSX.Element => {
    const dispatch = useDispatch();

    const notesStore = useSelector(state => state.notes);
    const notes = notesStore.notes;
    const [notesLeftCol, notesRightCol] = _separateNotesColumns(notes);

    React.useEffect(() => {
        StatusBar.setBackgroundColor('#222433');
        StatusBar.setBarStyle('light-content');
        dispatch(fetchNotesAction('1'));
    }, [dispatch]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Notes</Text>
            </View>
            {notes.length === 0 ? <View style={styles.messageContainer}><Text style={styles.messageText}>You have not added any notes !</Text></View> :
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewStyle}>
                    <View style={styles.col}>
                        {notesLeftCol.map(item => <Note key={item.id} {...item} navigation={navigation} />)}
                    </View>
                    <View style={styles.col}>
                        {notesRightCol.map(item => <Note key={item.id} {...item} navigation={navigation} />)}
                    </View>
                </ScrollView>
            }
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('edit_notes_screen', { data: { title: '', color: '#67A900', body: '' } })}><View style={styles.addButtonContainer}><Text style={styles.addButtonText}>+</Text></View></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#222433',
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#eee',
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageText: {
        fontSize: 20,
        color: '#fff',
    },
    scrollViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10,
    },
    col: {
        flexDirection: 'column',
        flex: 1,
    },
    card: {
        margin: 5,
        borderRadius: 10,
        padding: 15,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#eee',
        marginBottom: 16,
        borderBottomWidth: 0.4,
        borderStyle: 'dashed',
        borderBottomColor: '#eee',
    },
    cardBody: {
        color: '#eee',
        lineHeight: 18,
        fontSize: 12,
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        zIndex: 3,
        bottom: HEIGHT * 0.05,
        right: WIDTH * 0.05,
    },
    addButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        backgroundColor: '#E4C31B',
        borderRadius: 50,
        elevation: 8,
    },
    addButtonText: {
        color: '#eee',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },
});

export default NotesScreen;
