import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../Services/api';
import { goToBack, goToPage } from '../../../Router';

const Cuzdan = () => {
    const [Cards, SetCards]: any = useState([]);
    const maskCard = (number: any) => '**** **** **** ' + number.slice(-4);
    const ApigetAllMyCard = async () => {
        let result = await api.ApigetAllMyCard();
        if (result.error == 0) {
            SetCards(result.data);
            console.log(result.data);

        }
    };
    useEffect(() => {
        ApigetAllMyCard();
    }, []);
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goToBack()}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Kartlarım</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {Cards.map((card: any, index: any) => (
                    <TouchableOpacity key={index} style={styles.cardWrapper} >
                        <LinearGradient
                            colors={(index % 2 === 0) ? ['#ff6900', '#843d00'] : ['#7c4dff', '#1b1464']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.card}
                        >
                            <Text style={styles.label}>CARD NUMBER</Text>
                            <Text style={styles.number}>{maskCard(card.number)}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={styles.cardDetails}>
                                    <View>
                                        <Text style={styles.detailLabel}>Name</Text>
                                        <Text style={styles.detailText}>{card.name}</Text>
                                    </View>
                                </View>
                                <View style={styles.cardDetails}>
                                    <View>
                                        <Text style={styles.detailLabel}>VALID</Text>
                                        <Text style={styles.detailText}>{card.expiry}</Text>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={{ padding: 10 }}>
                <TouchableOpacity style={styles.depositButton} onPress={() => { goToPage('AddCard', {}) }}>
                    <Text style={styles.buttonTextWhite}>Yeni Kart Ekleyin</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// const cards = [
//     {
//         last4: '1234',
//         brand: 'troy',
//         colors: ['#ff6900', '#843d00']
//     },
//     {
//         last4: '1234',
//         brand: 'Mastercard',
//         colors: ['#7c4dff', '#1b1464']
//     },
//     {
//         last4: '1234',
//         brand: 'VISA',
//         colors: ['#ff6900', '#843d00']
//     }
// ];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    depositButton: {
        backgroundColor: '#f96c00',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonTextWhite: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        textAlign: 'center',
        flex: 1
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    cardWrapper: {
        width: '90%',
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden',
    },
    card: {
        padding: 20,
        borderRadius: 16,
        height: 180,
        justifyContent: 'space-between',
    },
    label: {
        color: 'white',
        fontSize: 12,
        letterSpacing: 1,
    },
    number: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    brandLogo: {
        position: 'absolute',
        bottom: 15,
        right: 20,
    },
});

export default Cuzdan;
