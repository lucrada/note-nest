/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notes: [],
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        fetchNotes: (state, action) => {
            state.notes = action.payload.notes;
        },
        editNoteTitleWithId: (state, action) => {
            state.notes.map(note => note.id === action.payload.id ? action.payload.newTitle : note.title);
        },
        editNoteBodyWithId: (state, action) => {
            state.notes.map(note => note.id === action.payload.id ? action.payload.newBody : note.body);
        },
    },
});

export const { } = notesSlice.actions;
export default notesSlice.reducer;
