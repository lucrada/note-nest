/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import notesReducers from './notesSlice';
import authReducers from './authSlice';

const rootReducer = combineReducers({
    'notes': notesReducers,
    'auth': authReducers,
});

export default rootReducer;
