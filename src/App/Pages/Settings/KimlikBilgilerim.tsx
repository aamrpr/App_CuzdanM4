import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from 'react'
import { goToPage } from "../../../Router";

const KimlikBilgilerim = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleKimlik}>Kimlik Bilgilerim</Text>

            <View style={styles.allContentBoxs}>
                <TouchableOpacity style={styles.ContentBox} onPress={() => { goToPage('BelgeBilgilerinizGirin', {}) }}>
                    <Text style={styles.firstText}>Kimlik Dogurlama</Text>
                    <Text style={styles.lastText}>Onaylandi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ContentBox} onPress={() => { goToPage('KimlikBilgilerimInformation', {}) }}>
                    <Text style={styles.firstText}>Kimlik Bilgilerim</Text>
                    <Text style={styles.lastText}></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ContentBox}>
                    <Text style={styles.firstText}>Belge Fotograflari</Text>
                    <Text style={styles.lastText}></Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    firstText: {
        flex: 1.2,
        fontSize: 14
    },
    lastText: {
        // flex:1,
        textAlign: 'right',
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold'
    },
    ContentBox: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: 4,
        borderRadius: 6,
        padding: 12,
    },
    allContentBoxs: {
        marginTop: 50,
        marginBottom: 30,
    },
    titleKimlik: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 30,
        fontSize: 20
    },
    container: {
        margin: 22
    },
})

export default KimlikBilgilerim