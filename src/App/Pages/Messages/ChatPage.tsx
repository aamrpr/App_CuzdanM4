import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { id: "1", sender: "user2", type: "text", content: "مرحبا! كيف حالك؟" },
        { id: "2", sender: "user1", type: "text", content: "أنا بخير، شكراً! وأنت؟" },
    ]);
    const [input, setInput] = useState("");
    const flatListRef: any = useRef();

    // إرسال رسالة نصية
    const sendMessage = () => {
        if (!input.trim()) return;
        const newMessage = {
            id: (messages.length + 1).toString(),
            sender: "user1",
            type: "text",
            content: input.trim(),
        };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        scrollToEnd();
    };

    // تمرير لأسفل بعد إضافة رسالة
    const scrollToEnd = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    // إضافة صورة (رابط صورة فقط كمثال)
    const handleAddImage = () => {
        Alert.prompt(
            "إدراج صورة",
            "أدخل رابط الصورة:",
            (text) => {
                if (text) {
                    const newMessage = {
                        id: (messages.length + 1).toString(),
                        sender: "user1",
                        type: "image",
                        content: text,
                    };
                    setMessages((prev) => [...prev, newMessage]);
                    scrollToEnd();
                }
            },
            "plain-text"
        );
    };

    // تسجيل صوت (محاكاة)
    const handleRecordAudio = () => {
        Alert.alert("تسجيل صوت", "ميزة تسجيل الصوت غير مفعلة في هذا النموذج.");
    };

    // عرض كل رسالة
    const renderMessage = ({ item }: any) => {
        const isUser = item.sender === "user1";
        return (
            <View
                style={[
                    styles.messageContainer,
                    isUser ? styles.sentMessage : styles.receivedMessage,
                ]}
            >
                {item.type === "text" ? (
                    <Text style={[styles.messageText, isUser && styles.sentText]}>
                        {item.content}
                    </Text>
                ) : (
                    <Image source={{ uri: item.content }} style={styles.messageImage} />
                )}
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.select({ ios: "padding", android: null })}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            <View style={styles.header}>
                <Text style={styles.headerText}>الدردشة</Text>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messagesList}
                onContentSizeChange={scrollToEnd}
            />

            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={handleAddImage} style={styles.iconBtn}>
                    <Icon name="image" size={26} color="#FA6400" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRecordAudio} style={styles.iconBtn}>
                    <Icon name="microphone" size={26} color="#FA6400" />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="اكتب رسالة..."
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={sendMessage}
                    returnKeyType="send"
                    multiline={false}
                />

                <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
                    <Icon name="send" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatPage;

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
    messagesList: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    messageContainer: {
        maxWidth: "75%",
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 18,
        marginVertical: 6,
        shadowColor: "#FA6400",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    sentMessage: {
        backgroundColor: "#FA6400",
        alignSelf: "flex-end",
        borderBottomRightRadius: 6,
    },
    receivedMessage: {
        backgroundColor: "#ffd1a3",
        alignSelf: "flex-start",
        borderBottomLeftRadius: 6,
    },
    messageText: {
        fontSize: 16,
        color: "#333",
    },
    sentText: {
        color: "#fff",
    },
    messageImage: {
        width: 200,
        height: 150,
        borderRadius: 15,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#FA6400",
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        height: 45,
        paddingHorizontal: 15,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#FA6400",
        fontSize: 16,
        marginHorizontal: 8,
        color: "#333",
    },
    iconBtn: {
        paddingHorizontal: 6,
    },
    sendBtn: {
        backgroundColor: "#FA6400",
        borderRadius: 25,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
    },
});
