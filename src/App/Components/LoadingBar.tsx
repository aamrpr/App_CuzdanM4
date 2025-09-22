import { View, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const LoadingBar = () => {
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(progress, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false,
            })
        ).start();
    }, []);

    const widthInterpolated = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.bar, { width: widthInterpolated }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: '#FF802C',
    },
})

export default LoadingBar
