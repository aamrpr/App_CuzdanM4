import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const TelefonNumra = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0009' }}>
            <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Telefon Numra</Text>
            <View style={{ width: '100%', padding: 10, alignItems: 'center' }}>
                <TextInput keyboardType={'number-pad'} style={{ width: '100%', backgroundColor: '#fff', borderRadius: 10, textAlign: 'center' }} placeholder='+90 XXX XXX XXXX'></TextInput>
                <TouchableOpacity style={{ backgroundColor: '#fa6400', width: 100, borderRadius: 10, padding: 10, marginTop: 10 }}><Text style={{ textAlign: 'center', color: '#fff', fontSize: 20 }}>Save</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default TelefonNumra