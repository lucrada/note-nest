/* eslint-disable prettier/prettier */
export const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST';
export const REMOVE_NOTE_REQUEST = 'REMOVE_NOTE_REQUEST';
export const FETCH_NOTES_REQUEST = 'FETCH_NOTES_REQUEST';

export const UPDATE_NOTE_REQUEST = 'notes/updateNote';

const addNoteAction = (note) => {
    return { type: ADD_NOTE_REQUEST, payload: note };
};

const removeNoteAction = (id) => {
    return { type: REMOVE_NOTE_REQUEST, payload: id };
};

const fetchNotesAction = (uid) => {
    return { type: FETCH_NOTES_REQUEST, payload: uid };
};

const updateNote = (updatedNote) => {
    return { type: UPDATE_NOTE_REQUEST, payload: updatedNote };
};

export {
    addNoteAction,
    removeNoteAction,
    fetchNotesAction,
    updateNote,
};
