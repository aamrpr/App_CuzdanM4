import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Hotel = () => {
    return (
        <View style={styles.min}>
            <View style={{}}>
                <View></View>
            </View>
            <View style={{ backgroundColor: '#f2f2f2F', flex: 1, borderRadius: 10 }}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    min: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 20
    },
    cardFilter: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 10
    }
});

export default Hotel