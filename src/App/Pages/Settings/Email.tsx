import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Email = () => {
    const [EmailContent, SetEmailContent] = useState(null);
    const [Rade, SetRade] = useState(false);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0009' }}>
            <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: '#fff' }}>E Posta</Text>
            <View style={{ width: '100%', padding: 10, alignItems: 'center' }}>
                <TextInput style={{ width: '100%', backgroundColor: '#fff', borderRadius: 10, textAlign: 'center' }} placeholder='xxx@xxx.xx'></TextInput>
                <TouchableOpacity style={{ backgroundColor: '#fa6400', width: 100, borderRadius: 10, padding: 10, marginTop: 10 }} onPress={() => SetRade(true)}><Text style={{ textAlign: 'center', color: '#fff', fontSize: 20 }}>Save</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default Email