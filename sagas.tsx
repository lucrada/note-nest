/* eslint-disable prettier/prettier */
import { all, put, takeEvery } from 'redux-saga/effects';

function* test() {
    // yield takeEvery(DELETE_CATEGORY_REQUEST, deleteCategoryAsync);
}

export default function* mySaga() {
    yield all([
        test(),
    ]);
}
