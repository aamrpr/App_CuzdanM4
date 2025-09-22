// AddCardScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CreditCard from 'react-native-credit-card-v2';
import api from '../../Services/api';
import { goToBack } from '../../../Router';

export default function AddCard() {
    const [cardDetail, setCardDetail] = useState({
        cardNumber: '',
        holderName: '',
        expiry: '',
        cvv: '',
    });

    const [showBack, setShowBack] = useState(false);
    const [cardType, setCardType] = useState('mastercard'); // Visa, MasterCard, etc.

    const handleSave = async () => {
        if (
            cardDetail.cardNumber.length === 16 &&
            /^[A-Za-zğüşöçİĞÜŞÖÇ\s]+$/.test(cardDetail.holderName) &&
            /^\d{2}\/\d{2}$/.test(cardDetail.expiry) &&
            cardDetail.cvv.length >= 3
        ) {
            const card = {
                ...cardDetail,
                id: Date.now().toString(),
            };
            let result = await api.ApiCreateCardPayments(cardDetail.holderName, cardDetail.cardNumber, cardDetail.expiry, cardDetail.cvv);
            if (result.error == 0) {
                Alert.alert('✅ Eklendi', 'Kart başarıyla eklendi');
                goToBack();
            }
            else {
                Alert.alert('❌ Hata', result.data);
            }

        } else {
            Alert.alert('❌ Hata', 'Lütfen tüm alanları doğru şekilde doldurun');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Kart Ekle</Text>

            <Text style={{ padding: 10, fontSize: 12, color: '#888', textAlign: 'center' }}>
                Not: Kart bilgileriniz sunucularımızda saklanmamaktadır. Bu sadece gösterim amaçlıdır.
            </Text>
            <View style={{ alignItems: 'center' }}>
                <CreditCard
                    number={cardDetail.cardNumber}
                    name={cardDetail.holderName}
                    expiry={cardDetail.expiry}
                    cvc={cardDetail.cvv}
                    type={cardType}
                    imageFront={require('../../../Assets/images/backCard.jpg')}
                    imageBack={require('../../../Assets/images/backCard.jpg')}
                    showExpiryAfterLabel={false}
                    shiny={false}
                    bar={true}
                    focused={showBack ? "cvc" : ''}
                    bgColor="#1E1E1E"
                    mainContainerStyle={{ borderRadius: 10 }}
                />
            </View>

            <View style={{ padding: 10 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Kart Numarası"
                    keyboardType="numeric"
                    value={cardDetail.cardNumber}
                    onChangeText={(text) => {
                        const cleaned = text.replace(/[^0-9]/g, '').slice(0, 16);
                        setCardDetail({ ...cardDetail, cardNumber: cleaned });
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Kart Üzerindeki İsim"
                    value={cardDetail.holderName}
                    onChangeText={(text) => {
                        const cleaned = text.replace(/[^a-zA-ZğüşöçİĞÜŞÖÇ\s]/g, '');
                        setCardDetail({ ...cardDetail, holderName: cleaned });
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="AA/YY"
                    value={cardDetail.expiry}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const cleaned = text.replace(/[^0-9]/g, '').slice(0, 4);
                        let formatted = cleaned;
                        if (cleaned.length > 2) {
                            formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
                        }
                        setCardDetail({ ...cardDetail, expiry: formatted });
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="CVV"
                    keyboardType="numeric"
                    secureTextEntry
                    onFocus={() => setShowBack(true)}
                    onBlur={() => setShowBack(false)}
                    value={cardDetail.cvv}
                    onChangeText={(text) => {
                        const cleaned = text.replace(/[^0-9]/g, '').slice(0, 4);
                        setCardDetail({ ...cardDetail, cvv: cleaned });
                    }}
                />

                <TouchableOpacity
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderWidth: 1,
                        backgroundColor: '#FF802C',
                        borderColor: '#d57d47',
                        marginHorizontal: 5,
                        borderRadius: 20,
                    }}
                    onPress={handleSave}
                >
                    <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>Kartı Ekle </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff', flex: 1 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'left' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        textAlign: 'left',
    },
    button: {
        backgroundColor: '#3498db',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
