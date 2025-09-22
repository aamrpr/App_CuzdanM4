import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { goToBack, goToPage } from '../../../Router'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReactNativeBiometrics from 'react-native-biometrics';
import env from '../../Core/Env';
import { ScrollView } from 'react-native-gesture-handler';
import Store from '../../Services/Store';
import api from '../../Services/api';
const rnBiometrics = new ReactNativeBiometrics();
interface Prop {
    DataBarcode: any
}
const Transfer = ({ DataBarcode }: Prop) => {
    let RefreshToken = Store((state) => state.RefreshToken);
    const [amount, setAmount]: any = useState('');
    const [isSend, SetIsSend] = useState(false);

    const CreateTransaction = async () => {
        let result = await api.ApiCreateTransaction(DataBarcode.phoneNumber, amount, 'TL', 'Barcode', 'transfer');
        console.log(result);

        if (result.error == 0) {
            RefreshToken();
            SetIsSend(true);
        }
    }
    const handlePress = (value: any) => {
        if (value === '←') {
            setAmount((prev: any) => prev.slice(0, -1));
        } else if (value === '.' && amount.includes('.')) {
            return;
        } else if (value === '0' && amount === '') {
            return;
        } else {
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


    const handleBiometricAuth = () => {
        CreateTransaction();
        // rnBiometrics.simplePrompt({ promptMessage: 'Parmak izi ile kimlik doğrulama' })
        //     .then(resultObject => {
        //         const { success } = resultObject;
        //         console.log(success);
        //         if (success) {

        //         } else {
        //             Alert.alert('Başarısız ❌', 'Kimlik doğrulama başarısız');
        //         }
        //     })
        //     .catch(() => {
        //         Alert.alert('Hata', 'Kimlik doğrulama sırasında bir hata oluştu');
        //     });
    };
    return (
        !isSend ?
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 10 }}>
                    <View style={styles.amountContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={goToBack}>
                                <Ionicons size={30} style={{ marginEnd: 5, color: '#000' }} name={"arrow-back-outline"}></Ionicons>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0009', flex: 1, textAlign: 'center' }}>Para gönderme</Text>
                        </View>
                        <View style={{ padding: 5, alignItems: 'center' }}>
                            <Image source={{ uri: env.url + 'api/Storage/' + DataBarcode?.image }} style={{ width: 120, height: 120, backgroundColor: '#000', borderRadius: 120 }}></Image>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0006', marginTop: 10 }}>{DataBarcode.name}</Text>
                        </View>
                    </View>
                    <View style={[styles.amountContainer, { backgroundColor: '#fff', padding: 5 }]}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0009' }}>Para tutarı</Text>
                        <Text style={styles.amountText}>TL {amount ? amount : 0}</Text>
                    </View>

                    <View style={styles.keypad}>{renderKeypad()}</View>
                </View>
                <View style={{ width: '100%', justifyContent: 'center', padding: 5 }}>
                    <TouchableOpacity style={styles.sendButton} onPress={() => { handleBiometricAuth() }}>
                        <Text style={styles.sendButtonText}>Parayı gönder</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            :
            <View style={{ padding: 10, flex: 1 }}>
                <View style={styles.amountContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={goToBack}>
                            <Ionicons size={30} style={{ marginEnd: 5, color: '#000' }} name={"arrow-back-outline"}></Ionicons>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0009', flex: 1, textAlign: 'center' }}></Text>
                    </View>
                </View>
                <View style={{ flex: 1, padding: 30, justifyContent: 'center' }}>
                    <Image source={require('../../../Assets/images/SuccessIcon.png')} style={{ width: '100%', height: 300, objectFit: 'contain' }}></Image>
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25, fontWeight: 'bold' }}>Başarıyla tamamlandı </Text>
                </View>
                <View style={{}}>
                    <TouchableOpacity style={styles.sendButton} onPress={() => { goToBack() }}>
                        <Text style={styles.sendButtonText}>Anasayfa</Text>
                    </TouchableOpacity>
                </View>
            </View >
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
        marginVertical: 1,
    },
    keyText: {
        fontSize: 24,
    },
})
export default Transfer