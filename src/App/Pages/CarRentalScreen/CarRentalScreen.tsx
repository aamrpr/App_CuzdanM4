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

const primaryColor = '#0077B6';

const demoCars = [
    { id: '1', model: 'BMW X5', company: 'BMW', city: 'İstanbul', price: '1500₺/gün', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPMHr61BIMu0grixTFXNEj5_meTY7XkqIkmA&s' },
    { id: '2', model: 'Audi A6', company: 'Audi', city: 'Ankara', price: '1300₺/gün', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPMHr61BIMu0grixTFXNEj5_meTY7XkqIkmA&s' },
    { id: '3', model: 'Mercedes C200', company: 'Mercedes-Benz', city: 'İzmir', price: '1600₺/gün', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPMHr61BIMu0grixTFXNEj5_meTY7XkqIkmA&s' },
];

const CarRentalScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [carModel, setCarModel] = useState('');
    const [company, setCompany] = useState('');
    const [city, setCity] = useState('');
    const [rentalDays, setRentalDays] = useState('');
    const [price, setPrice] = useState('');

    const openForm = () => {
        setCarModel('');
        setCompany('');
        setCity('');
        setRentalDays('');
        setPrice('');
        setShowModal(true);
    };

    const submitRental = () => {
        // Formu işleme alabilirsin
        setShowModal(false);
    };

    const renderCar = ({ item }: any) => (
        <View style={styles.card}>
            <Image source={{ uri: item.img }} style={{ height: 150, borderRadius: 10 }}></Image>
            <Text style={styles.text}>🚗 {item.model} ({item.company})</Text>
            <Text style={styles.text}>📍 Şehir: {item.city}</Text>
            <Text style={styles.text}>💰 Fiyat: {item.price}</Text>
            <TouchableOpacity style={styles.buttonSmall} onPress={openForm}>
                <Text style={styles.buttonSmallText}>Kirala</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.mainButton} onPress={openForm}>
                <Text style={styles.mainButtonText}>Araç Kirala</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Mevcut Araçlar</Text>

            <FlatList
                data={demoCars}
                renderItem={renderCar}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            {/* Modal */}
            <Modal visible={showModal} animationType="slide" transparent>
                <View style={styles.modalWrapper}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        <Text style={styles.modalTitle}>Yeni Araç Kiralama</Text>

                        <TextInput
                            placeholder="Araç Modeli"
                            style={styles.input}
                            value={carModel}
                            onChangeText={setCarModel}
                        />
                        <TextInput
                            placeholder="Şirket"
                            style={styles.input}
                            value={company}
                            onChangeText={setCompany}
                        />
                        <TextInput
                            placeholder="Şehir"
                            style={styles.input}
                            value={city}
                            onChangeText={setCity}
                        />
                        <TextInput
                            placeholder="Kiralama Gün Sayısı"
                            style={styles.input}
                            value={rentalDays}
                            onChangeText={setRentalDays}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="Toplam Fiyat (₺)"
                            style={styles.input}
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="numeric"
                        />

                        <TouchableOpacity style={styles.button} onPress={submitRental}>
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

export default CarRentalScreen;
