/* eslint-disable prettier/prettier */
import { all, put, takeEvery, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { UPDATE_AUTH_STATUS_REQUEST, USER_LOGIN_REQUEST, USER_LOGOUT_REQUEST, USER_REGISTER_REQUEST } from './actions/authActions';
import { ADD_NOTE_REQUEST, FETCH_NOTES_REQUEST, REMOVE_NOTE_REQUEST } from './actions/notesActions';

const addNoteAsync = async () => {

};

const fetchNotesAsync = async () => {

};

const removeNoteAsync = async () => {

};

function* addNoteSaga() {
    yield takeEvery(ADD_NOTE_REQUEST, addNoteAsync);
}

function* fetchNotesSaga() {
    yield takeEvery(FETCH_NOTES_REQUEST, fetchNotesAsync);
}

function* removeNoteSaga() {
    yield takeEvery(REMOVE_NOTE_REQUEST, removeNoteAsync);
}

const loginAPI = async (email, password) => {
    try {
        const userAuthSuccess = await auth().signInWithEmailAndPassword(email, password);
        return { success: true, userId: userAuthSuccess.user.uid };
    } catch (error) {
        return { success: false, errorCode: error.code };
    }
};

function authStatusAPI() {
    try {
        const user = auth().currentUser;
        return { success: true, status: !!user, uid: user ? user.uid : '' };
    } catch (error) {
        return { success: false, errorCode: error.code };
    }
}

const registerAPI = async (email, password) => {
    try {
        const userAuthSuccess = await auth().createUserWithEmailAndPassword(email, password);
        return { success: true, userId: userAuthSuccess.user.uid };
    } catch (error) {
        return { success: false, errorCode: error.code };
    }
};

const logoutAPI = async () => {
    try {
        await auth().signOut();
        return { success: true };
    } catch (error) {
        return { success: false, errorrCode: error.code };
    }
};

function* loginAsync(action) {
    const { email, password } = action.payload;
    const user = yield call(() => loginAPI(email, password));
    yield put({ type: 'auth/authSuccess', payload: user });
}

function* registerAsync(action) {
    const { email, password } = action.payload;
    const user = yield call(() => registerAPI(email, password));
    yield put({ type: 'auth/authSuccess', payload: user });
}

function* logoutAsync() {
    const status = yield call(logoutAPI);
    yield put({ type: 'auth/logoutSuccess', payload: status });
}

function* updateStatusAsync() {
    const status = yield call(authStatusAPI);
    yield put({ type: 'auth/updateStatus', payload: status });
}

function* logoutSaga() {
    yield takeEvery(USER_LOGOUT_REQUEST, logoutAsync);
}

function* registerSaga() {
    yield takeEvery(USER_REGISTER_REQUEST, registerAsync);
}

function* loginSaga() {
    yield takeEvery(USER_LOGIN_REQUEST, loginAsync);
}

function* authStatusSaga() {
    yield takeEvery(UPDATE_AUTH_STATUS_REQUEST, updateStatusAsync);
}

export default function* mySaga() {
    yield all([
        loginSaga(),
        logoutSaga(),
        registerSaga(),
        authStatusSaga(),
        addNoteSaga(),
        fetchNotesSaga(),
        removeNoteSaga(),
    ]);
}
