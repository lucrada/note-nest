/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

const AuthScreen = () => {
    React.useEffect(() => {
        StatusBar.setBackgroundColor('#222433');
        StatusBar.setBarStyle('light-content');
    }, []);

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.heading}>Note Nest</Text>
            <Text style={styles.promptText}>Enter your mobile number to get OTP</Text>
            <TextInput placeholderTextColor={'#E4C31B'} style={styles.phoneInputBox} placeholder="Enter phone number" keyboardType="phone-pad" />
            <TouchableOpacity style={styles.submitBtn}><Text style={styles.submitBtnText}>Get OTP</Text></TouchableOpacity>
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
        marginBottom: 22,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    promptText: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 22,
    },
    phoneInputBox: {
        borderWidth: 1,
        borderColor: '#E4C31B',
        color: '#E4C31B',
        width: '100%',
        padding: 14,
        fontSize: 16,
        borderRadius: 5,
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
});

export default AuthScreen;
