import { View, Text, StatusBar, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputUpload from '../../Components/InputUpload'
import Toast from 'react-native-toast-message';
import api from '../../Services/api';
import env from '../../Core/Env';
import RNRestart from 'react-native-restart';

const Confirm = ({ setAuthState }: any) => {
    const [ItemCounties, SetItemCounties]: any = useState([]);
    const [CountryValue, SetCountryValue]: any = useState('');
    const [firstName, SetfirstName]: any = useState('');
    const [lastName, SetlastName]: any = useState('');
    const [email, SetEmail]: any = useState('');
    const [ImageTemp, SetImageTemp]: any = useState(null);
    const [ImageStatic, SetImageStatic]: any = useState(null);
    const [dateofBirth, SetDateofBirth]: any = useState(null);
    const [pass, SetPass]: any = useState(null);
    const [RePass, SetRePass]: any = useState(null);
    const [MessageError, SetMessageError]: any = useState('');
    const [Loadding, SetLoadding]: any = useState(false);
    useEffect(() => {
        GetDataCountries();
        GetAllUserInfo();
    }, []);

    const GetDataCountries = async () => {
        let result = await api.ApiGetCountries();
        if (result.error == 0) {
            let countries = [];
            for (let i = 0; i < result.data.length; i++) {
                countries.push({ label: result.data[i].Text, value: result.data[i].Code });
            }
            console.log(countries);

            SetItemCounties(countries);
        }
    }


    const GetAllUserInfo = async () => {
        let result = await api.ApiGetAllUserInfo();
        if (result.error == 0) {
            if (result.data.firstName) {
                SetfirstName(result.data.firstName);
            }

            if (result.data.lastName) {
                SetlastName(result.data.lastName);
            }
            if (result.data.email) {
                SetEmail(result.data.email);
            }
            if (result.data.image) {
                SetImageStatic(env.url + 'api/Storage/' + result.data.image);
            }
            if (result.data.CountryCode) {
                SetCountryValue(result.data.CountryCode);
            }
            if (result.data.dateofBirth) {
                SetDateofBirth(result.data.dateofBirth);
            }

        }

    }

    const UpdateProfile = async () => {
        if (pass && pass.length == 6 && pass == RePass) {
            SetLoadding(true);
            let result = await api.ApiUpdateProfile({
                CountryCode: CountryValue,
                firstName: firstName,
                lastName: lastName,
                email: email,
                dateofBirth: dateofBirth,
                TempFile: ImageTemp,
                pass: pass
            });
            if (result.error == 0) {
                Toast.show({
                    type: 'success', // 'success' | 'error' | 'info'
                    text1: 'Operation successful!',
                    text2: 'Information saved successfully',
                });
                RNRestart.Restart();
                SetLoadding(false);
            }
            else {
                SetLoadding(false);
                console.log(result.data);
                
                SetMessageError(result.data);
            }
        }
        else {
            SetMessageError('The password is incorrect or does not match. Please enter a password consisting of 5 digits.');
        }

    }


    return (
        <View style={{ flex: 1, backgroundColor: '#FF802C' }}>
            <StatusBar backgroundColor="#FF802C" barStyle="light-content" />
            <View style={{ height: 130, width: '100%' }}></View>
            <View style={{ flex: 1, backgroundColor: '#fff', borderTopEndRadius: 30, borderTopStartRadius: 30 }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <InputUpload src={ImageStatic} onChange={(e: any) => { SetImageTemp(e) }} style={{ width: 100, height: 100, borderRadius: 100, overflow: 'hidden', marginTop: -50 }}></InputUpload>
                </View>
                <View>
                    <Text style={{ textAlign: 'center', color: 'red', fontSize: 18 }}>{MessageError}</Text>
                </View>
                <ScrollView style={{ flex: 1, width: '100%', padding: 10 }}>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Text style={{ color: '#000' }}>Ad</Text>
                        <TextInput defaultValue={firstName} onChangeText={(e) => SetfirstName(e)} style={{ borderRadius: 5, borderColor: '#c1c1c1', borderBottomWidth: 1 }} placeholder='Ad'></TextInput>
                    </View>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Text style={{ color: '#000' }}>Soyad</Text>
                        <TextInput defaultValue={lastName} onChangeText={(e) => SetlastName(e)} style={{ borderRadius: 5, borderColor: '#c1c1c1', borderBottomWidth: 1 }} placeholder='Soyad'></TextInput>
                    </View>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Text style={{ color: '#000' }}>E-posta</Text>
                        <TextInput defaultValue={email} onChangeText={(e) => SetEmail(e)} style={{ borderRadius: 5, borderColor: '#c1c1c1', borderBottomWidth: 1 }} placeholder='E-posta'></TextInput>
                    </View>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Text style={{ color: '#000' }}>Şifre</Text>
                        <TextInput keyboardType={'number-pad'} secureTextEntry={true} maxLength={6} defaultValue={''} onChangeText={(e) => SetPass(e)} style={{ borderRadius: 5, borderColor: '#c1c1c1', borderBottomWidth: 1 }} placeholder=' 6 haneli Şifre Belirleyin'></TextInput>
                    </View>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Text style={{ color: '#000' }}>Şifre</Text>
                        <TextInput keyboardType={'number-pad'} secureTextEntry={true} maxLength={6} defaultValue={''} onChangeText={(e) => SetRePass(e)} style={{ borderRadius: 5, borderColor: '#c1c1c1', borderBottomWidth: 1 }} placeholder=' 6 haneli Şifre Belirleyin'></TextInput>
                    </View>
                </ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <TouchableOpacity disabled={(Loadding && firstName.length == 0 || lastName.length == 0 || (!pass || pass.length !== 6 || pass !== RePass))} onPress={() => UpdateProfile()} style={{ backgroundColor: !(firstName.length == 0 || lastName.length == 0 || (!pass || pass.length !== 6 || pass !== RePass)) ? '#E57447' : '#eca183', borderRadius: 30, maxWidth: 250, width: 250, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        {Loadding ? <ActivityIndicator color={'#fff'} size={15}></ActivityIndicator> : <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Devam Et</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Confirm