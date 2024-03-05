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
            state.notes = action.payload;
        },
        updateNote: (state, action) => {
            const updatedNote = action.payload;
            state.notes = state.notes.map(note => note.id === updatedNote.id ? updatedNote : note);
        },
    },
});

export const { fetchNotes, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
