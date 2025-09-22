import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Store from '../../../Services/Store';
import { goToBack, goToPage } from '../../../../Router';

const PhoneNumber = () => {
    const UserInfo = Store((state) => state.UserInfo);
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity style={styles.backButton} onPress={() => { goToBack() }}>
                    <Ionicons name="arrow-back-outline" size={26} color="#000" />
                </TouchableOpacity>

                <Text style={[styles.title, { flex: 1 }]}>Kişisel Bilgilerim</Text>
            </View>
            <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: 'center' }}>
                <View style={[styles.card, { padding: 10, borderRadius: 5 }]}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 10 }}>{UserInfo.phoneNumber}</Text>
                </View>
            </View>
            <View style={[{ justifyContent: 'center', alignItems: 'center', borderRadius: 0, padding: 20 }]}>
                <TouchableOpacity style={styles.withdrawButton} onPress={() => { goToPage('ChangePhoneNumber', {}) }}>
                    <Text style={styles.buttonText}>Numara Diğiştir</Text>
                </TouchableOpacity>
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
export default PhoneNumber