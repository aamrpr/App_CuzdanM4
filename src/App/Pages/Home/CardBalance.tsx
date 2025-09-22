import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
const CardBalance = ({ UserName, DataBlance }: any) => {
    
    return (
        <View style={styles.header}>
            <View style={styles.card}>
                <Text style={styles.name}>{UserName}</Text>
                <View style={styles.balanceRow}>
                    <View>
                        <Text style={styles.balanceLabel}>Türk lirası</Text>
                        <Text style={styles.balance}>₺{DataBlance.Balance.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={styles.exchangeBtn}>
                        <Ionicons name="swap-horizontal" size={24} color="#FF802C" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
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
export default CardBalance