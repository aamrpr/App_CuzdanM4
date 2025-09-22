import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../Services/api';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { requestStoragePermission } from '../../Services/Permissions';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import Store from '../../Services/Store';
import { goToBack } from '../../../Router';

const ALQueq = () => {
    const UserInfo = Store((state) => state.UserInfo);
    const [QR, SerQR]: any = useState(null);
    const [amount, setAmount]: any = useState('');
    const [isUnlimited, setIsUnlimited] = useState(false);
    const viewShotRef = useRef<any>(null);

    const saveBase64ToGallery = async () => {
        try {
            const uri = await viewShotRef.current.capture();
            const fileName = `qr_composed_${Date.now()}.png`;
            const filePath = `${RNFS.CachesDirectoryPath}/${fileName}`;
            await RNFS.copyFile(uri, filePath);
            await CameraRoll.save(filePath, { type: 'photo' });
            Alert.alert('Saved', 'QR with text saved to gallery.');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to save image.');
        }
    };

    const shareQR = async () => {
        try {
            const uri = await viewShotRef.current.capture();
            const fileName = `qr_composed_${Date.now()}.png`;
            const filePath = `${RNFS.CachesDirectoryPath}/${fileName}`;

            await RNFS.copyFile(uri, filePath);

            await Share.open({
                title: 'Share QR Code',
                url: 'file://' + filePath,
                type: 'image/png',
                failOnCancel: false,
            });
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while sharing the image');
        }
    };
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



    useEffect(() => {
        GenrateQR();
    }, []);

    return (
        QR
            ?
            <View style={{ backgroundColor: '#FF802C', flex: 1, alignItems: 'center' }}>
                <View style={{ padding: 10, marginBottom: 50, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={goToBack}>
                        <Ionicons size={30} style={{ marginEnd: 5, color: '#000' }} name={"arrow-back-outline"}></Ionicons>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, color: '#fff', fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Ödeme al </Text>
                </View>
                <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
                    <View style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 10 }}>
                        <Text style={{ fontSize: 25, fontWeight: 600 }}>{UserInfo.name}</Text>
                        <Image source={{ uri: QR }} style={{ width: 300, height: 300 }} />
                    </View>
                </ViewShot>
                {QR && (
                    <View style={{ flexDirection: 'row', marginTop: 20, backgroundColor: '#fff', width: 320, borderRadius: 10, justifyContent: 'space-between', padding: 10 }}>
                        <TouchableOpacity style={[{ backgroundColor: '#FF802C', padding: 10, flex: 1, borderRadius: 10, marginEnd: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]} onPress={() => saveBase64ToGallery()} >
                            <Ionicons size={14} style={{ marginEnd: 5, color: '#fff' }} name={"images-outline"}></Ionicons>
                            <Text style={styles.sendButtonText}>Galeriye Kaydet</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[{ backgroundColor: '#FF802C', padding: 10, flex: 1, borderRadius: 10, marginEnd: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]} onPress={() => shareQR()}  >
                            <Ionicons size={14} style={{ marginEnd: 5, color: '#fff' }} name={"share-social-outline"}></Ionicons>
                            <Text style={styles.sendButtonText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            :
            <View style={styles.container}>
                <ActivityIndicator size={50}></ActivityIndicator>
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
        textAlign: 'center'
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
export default ALQueq