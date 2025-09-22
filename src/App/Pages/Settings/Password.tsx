import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goToBack } from '../../../Router';
import api from '../../Services/api';
import Store from '../../Services/Store';
import Toast from 'react-native-toast-message';

const Password = () => {
    const RefreshToken = Store((state) => state.RefreshToken);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        if (password.length !== 6 || confirmPassword.length !== 6) {
            Alert.alert('Hata', 'Şifre 6 haneli olmalıdır.');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Hata', 'Şifreler eşleşmiyor.');
            setLoading(false);
            return;
        }

        // نجاح
        let result = await api.ApiUpdatePassword(password);
        if (result.error == 0) {
            Toast.show({
                type: 'success', // 'success' | 'error' | 'info'
                text1: 'Operation successful!',
                text2: 'Information saved successfully',
            });
            RefreshToken();
            goToBack();
        }
        setLoading(false);
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => { goToBack() }}>
                    <Ionicons name="arrow-back-outline" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={[styles.title, { flex: 1 }]}>Yeni Şifre</Text>
            </View>

            <View style={{ flex: 1, width: '100%', paddingVertical: 10, alignItems: 'center', paddingHorizontal: 10 }}>
                <View style={{ width: '100%' }}>
                    <Text style={styles.label}>Yeni Şifre Belirleyin</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        maxLength={6}
                        keyboardType='number-pad'
                        style={styles.input}
                        placeholder='6 haneli Şifre Belirleyin'
                        secureTextEntry={true}
                    />
                </View>
                <View style={{ width: '100%', marginTop: 20 }}>
                    <Text style={styles.label}>Şifrenizi Tekrarlayın</Text>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        maxLength={6}
                        keyboardType='number-pad'
                        style={styles.input}
                        placeholder='6 haneli Şifre Tekrarı'
                        secureTextEntry={true}
                    />
                </View>
            </View>

            <View style={{ alignItems: 'center', width: '100%' }}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[styles.button, loading && { opacity: 0.7 }]}
                    disabled={loading}
                >
                    {
                        loading ?
                            <ActivityIndicator color="#fff" /> :
                            <Text style={styles.buttonText}>Onayla</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#000',
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#fa6400',
        width: '90%',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
    },
});

export default Password;
