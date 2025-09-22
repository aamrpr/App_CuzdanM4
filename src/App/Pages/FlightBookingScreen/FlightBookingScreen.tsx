import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FlightBookingScreen = () => {
    return (
        <ScrollView style={styles.container}>
            {/* زر الرجوع */}
            <TouchableOpacity style={styles.backButton}>
                <Ionicons name="arrow-back-outline" size={28} color="#000" />
            </TouchableOpacity>

            {/* العنوان */}
            <Text style={styles.title}>Where to?</Text>

            {/* مدخلات البحث */}
            <View style={styles.searchBox}>
                <View style={styles.inputRow}>
                    <Ionicons name="radio-button-on-outline" size={20} color="#f60" />
                    <TextInput style={styles.input} placeholder="New York City" />
                </View>

                <View style={styles.inputRow}>
                    <Ionicons name="location-outline" size={20} color="#f60" />
                    <TextInput style={styles.input} placeholder="Choose destination" />
                </View>

                <View style={styles.inputRow}>
                    <Ionicons name="calendar-outline" size={20} color="#f60" />
                    <TextInput style={styles.input} placeholder="Select Date" />
                </View>
            </View>

            {/* بطاقات المدن */}
            {[1, 2].map((item) => (
                <View key={item} style={styles.card}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' }}
                        style={styles.cardImage}
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.city}>San Francisco</Text>
                        <Text style={styles.cityDescription}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f8f8f8',
    },
    backButton: {
        marginTop: 40,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f60',
        marginBottom: 20,
    },
    searchBox: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f60',
        padding: 15,
        marginBottom: 30,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#f60',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 180,
    },
    cardContent: {
        padding: 15,
    },
    city: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#f60',
        marginBottom: 8,
    },
    cityDescription: {
        fontSize: 14,
        color: '#888',
    },
});

export default FlightBookingScreen;
