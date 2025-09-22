import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../Services/api';

const Al = () => {
    const [QR, SerQR]: any = useState(null);
    const [amount, setAmount]: any = useState('');
    const [isUnlimited, setIsUnlimited] = useState(false);

    const GenrateQR = async () => {
        let am;
        if (!isUnlimited) {
            am = amount;
        }
        let result = await api.ApiGenrateQR('T', am);
        if (result.error == 0) {
            SerQR(result.data);
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

    return (
        QR
            ?
            <View style={{ backgroundColor: '#FF802C', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 10 }}>
                    <Text style={{ fontSize: 20 }}>Alışveriş için okut</Text>
                    <Image source={{ uri: QR }} style={{ width: 300, height: 300 }}></Image>
                </View>
            </View>
            :
            <View style={styles.container}>
                <TouchableOpacity style={styles.backIcon}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Para alıyorum</Text>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, !isUnlimited && styles.activeTab]}
                        onPress={() => setIsUnlimited(false)}
                    >
                        <Text style={[styles.tabText, !isUnlimited && styles.activeTabText]}>Sınırlı Tutar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, isUnlimited && styles.activeTab]}
                        onPress={() => setIsUnlimited(true)}
                    >
                        <Text style={[styles.tabText, isUnlimited && styles.activeTabText]}>Sınırsız</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Para almak için bir barkod oluştur</Text>
                {!isUnlimited ? <View>
                    <View style={styles.amountContainer}>
                        <Text style={styles.commissionText}>Para almak için bir barkod oluştur</Text>
                        <Text style={styles.amountText}>TL {amount ? amount : 0}</Text>
                    </View>

                    <View style={styles.keypad}>{renderKeypad()}</View>
                </View> : null}

                <TouchableOpacity style={styles.sendButton} onPress={GenrateQR}>
                    <Text style={styles.sendButtonText}>Barkod Oluştur</Text>
                </TouchableOpacity>
            </View>
    );
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
export default Al