/* eslint-disable prettier/prettier */
import { all, put, takeEvery, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UPDATE_AUTH_STATUS_REQUEST, USER_LOGIN_REQUEST, USER_LOGOUT_REQUEST, USER_REGISTER_REQUEST } from './actions/authActions';
import { ADD_NOTE_REQUEST, FETCH_NOTES_REQUEST, REMOVE_NOTE_REQUEST, UPDATE_NOTE_REQUEST } from './actions/notesActions';

const addNoteAPI = async (note) => {
    const user = auth().currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
        try {
            const documentRef = await firestore().collection('notes').doc(uid).collection('data').add(note);
            return { success: true, id: documentRef.id };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    } else {
        return { success: false };
    }
};

const fetchNotesAPI = async () => {
    const user = auth().currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
        try {
            const querySnapshot = await firestore().collection('notes').doc(uid).collection('data').get();

            const documents = [];
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    documents.push({ id: doc.id, ...doc.data() });
                });
            }

            return { success: true, payload: documents };
        } catch (error) {
            return { success: false };
        }
    } else {
        return { success: false };
    }
};

const removeNoteAPI = async (noteId) => {
    const user = auth().currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
        try {
            await firestore().collection('notes').doc(uid).collection('data').doc(noteId).delete();
            return { success: true };
        } catch (error) {
            return { success: false };
        }
    } else {
        return { success: false };
    }
};

const updateNoteAPI = async (note) => {
    const user = auth().currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
        try {
            const noteRef = firestore().collection('notes').doc(uid).collection('data').doc(note.id);

            await noteRef.update({
                title: note.title,
                body: note.body,
            });

            return { success: true };
        } catch (error) {
            return { success: false };
        }
    } else {
        return { success: false };
    }
};

function* fetchNotesAsync() {
    const result = yield call(() => fetchNotesAPI());
    yield put({ type: 'notes/fetchNotes', payload: result.success ? result.payload : [] });
}

function* removeNoteAsync(action) {
    const id = action.payload;
    const result = yield call(() => removeNoteAPI(id));
    yield put({ type: 'notes/removeNote', payload: { success: result.success, id: result.success ? id : null } });
}

function* addNoteAsync(action) {
    const note = action.payload;
    const result = yield call(() => addNoteAPI(note));
    yield put({ type: 'notes/addNote', payload: { success: result.success, note: result.success ? { ...note, id: result.id } : null } });
}

function* updateNoteAsync(action) {
    const note = action.payload;
    const result = yield call(() => updateNoteAPI(note));
    yield put({ type: 'notes/updateNote', payload: { success: result.success, note: result.success ? note : null } });
}

function* addNoteSaga() {
    yield takeEvery(ADD_NOTE_REQUEST, addNoteAsync);
}

function* fetchNotesSaga() {
    yield takeEvery(FETCH_NOTES_REQUEST, fetchNotesAsync);
}

function* removeNoteSaga() {
    yield takeEvery(REMOVE_NOTE_REQUEST, removeNoteAsync);
}

function* updateNoteSaga() {
    yield takeEvery(UPDATE_NOTE_REQUEST, updateNoteAsync);
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
        updateNoteSaga(),
    ]);
}
