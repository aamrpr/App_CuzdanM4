import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Store from '../../../Services/Store';
import { goToBack, goToPage } from '../../../../Router';
import { TextInput } from 'react-native-gesture-handler';
import Http from '../../../Core/Http';
import api from '../../../Services/api';
import PhoneInput, { isValidPhoneNumber } from 'react-native-international-phone-number';
import Toast from 'react-native-toast-message';

const ChangePhoneNumber = () => {
    const UserInfo = Store((state) => state.UserInfo);
    const RefreshToken = Store((state) => state.RefreshToken);
    const [selectedCountry, setSelectedCountry]: any = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [StatusSend, SetStatusSend] = useState(0);
    const [MessageError, SetMessageError]: any = useState(null);
    const [MessageErrorCode, SetMessageErrorCode]: any = useState(null);
    const [ValidateNumber, SetValidateNumber] = useState(false);
    const [Loading, SetLoading] = useState(false);
    const [code, setCode] = useState(['', '', '', '']);
    const inputsRef: any = useRef([]);
    const { width } = Dimensions.get('window');
    const handleChange = (text: any, index: any) => {
        // إذا تم لصق النص مرة واحدة (مثل "123456")
        if (text.length === 6) {
            const newCode = text.split('').slice(0, 6);
            setCode(newCode);
            // نقل التركيز إلى آخر عنصر
            inputsRef.current[5]?.focus();
        } else {
            const newCode = [...code];
            newCode[index] = text;
            setCode(newCode);
            if (text !== '' && index < 5) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyPress = (e: any, index: any) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };
    function handleInputValue(phoneNumber: any) {
        setInputValue(phoneNumber);
        if (isValidPhoneNumber(phoneNumber, selectedCountry)) {
            SetValidateNumber(true);
        }
        else {
            SetValidateNumber(false);
        }

    }

    function handleSelectedCountry(country: any) {
        setSelectedCountry(country);
    }

    const ChickPhoneNumberForChangeNumber = async () => {
        if (isValidPhoneNumber(inputValue, selectedCountry)) {
            SetLoading(true);
            let result = await api.ApiChickPhoneNumberForChangeNumber(selectedCountry.callingCode + '' + inputValue.toString().split(' ').join(''));
            if (result.error == 0) {
                SetStatusSend(1);
                inputsRef.current[0]?.focus();
                SetLoading(false);
            }
            else {
                SetMessageError(result.data);
                SetLoading(false);
            }
        }
        else {
            SetMessageError("The phone number is incorrect.");
        }
    }

    const CheckOTPCode = async () => {
        SetMessageErrorCode(null);
        SetLoading(true);
        let result = await api.ApiCheckOTPCodeForChangeNumber(selectedCountry.callingCode + '' + inputValue.toString().split(' ').join(''), code.join(''));
        if (result.error == 0) {
            Toast.show({
                type: 'success', // 'success' | 'error' | 'info'
                text1: 'Operation successful!',
                text2: 'Information saved successfully',
            });
            RefreshToken();
            goToBack();
        }
        else {
            if (result.data === 'Error: Either the verification code has expired or it is incorrect.') {
                SetMessageErrorCode(result.data);
            }
            else {
                SetMessageErrorCode(result.data);
            }
        }
        SetLoading(false);
    }
    return (
        StatusSend == 0 ? <View style={styles.container}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity style={styles.backButton} onPress={() => { goToBack() }}>
                    <Ionicons name="arrow-back-outline" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={[styles.title, { flex: 1 }]}>Yeni Numaranızı Girin</Text>
            </View>
            <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    {MessageError ? <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'red' }}>{MessageError}</Text> : null}
                </View>
                <View style={{ flex: 1, width: '100%', padding: 10 }}>
                    <PhoneInput
                        phoneInputStyles={{
                            callingCode: {
                                display: 'none'
                            },
                            divider: {
                                display: 'none',
                            }
                        }}
                        value={inputValue}
                        language={'tr'}
                        placeholder={"5xx xxx xxxx"}
                        defaultCountry={"TR"}
                        onChangePhoneNumber={handleInputValue}
                        selectedCountry={selectedCountry}
                        onChangeSelectedCountry={handleSelectedCountry}
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, flex: 1 }}>
                        <TouchableOpacity disabled={Loading || !ValidateNumber} onPress={() => ChickPhoneNumberForChangeNumber()} style={{ backgroundColor: ValidateNumber ? '#E57447' : '#eca183', borderRadius: 30, maxWidth: 250, width: 250, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            {Loading ? <ActivityIndicator size={20} color={'#fff'}></ActivityIndicator> : <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Güvenlik Kodu Gönderin</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
            :
            <View style={{ flex: 1, borderTopEndRadius: 40, backgroundColor: '#fff', width: '100%' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SMS Doğrulama</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0005', marginTop: 30 }}>Lütfen <Text style={{ color: '#E57447' }}>{inputValue}</Text> numaralı telefonunuzu doğrulamak için doğrulama kodunu girin.</Text>
                    {MessageErrorCode ? <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'red' }}>{MessageErrorCode}</Text> : null}
                </View>
                <View style={{ flex: 1, width: '100%', padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputsRef.current[index] = ref)}
                                style={{
                                    backgroundColor: '#fff',
                                    width: 50,
                                    height: 50,
                                    borderRadius: 8,
                                    textAlign: 'center',
                                    fontSize: 18,
                                    borderColor: '#FF802C',
                                    borderWidth: 1,
                                }}
                                keyboardType="numeric"
                                maxLength={index === 0 ? 6 : 1}
                                value={digit}
                                onChangeText={(text) => handleChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                            />
                        ))}
                    </View>
                    <View>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0005', marginTop: 30 }}><Text style={{ color: '#E57447' }}>Numara Değiştir</Text>.</Text></TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, flex: 1 }}>
                        <TouchableOpacity disabled={(Loading && code[0].length == 0 || code[1].length == 0 || code[2].length == 0 || code[3].length == 0)} onPress={() => CheckOTPCode()} style={{ backgroundColor: !(code[0].length == 0 || code[1].length == 0 || code[2].length == 0 || code[3].length == 0) ? '#E57447' : '#eca183', borderRadius: 30, maxWidth: 250, width: 250, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            {Loading ? <ActivityIndicator size={20} color={'#fff'}></ActivityIndicator> : <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Devam Et</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    backButton: {
    },
    buttonText: {
        color: '#ffffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    withdrawButton: {
        borderWidth: 1,
        borderColor: '#f96c00',
        backgroundColor: '#f96c00',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginRight: 10,
        textAlign: 'center',
        width: '100%'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 5,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    value: {
        fontSize: 14,
        color: '#333',
        marginRight: 10,
    },
    profileImage: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#ddd',
        marginRight: 10,
    },
});
export default ChangePhoneNumber