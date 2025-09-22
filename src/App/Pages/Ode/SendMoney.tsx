import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import env from '../../Core/Env'
import api from '../../Services/api'
import Store from '../../Services/Store'
import { goToBack, goToPage } from '../../../Router'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReactNativeBiometrics from 'react-native-biometrics';
const rnBiometrics = new ReactNativeBiometrics();

interface Prop {
    data: any,
    onChangeAmount: Function,
    OnSubmited: Function,
}
const SendMoney = ({ data, onChangeAmount, OnSubmited }: Prop) => {
    const [amount, setAmount]: any = useState(data.amount ? data.amount : "");
    const [isSend, SetIsSend] = useState(false);

    const handlePress = (value: any) => {
        if (value === '←') {
            onChangeAmount(amount.slice(0, -1));
            setAmount((prev: any) => prev.slice(0, -1));
        } else if (value === '.' && amount.includes('.')) {
            return;
        } else if (value === '0' && amount === '') {
            return;
        } else {
            onChangeAmount(amount + value);
            setAmount((prev: any) => prev + value);
        }

    };
    const renderKeypad = () => {
        const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '←'];
        return buttons.map((btn, index) => (
            <TouchableOpacity key={index} style={styles.key} onPress={() => handlePress(btn)}>
                <Text style={styles.keyText}>{btn}</Text>
            </TouchableOpacity>
        ));
    };

    // const handleBiometricAuth = () => {
    //     rnBiometrics.simplePrompt({ promptMessage: 'Parmak izi ile kimlik doğrulama' })
    //         .then(resultObject => {
    //             const { success } = resultObject;
    //             if (success) {

    //             } else {
    //                 Alert.alert('Başarısız ❌', 'Kimlik doğrulama başarısız');
    //             }
    //         })
    //         .catch(() => {
    //             Alert.alert('Hata', 'Kimlik doğrulama sırasında bir hata oluştu');
    //         });
    // };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ padding: 10 }}>
                <View style={styles.amountContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={goToBack}>
                            <Ionicons size={30} style={{ marginEnd: 5, color: '#000' }} name={"arrow-back-outline"}></Ionicons>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0009', flex: 1, textAlign: 'center' }}>Cüzdanından para çekme</Text>
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#0009', padding: 10 }}>Çekilmesini istediğiniz tutarı yazın veya alıcı tarafından belirlenmesi için sıfır bırakın.</Text>
                </View>
                <View style={[styles.amountContainer, { backgroundColor: '#fff', padding: 20 }]}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0009' }}>Para tutarı</Text>
                    <Text style={styles.amountText}>{amount ? amount : 0}</Text>
                </View>

                <View style={styles.keypad}>{renderKeypad()}</View>
            </View>
            <View style={{ width: '100%', flex: 1, justifyContent: 'center', padding: 20 }}>
                <TouchableOpacity style={styles.sendButton} onPress={() => { OnSubmited(true) }}>
                    <Text style={styles.sendButtonText}>QR kodu oluştur</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sendButton: {
        marginTop: 20,
        backgroundColor: '#FF802C',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    amountContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    commissionText: {
        color: 'gray',
        fontSize: 12,
    },
    amountText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    keypad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
    },
    key: {
        width: '30%',
        paddingVertical: 20,
        alignItems: 'center',
        marginVertical: 5,
    },
    keyText: {
        fontSize: 24,
    },
})
export default SendMoney