/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, StatusBar, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdateAuthStatusRequest, getUserLoginRequest, getUserRegisterRequest } from '../actions/authActions';
import { getErrorMessage } from '../utils/helper_functions';

const AuthScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [loginView, setLoginView] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [reg_email, setRegEmail] = React.useState('');
    const [reg_password, setRegPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const _validateCredentials = (email, password, confPass = null) => {
        if (email.trim().length === 0) { return { success: false, message: 'Email cannot be empty' }; }
        if (password.trim().length === 0) { return { success: false, message: 'Password cannot be empty' }; }
        if (confPass != null && (confPass.trim().length === 0 || password.trim() !== confPass.trim())) { return { success: false, message: 'Passwords are not matching' }; }
        return { success: true };
    };

    const _handleLogin = () => {
        let result = _validateCredentials(email, password);
        if (!result.success) {
            Alert.alert('Warning', result.message);
            return;
        }
        dispatch(getUserLoginRequest({ email, password }));
        setEmail('');
        setPassword('');
    };

    const _handleRegister = () => {
        let result = _validateCredentials(reg_email, reg_password, confirmPassword);
        if (!result.success) {
            Alert.alert('Warning', result.message);
            return;
        }
        dispatch(getUserRegisterRequest({ email: reg_email, password: reg_password }));
        setRegEmail('');
        setRegPassword('');
        setConfirmPassword('');
    };

    React.useEffect(() => {
        StatusBar.setBackgroundColor('#222433');
        StatusBar.setBarStyle('light-content');
        dispatch(getUpdateAuthStatusRequest());
        if (auth.userId !== '') {
            navigation.navigate('notes_screen');
        }
        if (auth.errorCode !== '') {
            Alert.alert('Warning', getErrorMessage(auth.errorCode));
        }
    }, [auth.errorCode, auth.userId, dispatch, navigation]);

    return (
        loginView ?
            <View style={styles.mainContainer}>
                <Text style={styles.heading}>Note Nest</Text>
                <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor={'#E4C31B'} style={styles.textBox} placeholder="Email" />
                <TextInput value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} placeholderTextColor={'#E4C31B'} style={styles.textBox} placeholder="Password" />
                <TouchableOpacity onPress={_handleLogin} style={styles.submitBtn}><Text style={styles.submitBtnText}>Login</Text></TouchableOpacity>
                <View style={styles.registerPrompt}>
                    <Text style={styles.registerPromptText}>Do not have an account ? </Text>
                    <TouchableOpacity onPress={() => setLoginView(false)}><Text style={styles.registerPromptButtonText}>Register</Text></TouchableOpacity>
                </View>
            </View>
            :
            <View style={styles.mainContainer}>
                <Text style={styles.heading}>Note Nest</Text>
                <TextInput value={reg_email} onChangeText={(text) => setRegEmail(text)} placeholderTextColor={'#E4C31B'} style={styles.textBox} placeholder="Email" />
                <TextInput value={reg_password} secureTextEntry={true} onChangeText={(text) => setRegPassword(text)} placeholderTextColor={'#E4C31B'} style={styles.textBox} placeholder="Password" />
                <TextInput value={confirmPassword} secureTextEntry={true} onChangeText={(text) => setConfirmPassword(text)} placeholderTextColor={'#E4C31B'} style={styles.textBox} placeholder="Confirm Password" />
                <TouchableOpacity onPress={_handleRegister} style={styles.submitBtn}><Text style={styles.submitBtnText}>Register</Text></TouchableOpacity>
                <View style={styles.registerPrompt}>
                    <Text style={styles.registerPromptText}>Alreay have an account ? </Text>
                    <TouchableOpacity onPress={() => setLoginView(true)}><Text style={styles.registerPromptButtonText}>Login</Text></TouchableOpacity>
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#222433',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 18,
    },
    heading: {
        marginBottom: 52,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    textBox: {
        borderWidth: 1,
        borderColor: '#E4C31B',
        color: '#E4C31B',
        width: '100%',
        padding: 14,
        fontSize: 16,
        borderRadius: 5,
        marginBottom: 18,
    },
    submitBtn: {
        borderWidth: 1,
        borderColor: '#E4C31B',
        backgroundColor: '#E4C31B',
        marginTop: 22,
        width: '100%',
        padding: 14,
        borderRadius: 5,
    },
    submitBtnText: {
        textAlign: 'center',
        color: '#222433',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerPrompt: {
        flexDirection: 'row',
        marginTop: 20,
    },
    registerPromptText: {
        color: '#fff',
        fontSize: 16,
    },
    registerPromptButtonText: {
        color: '#E4C31B',
        fontSize: 16,
    },
});

export default AuthScreen;
