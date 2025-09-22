import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Store from '../../Services/Store';
import env from '../../Core/Env';
import { goToBack, goToPage } from '../../../Router';

const KişiselBilgilerim = () => {
    const UserInfo = Store((state) => state.UserInfo);
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity style={styles.backButton} onPress={() => { goToBack() }}>
                    <Ionicons name="arrow-back-outline" size={26} color="#000" />
                </TouchableOpacity>

                <Text style={[styles.title, { flex: 1 }]}>Kişisel Bilgilerim</Text>
            </View>

            {/* الكارد الرئيسي */}
            <View style={styles.card}>
                {/* الملف الشخصي */}
                <TouchableOpacity style={styles.row} onPress={() => { goToPage('ImageProfile', {}) }}>
                    <Text style={styles.label}>Profil</Text>
                    <View style={styles.rightSection}>
                        <Image source={{ uri: env.url + 'api/Storage/' + UserInfo.image }} style={{ width: 35, height: 35, objectFit: 'cover', borderRadius: 30 }}></Image>
                        <Ionicons name="chevron-forward" size={20} color="#000" />
                    </View>
                </TouchableOpacity>

                {/* رقم الهاتف */}
                <TouchableOpacity style={styles.row} onPress={() => { goToPage('PhoneNumber', {}) }}>
                    <Text style={styles.label}>Numaram</Text>
                    <View style={styles.rightSection}>
                        <Text style={styles.value}>{UserInfo.phoneNumber.slice(0, 3) + '*******' + UserInfo.phoneNumber.slice(-4)}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#000" />
                    </View>
                </TouchableOpacity>

                {/* البريد الإلكتروني */}
                <TouchableOpacity style={[styles.row, { borderColor: '#0000' }]}>
                    <Text style={styles.label}>E-Posta</Text>
                    <View style={styles.rightSection}>
                        <Text style={styles.value}>{UserInfo.email.slice(0, 3) + '*******' + UserInfo.email.slice(-4)}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#000" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    backButton: {
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

export default KişiselBilgilerim;
