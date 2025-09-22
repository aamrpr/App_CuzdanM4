import { View, Text, StatusBar, TextInput, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-native-international-phone-number';
import api from '../../Services/api';
import Http from '../../Core/Http';
import { goToPage, SetStartPage } from '../../../Router';

const Login = () => {
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
        if (text.length === 6) {
            const newCode = text.split('').slice(0, 6);
            setCode(newCode);
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

    const LoginOrCreateAccount = async () => {
        if (isValidPhoneNumber(inputValue, selectedCountry)) {
            SetLoading(true);
            let result = await api.ApiLoginOrCreateAccount(selectedCountry.idd.root + '' + inputValue.toString().split(' ').join(''));
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
        let result = await api.ApiCheckOTPCode(selectedCountry.idd.root + '' + inputValue.toString().split(' ').join(''), code.join(''));
        if (result.error == 0) {
            Http.SetToken(result.data.Token);
            SetStartPage('SplashScreen', {});
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
        StatusSend == 0 ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f6f6' }}>
                <StatusBar backgroundColor="#FF802C" barStyle="light-content" />
                <View>
                    <Image source={require('../../../Assets/images/backgroundLogin.png')} style={{ width: width, height: 140, objectFit: 'cover' }}></Image>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FF802C' }}>Giriş Yap</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0005' }}>Cep telefonu numaranızı kullanarak giriş yapın veya yeni bir hesap oluşturun.</Text>
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
                        <TouchableOpacity disabled={Loading || !ValidateNumber} onPress={() => LoginOrCreateAccount()} style={{ backgroundColor: ValidateNumber ? '#E57447' : '#eca183', borderRadius: 30, maxWidth: 250, width: 250, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            {Loading ? <ActivityIndicator size={20} color={'#fff'}></ActivityIndicator> : <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Devam Et</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF802C' }}>
                <StatusBar backgroundColor="#FF802C" barStyle="light-content" />
                <View style={{ height: 130, width: '100%' }}></View>
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
            </View >
    )
}

export default Login