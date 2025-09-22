import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Router, { navigationRef } from './Router';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#E57447' }}>
        <StatusBar barStyle="light-content" />
        <Router />
        <Toast />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
