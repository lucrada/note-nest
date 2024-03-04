/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { editNoteBodyAction, editNoteTitleAction } from '../actions/notesActions';

const EditNoteScreen = ({ route }): React.JSX.Element => {
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const note = route.params?.data || { id: '', title: '', body: '' };
    const [title, setTitle] = React.useState(note.title);
    const [body, setBody] = React.useState(note.body);

    React.useEffect(() => {
        StatusBar.setBackgroundColor(note.color);
        StatusBar.setBarStyle('light-content');
        return () => {
            StatusBar.setBackgroundColor('#222433');
            StatusBar.setBarStyle('light-content');
        };
    });

    const handleBodyChange = (body) => {
        setBody(body);
        dispatch(editNoteBodyAction(note.id, body));
    };

    const handleTitleChange = (title) => {
        setTitle(title);
        dispatch(editNoteTitleAction(note.id, title));
    };

    return (
        <View style={{ ...styles.mainContainer, backgroundColor: note.color }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Text style={styles.backButtonText}>&larr;</Text></TouchableOpacity>
                <TextInput placeholder="Title" placeholderTextColor={'#fff'} onChangeText={(text) => handleTitleChange(text)} value={title} style={styles.titleTextInput} />
            </View>
            <ScrollView showsVerticalScrollIndicator={true}>
                <TextInput
                    multiline={true}
                    value={body}
                    onChangeText={(text) => handleBodyChange(text)}
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
