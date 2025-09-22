import React from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { goToPage } from "../../../Router";

const friendsData = [
    {
        id: "1",
        name: "Ahmet Yılmaz",
        avatar:
            "https://randomuser.me/api/portraits/men/32.jpg",
        online: true,
    },
    {
        id: "2",
        name: "Elif Demir",
        avatar:
            "https://randomuser.me/api/portraits/women/44.jpg",
        online: false,
    },
    {
        id: "3",
        name: "Mehmet Kaya",
        avatar:
            "https://randomuser.me/api/portraits/men/56.jpg",
        online: true,
    },
    {
        id: "4",
        name: "Zeynep Çelik",
        avatar:
            "https://randomuser.me/api/portraits/women/68.jpg",
        online: false,
    },
    {
        id: "5",
        name: "Can Aydın",
        avatar:
            "https://randomuser.me/api/portraits/men/80.jpg",
        online: true,
    },
];

const Messages = () => {
    const renderFriendItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.friendItem} onPress={() => {
                goToPage('ChatPage', {});
            }}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{item.name}</Text>
                    <View style={styles.statusContainer}>
                        <View
                            style={[
                                styles.statusDot,
                                { backgroundColor: item.online ? "#4CAF50" : "#ccc" },
                            ]}
                        />
                        <Text style={styles.statusText}>
                            {item.online ? "Çevrimiçi" : "Çevrimdışı"}
                        </Text>
                    </View>
                </View>
                <Icon name="angle-right" size={24} color="#FA6400" />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Arkadaş Listesi</Text>
            </View>

            <FlatList
                data={friendsData}
                keyExtractor={(item) => item.id}
                renderItem={renderFriendItem}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default Messages;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff7ef",
    },
    header: {
        backgroundColor: "#FA6400",
        paddingVertical: 18,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
    },
    headerText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
    friendItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#ffd1a3",
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
    },
    friendInfo: {
        flex: 1,
        marginHorizontal: 12,
    },
    friendName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 6,
    },
    statusText: {
        fontSize: 14,
        color: "#777",
    },
});
