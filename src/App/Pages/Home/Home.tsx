import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import CardBalance from './CardBalance';
import Store from '../../Services/Store';
import env from '../../Core/Env';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import { goToPage } from '../../../Router';
import ModalNotes from '../Notes/ModalNotes';
import Transactions from './Transactions';
import ModalRequets from '../Requets/ModalRequets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TR } from '../../Services/Localize';
const Home = () => {
    const UserInfo = Store((state) => state.UserInfo);
    const [DataBlance, SetDataBlance] = useState([]);

    useEffect(() => {
        if (UserInfo?.dateFindWallet) {
            SetDataBlance(UserInfo.dateFindWallet);
        }
    }, [UserInfo]);


    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                <View>
                    <Image source={(!UserInfo?.image ? require('../../../Assets/images/icons/avtar.png') : { uri: env.url + 'api/Storage/' + UserInfo.image })} style={{ height: 50, width: 50, borderRadius: 50, borderColor: '#FF802C', borderWidth: 1, objectFit: 'cover' }}></Image>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '900' }}>Hemyan</Text>
                </View>
                <View>
                    <ModalRequets></ModalRequets>
                </View>
                <View>
                    {/* <TouchableOpacity >
                        <Ionicons name={"notifications-outline"} size={30} />
                    </TouchableOpacity> */}
                    <ModalNotes></ModalNotes>
                </View>
            </View>
            {
                DataBlance.map((item, index) => {
                    return <CardBalance key={index} UserName={UserInfo.name} DataBlance={item} ></CardBalance>
                })
            }
            <View style={styles.actionsContainer}>
                {[
                    {
                        label: 'QR', icon: 'qrcode', image: require('../../../Assets/images/icons/QR.png'), OnPress: () => {
                            // router.navigate('/Pages/PublicQR/PublicQR');
                            goToPage('QrScanner', {});
                        }
                    },
                    {
                        label: 'AL', icon: 'arrow-down', image: require('../../../Assets/images/icons/Al.png'), OnPress: () => {
                            //router.navigate('/Pages/Al/Al');
                            goToPage('ALQueq', {});
                        }
                    },
                    {
                        label: 'Öde', icon: 'arrow-up', image: require('../../../Assets/images/icons/Ode.png'), OnPress: () => {
                            //  router.navigate('/Pages/Ode/Ode');
                            goToPage('OdeNew', {});
                        }
                    },
                    {
                        label: 'Cüzadan', icon: 'wallet', image: require('../../../Assets/images/icons/Cuzdan.png'), OnPress: () => {
                            //  router.navigate('/Pages/Ode/Ode');
                            goToPage('BalanceScreen', {});
                        }
                    }
                    // {
                    //     label: 'Bilet', icon: 'ticket-alt', image: require('../../../Assets/images/icons/Bilet.png'), OnPress: () => {
                    //         //  router.navigate('/Pages/Ode/Ode');
                    //         goToPage('FlightBookingScreen', {});
                    //     }
                    // },
                    // {
                    //     label: 'Otel', icon: 'hotel', image: require('../../../Assets/images/icons/Otel.png'), OnPress: () => {
                    //         //  router.navigate('/Pages/Ode/Ode');
                    //         goToPage('Hotel', {});
                    //     }
                    // },
                    // {
                    //     label: 'Taksi', icon: 'car', image: require('../../../Assets/images/icons/RentaCar.png'), OnPress: () => {
                    //         //  router.navigate('/Pages/Ode/Ode');
                    //         goToPage('TaxiMap', {});
                    //     }
                    // },
                    // {
                    //     label: 'Alış Veriş', icon: 'shopping-cart', image: require('../../../Assets/images/icons/AlisVeris.png'), OnPress: () => {
                    //         //  router.navigate('/Pages/Ode/Ode');
                    //         goToPage('ShopScreen', {});
                    //     }
                    // },
                ].map((item, index) => (
                    <TouchableOpacity style={styles.actionItem} key={index} onPress={item?.OnPress}>
                        {!item.image ? <FontAwesome5 name={item.icon} size={24} color="#b3a8a1" /> : <Image source={item.image}></Image>}
                        <Text style={styles.actionText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Recent Activity */}
            <View style={styles.activityHeader}>
                <Text style={styles.activityTitle}>{TR("Hesap Hareketi")}</Text>
                <TouchableOpacity onPress={() => goToPage('HesapHareketleri', {})}>
                    <Text style={styles.seeAll}>Tümünü Gör</Text>
                </TouchableOpacity>
            </View>
            <Transactions></Transactions>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f6f6f6', padding: 20 },
    header: { alignItems: 'center', marginBottom: 20 },
    logo: { fontSize: 20, marginBottom: 10 },
    card: {
        backgroundColor: '#FF802C',
        borderRadius: 10,
        padding: 20,
        width: '100%',
    },
    name: { color: '#fff', fontSize: 18, marginBottom: 10, fontWeight: '700' },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    balanceLabel: { color: '#fff', fontSize: 14 },
    balance: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    exchangeBtn: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    actionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    actionItem: {
        width: '22%',
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    actionText: { marginTop: 5, fontSize: 12, color: '#a6a6a6' },
    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    activityTitle: { fontSize: 18, fontWeight: 'bold' },
    seeAll: { fontSize: 14, color: '#555' },
    transactionItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        backgroundColor: '#e5e5e5',
        borderRadius: 20,
        marginRight: 15,
    },
    transactionDetails: { flex: 1 },
    transactionName: { fontSize: 16, fontWeight: 'bold' },
    transactionDate: { fontSize: 12, color: '#999' },
    transactionAmount: { fontSize: 16, fontWeight: 'bold' },
});

export default Home