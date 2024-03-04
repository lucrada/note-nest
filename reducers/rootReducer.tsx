/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import notesReducers from './notesSlice';

const rootReducer = combineReducers({
    'notes': notesReducers,
});

export default rootReducer;
