/* eslint-disable prettier/prettier */
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const UPDATE_AUTH_STATUS_REQUEST = 'UPDATE_AUTH_STATUS_REQUEST';

const getUserLoginRequest = (credentials) => {
    return { type: USER_LOGIN_REQUEST, payload: credentials };
};

const getUserLogoutRequest = () => {
    return { type: USER_LOGOUT_REQUEST };
};

const getUserRegisterRequest = (credentials) => {
    return { type: USER_REGISTER_REQUEST, payload: credentials };
};

const getUpdateAuthStatusRequest = () => {
    return { type: UPDATE_AUTH_STATUS_REQUEST };
};

export {
    getUserLoginRequest,
    getUserLogoutRequest,
    getUserRegisterRequest,
    getUpdateAuthStatusRequest,
};
