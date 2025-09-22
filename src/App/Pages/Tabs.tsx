import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../Pages/Home/Home';
import Settings from '../Pages/Settings/Settings';
import { StatusBar, TouchableOpacity, View, StyleSheet, Image, Dimensions } from 'react-native';
import HesapHareketleri from './HesapHareketleri/HesapHareketleri';
import Messages from './Messages/Messages';
import socketService from '../Services/Socket';
import Svg, { Path } from 'react-native-svg';

import env from "../Core/Env";
import { ShowNote } from "../Services/Notification";
import Sound from 'react-native-sound';
import Store from "../Services/Store";
const Tab = createBottomTabNavigator();

const CustomButton = ({ children, onPress }: any) => (
    <TouchableOpacity
        style={styles.customButton}
        onPress={() => { }}
    >
        <View style={styles.customButtonInner}>
            {children}
        </View>
    </TouchableOpacity>
);

const CustomTabBarBackground = () => {
    const { width } = Dimensions.get('window');
    const height = 80;
    return (
        <View style={{ position: 'absolute', bottom: 0 }}>
            <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} >
                <Path
                    d={`
            M0 0
            H${width / 2 - 45}
            C${width / 2 - 45} 0, ${width / 2 - 45} 50, ${width / 2} 50
            C${width / 2 + 45} 50, ${width / 2 + 45} 0, ${width / 2 + 45} 0
            H${width}
            V${height}
            H0
            Z
          `}
                    fill="#fff"
                    stroke="#eee"
                />
            </Svg>
        </View>
    );
};

const sound = new Sound('recivedmony.wav', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('❌ فشل في تحميل الصوت', error);
        return;
    }
});
const Tabs = ({ UserInfo }: any) => {
    const ChcikNotes = Store((state) => state.ChcikNotes);
    const GetAllRequests = Store((state) => state.GetAllRequests);


    useEffect(() => {
        socketService.connect().then(conn => {
            console.log(conn);
            // ChcikNotes();
            // GetAllRequests();
        });
        let key = socketService.addEventListener('NoteUpdate', (e: any) => {
            if (e) {
                if (e.Status == 'receiving') {
                    ShowNote(e.name, env.url + e.image, `Size Bay ${e.name} tarafından ${e.amount}${e.currency} gönderildi.`, e.TransactionID, []);
                }
                else if (e.Status == 'sending') {
                    ShowNote(e.name, env.url + e.image, `Bay ${e.name} sizden ${e.amount}${e.currency} çekildi.`, e.TransactionID, []);
                }
                sound.play((success) => {
                    if (success) {
                        console.log('✅ تم تشغيل الصوت بنجاح');
                    } else {
                        console.log('❌ حدث خطأ أثناء تشغيل الصوت');
                    }
                });
            }
            ChcikNotes();
        });

        let key2 = socketService.addEventListener('RequestsUpdate', () => {
            GetAllRequests();
        });
        return () => {
            socketService.removeListener(key);
            socketService.removeListener(key2);
        }
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#FF802C" barStyle="light-content" />
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: 'transparent', // <-- شفاف لتظهر الـ SVG
                        height: 80,
                        borderTopWidth: 0,
                        elevation: 0,
                    },
                    tabBarBackground: () => <CustomTabBarBackground />
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name="home"
                                size={24}
                                color={focused ? '#FF802C' : '#748c94'}
                            />
                        ),
                        tabBarIconStyle: {
                            top: 15
                        },
                        headerShown: false
                    }}
                    initialParams={{ UserInfo }}
                />

                <Tab.Screen
                    name="Scan"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image source={require('../../Assets/images/icons/Scan.png')}></Image>
                        ),
                        tabBarButton: (props) => <CustomButton {...props} />
                    }}
                />

                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image source={require('../../Assets/images/icons/Profile.png')} style={{ tintColor: focused ? '#FF802C' : '#748c94' }}></Image>
                        ),
                        tabBarIconStyle: {
                            top: 15
                        },
                        headerShown: false
                    }}
                />
            </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: 'transparent',
        zIndex: -1,
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    customButton: {
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 5,
        elevation: 5,
    },
    customButtonInner: {
        width: 70,
        height: 70,
        borderRadius: 70,
        backgroundColor: '#FF802C',
        justifyContent: 'center',
        alignItems: 'center',

        // shadw iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        // shadw Android
        elevation: 10,
    }
});
export default Tabs