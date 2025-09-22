import { View, Text } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
import Tabs from './App/Pages/Tabs';
import Confirm from './App/Pages/Confirm/Confirm';
import Login from './App/Pages/Auth/Login';
import SplashScreen from './App/Pages/SplashScreen/SplashScreen';
import PublicQR from './App/Pages/PublicQR/PublicQR';
import Al from './App/Pages/Al/Al';
import Ode from './App/Pages/Ode/Ode';
import Cuzdan from './App/Pages/Cuzdan/Cuzdan';
import AddCard from './App/Pages/Cuzdan/AddCard';
import SifreveGuvenlik from './App/Pages/Settings/SifreveGuvenlik';
import KimlikBilgilerim from './App/Pages/Settings/KimlikBilgilerim';
import BelgeBilgilerinizGirin from './App/Pages/Settings/BelgeBilgilerinizGirin/BelgeBilgilerinizGirin';
import KimlikBilgilerimInformation from './App/Pages/Settings/KimlikBilgilerimInformation';
import GuvenlikAyarlar from './App/Pages/Settings/GuvenlikAyarlar';
import SwitchAccount from './App/Pages/Settings/SwitchAccount';
import FlightBookingScreen from './App/Pages/FlightBookingScreen/FlightBookingScreen';
import HotelBookingScreen from './App/Pages/HotelBookingScreen/HotelBookingScreen';
import CarRentalScreen from './App/Pages/CarRentalScreen/CarRentalScreen';
import ShopScreen from './App/Pages/ShopScreen/ShopScreen';
import ChatPage from './App/Pages/Messages/ChatPage';
import LookScreen from './App/Pages/LookScreen/LookScreen';
import HesapHareketleri from './App/Pages/HesapHareketleri/HesapHareketleri';
import TaxiMap from './App/Pages/Taksi/Taksi';
import Hotel from './App/Pages/Hotel/Hotel';
import ALQueq from './App/Pages/Al/ALQueq';
import OdeNew from './App/Pages/Ode/OdeNew';
import QrScanner from './App/Pages/QrScanner/QrScanner';
import BalanceScreen from './App/Pages/Cuzdan/BalanceScreen';
import CardSelectionScreen from './App/Pages/Cuzdan/CardSelectionScreen';
import WithdrawConfirmScreen from './App/Pages/Cuzdan/WithdrawConfirmScreen';
import KişiselBilgilerim from './App/Pages/Settings/KisiselBilgilerim';
import ImageProfile from './App/Pages/Settings/ImageProfile';
import PhoneNumber from './App/Pages/Settings/PhoneNumber/PhoneNumber';
import ChangePhoneNumber from './App/Pages/Settings/PhoneNumber/ChangePhoneNumber';
import Password from './App/Pages/Settings/Password';

export const navigationRef = createNavigationContainerRef<any>();

export const goToPage = (name: any, params: any) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export const goToBack = () => {
    if (navigationRef.isReady()) {
        navigationRef.goBack();
    }
}

export const SetStartPage = (namePage: string, params?: any) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: namePage, params: params }],
            })
        );
    }
}

const Router = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Confirm" component={Confirm} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="PublicQR" component={PublicQR} />
            <Stack.Screen name="Al" component={Al} />
            <Stack.Screen name="ALQueq" component={ALQueq} />
            <Stack.Screen name="OdeNew" component={OdeNew} />
            <Stack.Screen name="Ode" component={Ode} />
            <Stack.Screen name="HesapHareketleri" component={HesapHareketleri} />
            <Stack.Screen name="Cuzdan" component={Cuzdan} />
            <Stack.Screen name="Password" component={Password} />
            <Stack.Screen name="BalanceScreen" component={BalanceScreen} />
            <Stack.Screen name="CardSelectionScreen" component={CardSelectionScreen} />
            <Stack.Screen name="WithdrawConfirmScreen" component={WithdrawConfirmScreen} />
            <Stack.Screen name="AddCard" component={AddCard} />
            <Stack.Screen name="SifreveGuvenlik" component={SifreveGuvenlik} />
            <Stack.Screen name="KimlikBilgilerim" component={KimlikBilgilerim} />
            <Stack.Screen name="BelgeBilgilerinizGirin" component={BelgeBilgilerinizGirin} />
            <Stack.Screen name="KimlikBilgilerimInformation" component={KimlikBilgilerimInformation} />
            <Stack.Screen name="GuvenlikAyarlar" component={GuvenlikAyarlar} />
            <Stack.Screen name="SwitchAccount" component={SwitchAccount} />
            <Stack.Screen name="FlightBookingScreen" component={FlightBookingScreen} />
            <Stack.Screen name="HotelBookingScreen" component={HotelBookingScreen} />
            <Stack.Screen name="CarRentalScreen" component={CarRentalScreen} />
            <Stack.Screen name="ShopScreen" component={ShopScreen} />
            <Stack.Screen name="ChatPage" component={ChatPage} />
            <Stack.Screen name="LookScreen" component={LookScreen} />
            <Stack.Screen name="TaxiMap" component={TaxiMap} />
            <Stack.Screen name="Hotel" component={Hotel} />
            <Stack.Screen name="QrScanner" component={QrScanner} />
            <Stack.Screen name="KişiselBilgilerim" component={KişiselBilgilerim} />
            <Stack.Screen name="ImageProfile" component={ImageProfile} />
            <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
            <Stack.Screen name="ChangePhoneNumber" component={ChangePhoneNumber} />
        </Stack.Navigator>
    )
}

export default Router