import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // خلفية متدرجة
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import { goToPage } from '../../../Router';
import Store from '../../Services/Store';
import api from '../../Services/api';
import env from '../../Core/Env';

const BalanceScreen = () => {
  const UserInfo = Store((state) => state.UserInfo);
  const [DataBlance, SetDataBlance]: any = useState(null);
  const [Transactions, SetTransactions]: any = useState([]);
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
  const GetAllTransactionByCards = async () => {
    let result = await api.ApiGetAllTransactionByCards();
    // console.log(result);

    if (result.error == 0) {
      let trans = [];
      for (let t = 0; t < result.data.length; t++) {
        let image;
        let name;
        let color;
        image = 'https://png.pngtree.com/png-vector/20220820/ourmid/pngtree-credit-card-icon-vector-isolated-digital-bank-visa-vector-png-image_33354380.png';
        name = result.data[t].description;
        if (result.data[t].type == "cardToWallet") {
          color = 'red';
        }
        else {
          color = 'green';
        }
        trans.push({ image: image, name: name, date: timeAgoTR(result.data[t].createdAt), color: color, amount: result.data[t].amount, isMe: result.data[t].type == "cardToWallet", currency: result.data[t].currency });
      }
      SetTransactions(trans)
    }
    else {

    }
  }

  useEffect(() => {
    if (UserInfo?.dateFindWallet) {
      SetDataBlance(UserInfo.dateFindWallet[0]);
      GetAllTransactionByCards();
    }
  }, [UserInfo]);
  return (
    <LinearGradient colors={['#f96c00', '#fff']} style={styles.gradientContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#f96c00" />
      <View style={styles.content}>
        <Text style={styles.header}>Bakiye</Text>
        {DataBlance ? <View style={styles.balanceBox}>
          <Text style={styles.securityText}>Bakiyeniz güvenli bir şekilde korunmaktadır</Text>
          <Text style={styles.availableText}>Kullanabilir Bakiye (TL)</Text>
          <Text style={styles.balanceAmount}>{DataBlance.Balance.toFixed(2)}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.withdrawButton} onPress={() => { goToPage('CardSelectionScreen', { typeSelection: 'walletToCard' }) }}>
              <Text style={styles.buttonText}>Para çek</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.depositButton} onPress={() => { goToPage('CardSelectionScreen', { typeSelection: 'cardToWallet' }) }}>
              <Text style={styles.buttonTextWhite}>Para Yükle</Text>
            </TouchableOpacity>
          </View>
        </View> : null}



        {/* Transactions List */}
        <View style={{ borderRadius: 20, marginTop: 15, flex: 1 }}>
          {/* Transactions Header */}
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionTitle}>Detaylı İncele</Text>
            <Text style={styles.transactionAll}>Tümü </Text>
          </View>
          <ScrollView>
            {Transactions.map((item: any, index: any) => (
              <View key={index} style={styles.transactionItem}>
                <View style={styles.bankInfo}>
                  <Image style={{
                    width: 40,
                    height: 40,
                    marginRight: 15,
                    objectFit: 'cover'
                  }} source={{ uri: 'https://cdn-icons-png.freepik.com/512/12155/12155531.png' }} ></Image>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.bankName}>{item.name}</Text>
                    <Text style={styles.bankDate}>{item.date}</Text>
                  </View>
                </View>
                <View style={styles.amountSection}>
                  <Text style={[styles.amount, { color: item.color }]}>
                    {!item.isMe ? `+${item.currency} ${item.amount.toFixed(2)}` : `-${item.currency} ${Math.abs(item.amount).toFixed(2)}`}
                  </Text>
                  {/* <Text style={styles.remaining}>Bakiye 30.30TL</Text> */}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
};

const transactions = [
  {
    bank: 'Ziraat Bankası',
    date: '10.04.2021 16:32:18',
    amount: -380.00,
    icon: 'cc-mastercard',
    color: '#FF5A00'
  },
  {
    bank: 'QNB Bankası',
    date: '10.04.2021 16:32:18',
    amount: +380.00,
    icon: 'cc-visa',
    color: '#2D57F2'
  },
  {
    bank: 'Kuveyt Türk Bankası',
    date: '10.04.2021 16:32:18',
    amount: -380.00,
    icon: 'university',
    color: '#1ABC9C'
  }
];

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  content: {
    padding: 15,
    paddingTop: 30,
    flex: 1
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  balanceBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    elevation: 3,
  },
  securityText: {
    color: '#b30000',
    fontSize: 12,
  },
  availableText: {
    fontSize: 14,
    color: '#444',
    marginTop: 10,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  withdrawButton: {
    borderWidth: 1,
    borderColor: '#f96c00',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 10,
    textAlign: 'center',
    flex: 1
  },
  depositButton: {
    backgroundColor: '#f96c00',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flex: 1
  },
  buttonText: {
    color: '#f96c00',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonTextWhite: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e1e1eff',
  },
  transactionAll: {
    fontSize: 14,
    color: '#1e1e1eff',
    fontWeight: 'bold',
  },
  transactionItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankName: {
    fontWeight: '600',
    fontSize: 14,
  },
  bankDate: {
    fontSize: 12,
    color: '#888',
  },
  amountSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  remaining: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default BalanceScreen;
