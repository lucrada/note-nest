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
        addNote: (state, action) => {
            if (!action.payload.success) {
                return;
            }
            state.notes = [action.payload.note, ...state.notes];
        },
        removeNote: (state, action) => {
            if (!action.payload.success) {
                return;
            }
            const noteId = action.payload.id;
            state.notes = state.notes.filter(note => note.id !== noteId);
        },
        updateNote: (state, action) => {
            if (!action.payload.success) {
                return;
            }
            const updatedNote = action.payload.note;
            state.notes = state.notes.map(note => note.id === updatedNote.id ? updatedNote : note);
        },
    },
});

export const { fetchNotes, updateNote, removeNote } = notesSlice.actions;
export default notesSlice.reducer;
