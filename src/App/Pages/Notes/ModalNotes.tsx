import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../Services/api';
import env from '../../Core/Env';
import Store from '../../Services/Store';
const ModalNotes = () => {
    const Notes = Store((state) => state.Notes);
    const [modalVisible, setModalVisible] = useState(false);


    const renderItem = ({ item }: any) => {
        return < View style={styles.notificationItem} >
            <Image source={{ uri: env.url + 'api/Storage/' + item.image }} style={styles.avatar} />
            <Text style={styles.messageText}>{item.text}</Text>
        </View >
    };



    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons name={"notifications-outline"} size={30} />
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
                            <Text style={styles.modalTitle}>Notifications</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={Notes}
                            renderItem={renderItem}
                            contentContainerStyle={{ paddingBottom: 10 }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        paddingVertical: 10
    },
    modalContent: {
        width: '90%',
        maxHeight: '70%',
        backgroundColor: '#fff',
        borderRadius: 15,
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
        fontSize: 16,
        color: '#444',
    },
});

export default ModalNotes;
