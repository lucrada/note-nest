/* eslint-disable prettier/prettier */
const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST';
const REMOVE_NOTE_REQUEST = 'REMOVE_NOTE_REQUEST';
const EDIT_NOTE_TITLE_REQUEST = 'EDIT_NOTE_TITLE_REQUEST';
const EDIT_NOTE_BODY_REQUEST = 'EDIT_NOTE_BODY_REQUEST';
const FETCH_NOTES_REQUEST = 'FETCH_NOTES_REQUEST';

const UPDATE_NOTE_STATE_WITH_NEW_NOTES_REQUEST = 'notes/fetchNotes';
const UPDATE_NOTE_TITLE_STATE_WITH_ID_REQUEST = 'notes/editNoteTitleWithId';
const UPDATE_NOTE_BODY_STATE_WITH_ID_REQUEST = 'notes/editNoteBodyWithId';

const addNoteAction = (note) => {
    return { type: ADD_NOTE_REQUEST, payload: note };
};

const removeNoteAction = (id) => {
    return { type: REMOVE_NOTE_REQUEST, payload: id };
};

const fetchNotesAction = (uid) => {
    return { type: FETCH_NOTES_REQUEST, payload: uid };
};

const updateWithNewNotesAction = (notes) => {
    return { type: UPDATE_NOTE_STATE_WITH_NEW_NOTES_REQUEST, payload: notes };
};

const udpateNoteTitleWithIdAction = (id, newTitle) => {
    return { type: UPDATE_NOTE_TITLE_STATE_WITH_ID_REQUEST, payload: { id, newTitle } };
};

const udpateNoteBodyWithIdAction = (id, newBody) => {
    return { type: UPDATE_NOTE_BODY_STATE_WITH_ID_REQUEST, payload: { id, newBody } };
};

const editNoteTitleAction = (id, newTitle) => {
    return { type: EDIT_NOTE_TITLE_REQUEST, payload: { id, newTitle } };
};

const editNoteBodyAction = (id, newBody) => {
    return { type: EDIT_NOTE_BODY_REQUEST, payload: { id, newBody } };
};

export {
    addNoteAction,
    removeNoteAction,
    fetchNotesAction,
    editNoteBodyAction,
    editNoteTitleAction,
    updateWithNewNotesAction,
    udpateNoteTitleWithIdAction,
    udpateNoteBodyWithIdAction,
};
