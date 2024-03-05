/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addNoteAction } from '../actions/notesActions';
import { getUpdateAuthStatusRequest } from '../actions/authActions';

const EditNoteScreen = ({ navigation, route }): React.JSX.Element => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const note = route.params?.data || { id: '', title: '', body: '' };
    const [title, setTitle] = React.useState(note.title);
    const [body, setBody] = React.useState(note.body);

    React.useEffect(() => {
        StatusBar.setBackgroundColor(note.color);
        StatusBar.setBarStyle('light-content');
        dispatch(getUpdateAuthStatusRequest());
        if (auth.userId === '') {
            navigation.navigate('auth_screen');
        }
        return () => {
            StatusBar.setBackgroundColor('#222433');
            StatusBar.setBarStyle('light-content');
        };
    }, [auth.userId, dispatch, navigation, note.color]);

    const submitNote = () => {
        if (title.trim().length === 0) {
            Alert.alert('Warning', 'Title cannot be empty!');
            return;
        }
        dispatch(addNoteAction({ id: note.id, body }));
    };

    const handleGoBack = () => {
        submitNote();
        navigation.goBack();
    };

    return (
        <View style={{ ...styles.mainContainer, backgroundColor: note.color }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}><Text style={styles.backButtonText}>&larr;</Text></TouchableOpacity>
                <TextInput placeholder="Title" placeholderTextColor={'#fff'} onChangeText={(text) => setTitle(text)} value={title} style={styles.titleTextInput} />
            </View>
            <ScrollView showsVerticalScrollIndicator={true}>
                <TextInput
                    multiline={true}
                    value={body}
                    onChangeText={(text) => setBody(text)}
                    style={styles.bodyTextInput}
                    placeholder="Type your note here"
                    placeholderTextColor={'#fff'}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#fff',
        borderBottomWidth: 1,
        borderStyle: 'dashed',
    },
    backButton: {
        marginBottom: 10,
        marginRight: 15,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 32,
    },
    titleTextInput: {
        width: '100%',
        fontSize: 38,
        color: '#fff',
    },
    bodyTextInput: {
        marginTop: 20,
        fontSize: 22,
        textAlignVertical: 'top',
        color: '#eee',
    },
});

export default EditNoteScreen;
