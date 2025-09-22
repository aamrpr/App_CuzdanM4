import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SendMoney from './SendMoney';
import BarcodeScannerComponent from '../../Components/BarcodeScannerComponent';
import PhoneInput, { isValidPhoneNumber } from 'react-native-international-phone-number';
import api from '../../Services/api';

const Ode = () => {
    const [isBarkode, SetIsBarkode] = useState(false);
    const [data, SetData] = useState(null);
    const [inputValue, setInputValue]: any = useState('');
    const [selectedCountry, setSelectedCountry]: any = useState(null);
    const [ValidateNumber, SetValidateNumber] = useState(false);
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

    const ChickPhoneNumber = async () => {
        let result = await api.ApiChickPhoneNumber(selectedCountry.callingCode + '' + inputValue.toString().split(' ').join(''));
        console.log(result);

        if (result.error == 0) {
            SetData(result.data);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Para gönderme</Text>
            {!data ?
                <View style={{ flex: 1 }}>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, isBarkode && styles.activeTab]}
                            onPress={() => SetIsBarkode(true)}
                        >
                            <Text style={[styles.tabText, isBarkode && styles.activeTabText]}>Barkodu tarama </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.tab, !isBarkode && styles.activeTab]}
                            onPress={() => SetIsBarkode(false)}
                        >
                            <Text style={[styles.tabText, !isBarkode && styles.activeTabText]}>Manuel giriş</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        {
                            isBarkode ?
                                <BarcodeScannerComponent OnReadBarcode={(data: any) => { SetData(data); console.log(data, 'read Data Barcode') }}></BarcodeScannerComponent>
                                :
                                <View style={{ flex: 1 }}>
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
                                        <TouchableOpacity disabled={!ValidateNumber} onPress={() => ChickPhoneNumber()} style={{ backgroundColor: ValidateNumber ? '#E57447' : '#eca183', borderRadius: 30, maxWidth: 250, width: 250, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Devam Et</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }

                    </View>
                </View>
                :
                null
                // <SendMoney data={data}></SendMoney>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    backIcon: {
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    profileCircle: {
        height: 80,
        width: 80,
        backgroundColor: '#eee',
        borderRadius: 40,
        alignSelf: 'center',
        marginVertical: 20,
    },
    name: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    phone: {
        textAlign: 'center',
        color: 'gray',
        marginBottom: 20,
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
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 5,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: '#FF802C',
        borderColor: '#d57d47',
    },
    tabText: {
        color: '#333',
    },
    activeTabText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default Ode