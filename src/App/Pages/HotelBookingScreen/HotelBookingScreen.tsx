import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    StyleSheet,
    ScrollView,
    I18nManager,
    Image,
} from 'react-native';

const primaryColor = '#FA6400';

const demoHotels = [
    { id: '1', name: 'Hilton Otel', city: 'İstanbul', date: '2025-06-10', nights: 3, price: '3000₺', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgw1QcpVM_ETgHLuSxL9GMVLXULvNq4ePDg&s' },
    { id: '2', name: 'Sheraton', city: 'Ankara', date: '2025-06-15', nights: 2, price: '2200₺', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4CTQo_YrIea8Dfle4Jjh4Hf9aYTGxNePgCw&s' },
    { id: '3', name: 'Radisson Blu', city: 'İzmir', date: '2025-07-01', nights: 4, price: '3600₺', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKFoo8y4kLV98oUwTZTAQCzqmlJUqOR0NLFg&s' },
];

const HotelBookingScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [hotelName, setHotelName] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [nights, setNights] = useState('');
    const [price, setPrice] = useState('');

    const openForm = () => {
        setHotelName('');
        setCity('');
        setDate('');
        setNights('');
        setPrice('');
        setShowModal(true);
    };

    const submitBooking = () => {
        // İşlem yapılabilir
        setShowModal(false);
    };

    const renderHotel = ({ item }: any) => (
        <View style={styles.card}>
            <Image source={{ uri: item.img }} style={{ height: 150, borderRadius: 10 }}></Image>
            <Text style={styles.text}>🏨 {item.name} - {item.city}</Text>
            <Text style={styles.text}>📅 Giriş Tarihi: {item.date}</Text>
            <Text style={styles.text}>🛏️ Gece: {item.nights}</Text>
            <Text style={styles.text}>💰 Fiyat: {item.price}</Text>
            <TouchableOpacity style={styles.buttonSmall} onPress={openForm}>
                <Text style={styles.buttonSmallText}>Rezervasyon Yap</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.mainButton} onPress={openForm}>
                <Text style={styles.mainButtonText}>Otel Ara</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Mevcut Oteller</Text>

            <FlatList
                data={demoHotels}
                renderItem={renderHotel}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            {/* Modal */}
            <Modal visible={showModal} animationType="slide" transparent>
                <View style={styles.modalWrapper}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        <Text style={styles.modalTitle}>Yeni Otel Rezervasyonu</Text>

                        <TextInput
                            placeholder="Otel Adı"
                            style={styles.input}
                            value={hotelName}
                            onChangeText={setHotelName}
                        />
                        <TextInput
                            placeholder="Şehir"
                            style={styles.input}
                            value={city}
                            onChangeText={setCity}
                        />
                        <TextInput
                            placeholder="Giriş Tarihi (örn: 2025-06-20)"
                            style={styles.input}
                            value={date}
                            onChangeText={setDate}
                        />
                        <TextInput
                            placeholder="Gece Sayısı"
                            style={styles.input}
                            value={nights}
                            onChangeText={setNights}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="Fiyat (₺)"
                            style={styles.input}
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="numeric"
                        />

                        <TouchableOpacity style={styles.button} onPress={submitBooking}>
                            <Text style={styles.buttonText}>Onayla</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#ccc', marginTop: 10 }]}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={[styles.buttonText, { color: '#333' }]}>Kapat</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
        direction: I18nManager.isRTL ? 'rtl' : 'ltr',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: primaryColor,
        marginVertical: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    mainButton: {
        backgroundColor: primaryColor,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    mainButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    buttonSmall: {
        backgroundColor: primaryColor,
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonSmallText: {
        color: '#fff',
        fontSize: 14,
    },
    modalWrapper: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 15,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        color: primaryColor,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        textAlign: 'left',
    },
    button: {
        backgroundColor: primaryColor,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default HotelBookingScreen;
