import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function TaxiMap() {
    const region = {
        latitude: 41.085,
        longitude: 29.04,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const routeCoordinates = [
        { latitude: 41.081, longitude: 29.02 },
        { latitude: 41.082, longitude: 29.03 },
        { latitude: 41.085, longitude: 29.04 },
    ];

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={region}>
                <Polyline coordinates={routeCoordinates} strokeColor="gold" strokeWidth={4} />
                <Marker coordinate={routeCoordinates[0]} pinColor="black" />
                <Marker coordinate={routeCoordinates[2]} pinColor="blue" />
            </MapView>

            <View style={styles.panel}>
                <Text style={styles.location}><FontAwesome5 name="map-marker-alt" size={12} color="gold" />  2116 SK Beşiktaş İstanbul</Text>
                <Text style={styles.location}><FontAwesome5 name="map-marker-alt" size={12} color="gold" />  Maslak 1453 Sarıyer İstanbul</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.taxiList}>
                    {['Sarı Taksi', 'Turkuaz Taksi', 'VIP Taksi'].map((type, index) => (
                        <TouchableOpacity key={index} style={[styles.taxiOption, index === 1 && styles.taxiOptionSelected]}>
                            <FontAwesome5 name="car" size={28} color="gray" style={{ marginBottom: 4 }} />
                            <Text>{type}</Text>
                            <Text style={styles.price}>₺250-300</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.callButton}>
                    <Text style={styles.callText}>Araç Çağır</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    panel: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
    },
    location: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    taxiList: {
        flexDirection: 'row',
        marginVertical: 12,
    },
    taxiOption: {
        width: 100,
        height: 100,
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    taxiOptionSelected: {
        borderColor: '#FF802C',
        borderWidth: 2,
    },
    price: {
        marginTop: 4,
        color: 'green',
        fontSize: 12,
    },
    callButton: {
        backgroundColor: '#FF802C',
        padding: 14,
        borderRadius: 30,
        alignItems: 'center',
    },
    callText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
});