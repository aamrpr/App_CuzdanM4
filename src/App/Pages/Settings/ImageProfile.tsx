import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Store from '../../Services/Store';
import env from '../../Core/Env';
import DocumentPicker, { types } from 'react-native-document-picker';
import Http from '../../Core/Http';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import api from '../../Services/api';
import Toast from 'react-native-toast-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { goToBack } from '../../../Router';

const ImageProfile = () => {
    const UserInfo = Store((state) => state.UserInfo);
    const RefreshToken = Store((state) => state.RefreshToken);
    const [Progress, SetProgress] = useState(-1);
    const [SrcTemp, SetSrcTemp]: any = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const SelectFile = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [types.images],
                copyTo: 'cachesDirectory',
            });
            SetSrcTemp(res.uri);
            let result: any = await Http.UploadFile(res.uri, res.name, res.type, (progress: number) => {
                SetProgress(progress);
            });

            if (result.error == 0) {
                SetProgress(-1);
                let resultUpdate = await api.ApiUpdateImageProfile(result.data);
                if (resultUpdate.error == 0) {
                    Toast.show({
                        type: 'success', // 'success' | 'error' | 'info'
                        text1: 'Operation successful!',
                        text2: 'Information saved successfully',
                    });
                    RefreshToken();
                }
                else {
                    Toast.show({
                        type: 'error', // 'success' | 'error' | 'info'
                        text1: 'Error System',
                        text2: result.data,
                    })
                }

            } else {
                SetProgress(-1);
            }
        } catch (err: any) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.error(err);
            }
        }
    }


    const openCamera = async () => {
        launchCamera({ mediaType: 'photo' }, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorMessage) {
                Alert.alert('Error', response.errorMessage);
            } else if (response.assets && response.assets[0].uri) {
                SetSrcTemp(response.assets[0].uri);
                let result: any = await Http.UploadFile(response.assets[0].uri, response.assets[0].fileName, response.assets[0].type, (progress: number) => {
                    SetProgress(progress);
                });

                if (result.error == 0) {
                    SetProgress(-1);
                    let resultUpdate = await api.ApiUpdateImageProfile(result.data);
                    if (resultUpdate.error == 0) {
                        Toast.show({
                            type: 'success', // 'success' | 'error' | 'info'
                            text1: 'Operation successful!',
                            text2: 'Information saved successfully',
                        });
                        RefreshToken();
                    }
                    else {
                        Toast.show({
                            type: 'error', // 'success' | 'error' | 'info'
                            text1: 'Error System',
                            text2: result.data,
                        })
                    }

                } else {
                    SetProgress(-1);
                }
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity style={styles.backButton} onPress={() => { goToBack() }}>
                    <Ionicons name="arrow-back-outline" size={26} color="#000" />
                </TouchableOpacity>

                <Text style={[styles.title, { flex: 1 }]}>Kişisel Bilgilerim</Text>
            </View>
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <View style={[styles.card]}>
                    {Progress != -1 ?
                        <View>
                            <Image source={{ uri: SrcTemp }} style={{ width: '100%', height: 300, objectFit: 'contain' }}></Image>
                            <View style={{ position: 'absolute', backgroundColor: '#0009', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <AnimatedCircularProgress
                                    size={75}
                                    width={5}
                                    fill={Progress}
                                    tintColor="#FF802C"
                                    backgroundColor="#0009" >
                                    {
                                        (fill) => (
                                            <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 20 }}>
                                                {fill.toFixed(0)}%
                                            </Text>
                                        )
                                    }
                                </AnimatedCircularProgress>
                            </View>
                        </View>
                        :
                        <Image source={{ uri: env.url + 'api/Storage/' + UserInfo.image }} style={{ width: '100%', height: 300, objectFit: 'contain' }}></Image>}
                </View>
            </View>
            <View style={[styles.card, { justifyContent: 'center', alignItems: 'center', paddingBottom: 30, borderRadius: 0 }]}>
                <TouchableOpacity style={{ padding: 5 }} onPress={() => { SelectFile() }}>
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>Galeriden seç</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }} onPress={openCamera}>
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>Fotoğraf Çek</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 5 }} onPress={async () => {
                    let result = await api.ApiRemoveImageProfile();
                    if (result.error == 0) {
                        Toast.show({
                            type: 'success', // 'success' | 'error' | 'info'
                            text1: 'Operation successful!',
                            text2: 'Information saved successfully',
                        });
                        RefreshToken();
                    }
                    else {
                        Toast.show({
                            type: 'error', // 'success' | 'error' | 'info'
                            text1: 'Error System',
                            text2: result.data,
                        })
                    }
                }}>
                    <Text style={{ color: 'red', fontSize: 16, fontWeight: '700' }}>Profili Sil</Text>
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

export default ImageProfile