import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../../Services/api';
import env from '../../Core/Env';
import socketService from '../../Services/Socket';
import Store from '../../Services/Store';

interface Prop {
    startDate?: any,
    endDate?: any,
    targetName?: string,
    changeFilter?: number
}
const Transactions = ({ startDate, endDate, targetName, changeFilter }: Prop) => {
    const [transactions, setTransactions]: any = useState([]);
    let RefreshToken = Store((state) => state.RefreshToken);

    useEffect(() => {
        GetaNewTransaction();
        let key = socketService.addEventListener("NoteUpdate", (e: any) => {
            GetaNewTransaction();
            RefreshToken();
        });
        return () => {
            socketService.removeListener(key);
        }
    }, []);

    useEffect(() => {
        GetaNewTransaction();
    }, [changeFilter])

    function timeAgoTR(date: any) {
        const now: any = new Date();
        const dataSt: any = new Date(date);
        const seconds: any = Math.floor((now - dataSt) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) return `${interval} yıl önce`;

        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) return `${interval} ay önce`;

        interval = Math.floor(seconds / 86400);
        if (interval >= 1) return `${interval} gün önce`;

        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return `${interval} saat önce`;

        interval = Math.floor(seconds / 60);
        if (interval >= 1) return `${interval} dakika önce`;

        return `Şimdi`;
    }
    const GetaNewTransaction = async () => {
        let result = await api.ApiGetaNewTransaction(startDate, endDate, targetName);
        if (result.error == 0) {
            let trans = [];
            for (let t = 0; t < result.data.length; t++) {
                let image;
                let name;
                let color;
                let style = {};
                if (result.data[t].type == "transfer") {
                    if (!result.data[t].isMe) {
                        image = result.data[t].fromUser.image;
                        name = result.data[t].fromUser.name;
                        color = 'green';

                    }
                    else {
                        image = result.data[t].toUser.image;
                        name = result.data[t].toUser.name;
                        color = 'red';
                    }
                }
                else {
                    image = 'uploads/Static/card3.png';
                    style = {
                        backgroundColor: null,
                        borderRadius: 0,
                    }
                    name = result.data[t].description;
                    if (!result.data[t].isMe) {
                        color = 'green';
                    }
                    else {
                        color = 'red';
                    }
                }
                trans.push({ image: image, name: name, date: timeAgoTR(result.data[t].createdAt), color: color, amount: result.data[t].amount, isMe: result.data[t].isMe, currency: result.data[t].currency, style: style });
            }
            setTransactions(trans)
        }
    }

    return (
        transactions.map((txn: any, index: any) => (
            <View style={styles.transactionItem} key={index}>
                <Image style={[styles.avatar, txn.style]} source={{ uri: env.url + 'api/Storage/' + txn.image }} ></Image>
                <View style={styles.transactionDetails}>
                    <Text style={styles.transactionName}>{txn.name}</Text>
                    <Text style={styles.transactionDate}>{txn.date}</Text>
                </View>
                <Text
                    style={[
                        styles.transactionAmount,
                        { color: txn.color },
                    ]}
                >
                    {!txn.isMe ? `+${txn.currency} ${txn.amount.toFixed(2)}` : `-${txn.currency} ${Math.abs(txn.amount).toFixed(2)}`}
                </Text>
            </View>
        ))
    )
}

const styles = StyleSheet.create({
    transactionItem: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
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
})
export default Transactions