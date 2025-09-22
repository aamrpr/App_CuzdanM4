import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../../Services/api';

const PublicQR = () => {
    const [QR, SerQR]: any = useState(null);
    useEffect(() => {
        GenrateQR();
    }, []);
    const GenrateQR = async () => {
        let result = await api.ApiGenrateQR('T');
        if (result.error == 0) {
            SerQR(result.data);
        }

    }
    return (
        <View style={{ backgroundColor: '#FF802C', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 10 }}>
                <Text style={{ fontSize: 20 }}>Alışveriş için okut</Text>
                <Image source={{ uri: QR }} style={{ width: 300, height: 300 }}></Image>
            </View>
        </View>
    )
}

export default PublicQR