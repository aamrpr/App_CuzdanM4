import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Image
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../Services/api';
import { SetStartPage } from '../../../Router';
import Toast from 'react-native-toast-message';

const WithdrawConfirmScreen = ({ route }: any) => {
    const { commissionRate, card, typeSelection } = route.params;
    const [amount, SetAmount]: any = useState('10');
    const [Loading, SetLoading] = useState(false);
    const [Sended, SetSended] = useState(false);
    const total: any = (typeSelection == "walletToCard") ? parseFloat(amount) + ((amount / 100) * 3) : amount;
    const maskCard = (number: any) => '**** **** **** ' + number.slice(-4);

    const confirmTransfer = async () => {
        SetLoading(true);
        let result = await api.ApiCreateTransactionByCard(card._id, amount, 'TL', typeSelection);
        if (result.error == 0) {
            SetSended(true);
        }
        else {
            Toast.show({
                type: 'error', // 'success' | 'error' | 'info'
                text1: 'Error  System!',
                text2: result.data,
            })
            SetLoading(false);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            {Sended ?
                <View style={{ padding: 10, flex: 1 }}>
                    <View style={styles.amountContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { SetStartPage('Tabs', {}) }}>
                                <Ionicons size={30} style={{ marginEnd: 5, color: '#000' }} name={"arrow-back-outline"}></Ionicons>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0009', flex: 1, textAlign: 'center' }}></Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, padding: 30, justifyContent: 'center' }}>
                        <Image source={require('../../../Assets/images/SuccessIcon.png')} style={{ width: '100%', height: 300, objectFit: 'contain' }}></Image>
                        <Text style={{ textAlign: 'center', padding: 20, fontSize: 25, fontWeight: 'bold' }}>Başarıyla tamamlandı </Text>
                    </View>
                    <View style={{}}>
                        <TouchableOpacity style={styles.sendButton} onPress={() => { SetStartPage('Tabs', {}) }}>
                            <Text style={styles.sendButtonText}>Anasayfa</Text>
                        </TouchableOpacity>
                    </View>
                </View >
                :
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Ionicons name="arrow-back" size={24} />
                        <Text style={styles.headerText}>{typeSelection == "walletToCard" ? 'Para Çek' : 'Para Yükle'}</Text>
                    </View>

                    {/* Card */}
                    <LinearGradient
                        colors={['#ff6900', '#843d00']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.card}
                    >
                        <Text style={styles.cardLabel}>CARD NUMBER</Text>
                        <Text style={styles.cardNumber}>{maskCard(card.number)}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={styles.cardDetails}>
                                <View>
                                    <Text style={styles.detailLabel}>Name</Text>
                                    <Text style={styles.detailText}>{card.name}</Text>
                                </View>
                            </View>
                            <View style={[styles.cardDetails]}>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={styles.detailLabel}>VALID</Text>
                                    <Text style={styles.detailText}>{card.expiry}</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Withdraw Summary */}
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryTitle}>{typeSelection == "walletToCard" ? 'Hesaba para çek' : 'Hesaba para Yükle'}</Text>

                        <View style={styles.row}>
                            <Text style={styles.label}>Tutar</Text>
                            <TextInput defaultValue={amount} keyboardType={'number-pad'} onChangeText={(e: any) => { SetAmount(e) }} style={styles.value}></TextInput>
                        </View>
                        {typeSelection == "walletToCard" ? <View style={styles.row}>
                            <Text style={styles.label}>Komisyon</Text>
                            <Text style={styles.value}>3%</Text>
                        </View> : null}
                        <View style={styles.row}>
                            <Text style={styles.label}>Toplam</Text>
                            <Text style={styles.value}>{total} TL</Text>
                        </View>
                    </View>

                    {/* Yardım */}
                    <TouchableOpacity>
                        <Text style={styles.helpText}>Yardım</Text>
                    </TouchableOpacity>

                    {/* Confirm Button */}
                    <TouchableOpacity disabled={Loading} style={styles.confirmButton} onPress={confirmTransfer}>
                        {Loading ? <ActivityIndicator size={20} color={'#fff'}></ActivityIndicator> : <Text style={styles.confirmText}>Onayla</Text>}
                    </TouchableOpacity>
                </ScrollView>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    card: {
        width: '100%',
        height: 180,
        borderRadius: 16,
        padding: 20,
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    cardLabel: {
        color: '#fff',
        fontSize: 12,
    },
    cardNumber: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    detailLabel: {
        color: '#ddd',
        fontSize: 10,
    },
    detailText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    brand: {
        position: 'absolute',
        bottom: 15,
        right: 20,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    summaryBox: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    summaryTitle: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    value: {
        fontSize: 16,
        color: '#333',
        flex: 1,
        padding: 0,
        paddingHorizontal: 10
    },
    helpText: {
        color: '#f96c00',
        fontSize: 14,
        marginBottom: 30,
    },
    confirmButton: {
        backgroundColor: '#f96c00',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
    confirmText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    amountContainer: {
        alignItems: 'center',
        marginBottom: 20,
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
});

export default WithdrawConfirmScreen;
