import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../Services/api';
import env from '../../Core/Env';
import Store from '../../Services/Store';
import socketService from '../../Services/Socket';
import ItemRequest from './ItemRequest';

const ModalRequets = () => {
    const Requests = Store((state) => state.Requests);
    const GetAllRequests = Store((state) => state.GetAllRequests);
    const [modalVisible, setModalVisible] = useState(false);


    const renderItem = ({ item }: any) => {
        return <ItemRequest data={item} onChangeStatus={() => { GetAllRequests() }}></ItemRequest>
    };

    return (
        <View>
            <TouchableOpacity onPress={() => { Requests.length == 0 ? null : setModalVisible(true) }}>
                <Ionicons name={"time-outline"} color={Requests.length == 0 ? '#cbcbcbff' : '#5a5a5aff'} size={30} />
                {Requests.length == 0 ? null : <Text style={{ position: 'absolute', start: -5, color: 'red' }}>{Requests.length}</Text>}
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity>
                                <Text style={{ color: '#0006' }}>Tüm talepler</Text>
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Talepler</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={Requests}
                            renderItem={renderItem}
                            contentContainerStyle={{ paddingBottom: 10 }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        paddingVertical: 10
    },
    modalContent: {
        width: '100%',
        maxHeight: '100%',
        backgroundColor: '#fff',
        borderRadius: 1,
        padding: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
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
export default ModalRequets