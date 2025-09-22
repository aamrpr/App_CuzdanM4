import { ActivityIndicator, Text, View, Animated, Image, StyleSheet } from "react-native";
import React, { useEffect, useRef } from 'react';
import Store from "../../Services/Store";

const SplashScreen = () => {
    let ChickToken = Store((state) => state.ChickToken);

    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
        ]).start();

        ChickToken();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../../Assets/images/icon.png')} // استبدله بمسار شعارك
                style={[
                    styles.logo,
                    {
                        transform: [{ scale: scaleAnim }],
                        opacity: opacityAnim,
                    }
                ]}
            />
            <Animated.Text style={[styles.text, { opacity: opacityAnim }]}>
                Hemyan
            </Animated.Text>
            <ActivityIndicator size="large" color="#FF802C" style={{ marginTop: 20 }} />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 170,
        height: 170,
        marginBottom: 0,
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FF802C',
    },
});
