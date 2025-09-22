import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import env from '../../Core/Env'
import api from '../../Services/api'
import LoadingBar from '../../Components/LoadingBar'

interface Prop {
    data: any,
    onChangeStatus: Function
}
const ItemRequest = ({ data, onChangeStatus }: Prop) => {
    const [Loading, SetLoading] = useState(false);
    const ApproveRequest = async () => {
        SetLoading(true);
        let result = await api.ApiApproveRequest(data._id);
        if (result.error == 0) {
            onChangeStatus();
        }
        else {
            console.log(result.data);
            SetLoading(false);
        }
    }
    return (
        <View style={styles.notificationItem} >
            <Image source={{ uri: env.url + 'api/Storage/' + data.fromUser[0].image }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
                <Text style={styles.messageText}>Cüzdanınızdan {data.amount}{data.currency} Bay  <Text style={{ fontWeight: 'bold' }}>{data.fromUser[0].firstName} {data.fromUser[0].lastName}</Text> gönderilecek. Talep no: #{data.Code} .</Text>
                {
                    !Loading ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => { ApproveRequest() }}>
                                <Text style={{ color: 'green' }}>Talebi kabul et</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ color: 'red' }}>Talebi reddet</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <LoadingBar></LoadingBar>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 12,
    },
    messageText: {
        flex: 1,
        padding: 10,
        fontSize: 14,
        color: '#444',
    },
});

export default ItemRequest