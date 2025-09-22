import { View, Text, TouchableOpacity, StatusBar, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Http from '../../Core/Http';
import api from '../../Services/api';
import Store from '../../Services/Store';
import { goToPage, SetStartPage } from '../../../Router';

const LookScreen = () => {
    let RefreshToken = Store((state) => state.RefreshToken);
    const [Loading, SetLoading] = useState(false);
    const [MessageErrorCode, SetMessageErrorCode]: any = useState(null);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputsRef: any = useRef([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);
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

    const LoginWithPass = async () => {
        SetLoading(true);
        let result = await api.ApiLoginByPass(code.join(''));
        if (result.error == 0) {
            SetStartPage('Tabs', {});
        }
        else {
            SetMessageErrorCode(result.data);
        }
        SetLoading(false);
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF802C' }}>
            <StatusBar backgroundColor="#FF802C" barStyle="light-content" />
            <View style={{ height: 130, width: '100%' }}></View>
            <View style={{ flex: 1, borderTopEndRadius: 40, backgroundColor: '#fff', width: '100%' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 20 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Giriş yap</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0005', marginTop: 5 }}>Lütfen şifreyi giriniz</Text>
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
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0005', marginTop: 30 }}>Şifrenizi mi unuttunuz? <Text style={{ color: '#E57447' }}>Şifreyi sıfırla</Text>.</Text></TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, flex: 1 }}>
                        <TouchableOpacity disabled={(Loading && code[0].length == 0 || code[1].length == 0 || code[2].length == 0 || code[3].length == 0 || code[4].length == 0 || code[5].length == 0)} onPress={() => LoginWithPass()} style={{ backgroundColor: !(code[0].length == 0 || code[1].length == 0 || code[2].length == 0 || code[3].length == 0 || code[4].length == 0 || code[5].length == 0) ? '#E57447' : '#eca183', borderRadius: 30, maxWidth: 250, width: 250, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            {Loading ? <ActivityIndicator size={20} color={'#fff'}></ActivityIndicator> : <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Devam Et</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default LookScreen