/* eslint-disable prettier/prettier */
export const getErrorMessage = errorCode => {
    if (errorCode === 'auth/invalid-email') {
        return 'Email is invalid';
    }
    if (errorCode === 'auth/user-not-found') {
        return 'User does not exists';
    }
    if (errorCode === 'auth/wrong-password') {
        return 'Incorrect password';
    }
    if (errorCode === 'auth/email-already-in-use') {
        return 'Email already exists';
    }
    if (errorCode === 'auth/weak-password') {
        return 'Password is too weak';
    }
    if (errorCode === 'auth/invalid-credential') {
        return 'Invalid credentials';
    }
    if (errorCode === 'auth/network-request-failed') {
        return 'Please check your internet connection';
    }
};

export const getRandomColor = () => {
    const colors = ['#A90067', '#0067A9', '#67A900', '#039079', '#790390', '#B5A54A'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};
