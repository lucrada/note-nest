/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotesAction, removeNoteAction } from '../actions/notesActions';
import { getUpdateAuthStatusRequest, getUserLogoutRequest } from '../actions/authActions';
import { getRandomColor } from '../utils/helper_functions';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const _get45Percent = (str) => {
    const numberOfLetters = Math.ceil(str.length * 45 / 100);
    return str.slice(0, numberOfLetters);
};

const Note = ({ id, title, color, body, navigation }) => {
    const dispatch = useDispatch();

    const _handleLongPress = () => {

        Alert.alert('Confirm', 'Do you want to delete this note ?', [
            { text: 'Yes', onPress: () => { dispatch(removeNoteAction(id)); } },
            { text: 'No', onPress: () => { return; } },
        ], { cancelable: false });
    };

    const formattedBody = body.length <= 124 ? body : _get45Percent(body) + '...';

    return (
        <TouchableOpacity onLongPress={() => _handleLongPress()} onPress={() => navigation.navigate('edit_notes_screen', { data: { id, title, color, body } })}>
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

    const auth = useSelector(state => state.auth);

    const notesStore = useSelector(state => state.notes);
    const notes = notesStore.notes;
    const [notesLeftCol, notesRightCol] = _separateNotesColumns(notes);

    React.useEffect(() => {
        StatusBar.setBackgroundColor('#222433');
        StatusBar.setBarStyle('light-content');
        dispatch(getUpdateAuthStatusRequest());
        if (auth.userId === '') {
            navigation.navigate('auth_screen');
        }
        dispatch(fetchNotesAction());
    }, [dispatch, navigation, auth.userId]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Notes</Text>
                <TouchableOpacity onPress={() => dispatch(getUserLogoutRequest())}><Text style={styles.logoutButtonText}>Logout</Text></TouchableOpacity>
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
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('edit_notes_screen', { data: { id: '', title: '', color: getRandomColor(), body: '' } })}><View style={styles.addButtonContainer}><Text style={styles.addButtonText}>+</Text></View></TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#222433',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#eee',
    },
    logoutButtonText: {
        color: '#E4C31B',
        fontWeight: 'bold',
        fontSize: 18,
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
        color: '#222433',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },
});

export default NotesScreen;
