import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/EvilIcons';
import Iconq from 'react-native-vector-icons/MaterialIcons';

import Icon1 from 'react-native-vector-icons/FontAwesome';
import IconR from 'react-native-vector-icons/AntDesign';
import IconSetting from 'react-native-vector-icons/AntDesign';
import Iconinfocirlce from 'react-native-vector-icons/AntDesign';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { goToPage } from "../../../Router";
import Store from "../../Services/Store";
import env from "../../Core/Env";
const Settings = () => {
    const UserInfo = Store((state) => state.UserInfo);
    return (
        <View style={{ height: '100%' }}>
            <ScrollView>
                <View style={styles.allContent}>

                    <View style={styles.boxItemsNoborder}>
                        <TouchableOpacity onPress={() => { goToPage('KişiselBilgilerim', {}) }}>
                            <Image
                                source={{ uri: env.url + 'api/Storage/' + UserInfo.image }}
                                style={styles.ImageProfile}
                            />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.nameWithId}>{UserInfo.name}</Text>
                            <Text style={[styles.nameWithId, { fontSize: 14, color: '#0005', backgroundColor: '#fa640071', borderRadius: 10, paddingHorizontal: 10 }]}>{UserInfo.phoneNumber.slice(0, 3) + '*******' + UserInfo.phoneNumber.slice(-4)}</Text>
                        </View>
                    </View>

                    <View style={styles.boxesContent}>

                        <TouchableOpacity style={styles.thebox} onPress={() => goToPage('Cuzdan', {})}>
                            <Icon1 name="credit-card-alt" size={24} color="#fa6400" />
                            <Text style={styles.iconTxt}>
                                Kartiarim
                            </Text>
                            <Text style={styles.iconArrow}>
                                <IconR name="right" size={30} color="#fa6400" />
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.thebox} onPress={() => { goToPage('SifreveGuvenlik', {}) }}>
                            <IconSetting name="setting" size={30} color="#fa6400" />
                            <Text style={styles.iconTxt}>
                                Ayarlar
                            </Text>
                            <Text style={styles.iconArrow}>
                                <IconR name="right" size={30} color="#fa6400" />
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.thebox}>
                            <Iconinfocirlce style={styles.firstIcon} name="infocirlce" size={30} color="#fa6400" />
                            <Text style={styles.iconTxt}>
                                Hakkinda
                            </Text>
                            <Text style={styles.iconArrow}>
                                <IconR name="right" size={30} color="#fa6400" />
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.thebox}>
                            <IconMaterialIcons style={styles.firstIcon} name="support-agent" size={30} color="#fa6400" />
                            <Text style={styles.iconTxt}>
                                Yrdim ve Destek
                            </Text>

                            <Text style={styles.iconArrow}>
                                <IconR name="right" size={30} color="#fa6400" />
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    NavigationPages: {
        // marginTop:130,
        // marginBottom:0,
        // paddingBottom:0,
        // width:'100%'
        position: 'static',
        bottom: 0
    },
    allPages: {
        flexDirection: 'row',
        // alignItems:'center',
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: '100%'
    },
    firstIconScanner: {
        textAlign: 'center',
        padding: 20,
        backgroundColor: '#fa6400',
        borderRadius: 60
    },
    Scanner: {
        width: '20%',
        // alignItems:'center',
        alignSelf: 'center',
        marginBottom: -6,
        zIndex: 1
    },
    firstIcon0: {
        flex: 1,
        margin: 4,
        textAlign: 'center',
        paddingTop: 20,
        paddingStart: 30,
        paddingEnd: 30,
        paddingBottom: 4
    },
    // -------------------------------------------------
    firstIcon: {
        flex: 0.25,
    },
    iconArrow: {
        flex: 1,
        textAlign: 'right',
    },
    iconTxt: {
        marginStart: 3,
        flex: 1,                       // Take up available space
        fontSize: 16,
        color: '#000',         // Align items in a row
        alignItems: 'center',          // Center the text horizontally
    },
    thebox: {
        margin: 6,
        flexDirection: 'row',          // Align items in a row
        alignItems: 'center',          // Center vertically
        // justifyContent: 'space-between', // Space between items
        padding: 10,
        backgroundColor: '#fff',       // Background color for the box
        borderRadius: 8,               // Rounded corners
        shadowColor: '#000',           // Shadow properties
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 0.2,                  // For Android shadow
    },
    boxesContent: {
        margin: 12
    },
    textcardMembership: {
        color: '#fa6400'
    },
    cardMembership: {
        marginEnd: 2,
        color: '#fa6400'
    },
    nameOfUText: {
        textAlign: 'center',
        color: '#fa6400',
    },
    justId: {
        marginTop: 20,
        flexDirection: 'row'
    },
    nameWithId: {
        fontSize: 20,
        fontWeight: '500'
    },
    boxItemsNoborder: {
        margin: 10,
        flexDirection: 'row',
        // borderColor: '#fa6400',
        // borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    plusbutton: {
        position: 'absolute',
        top: 46,
        left: 50,
        color: '#000',
        // fontWeight: 'bold'
    },
    ImageProfile: {
        height: 90,
        width: 90,
        borderRadius: 80,
        margin: 14
    },
    cameraIconProfPage: {
        position: 'absolute',
        top: 6,
        left: 90,
        backgroundColor: '#fff',
        padding: 6,
        color: 'blue',
        borderRadius: 20
    },
    allContent: {
        // margin:16,
        marginBottom: 0
    },
    body: {
        // backgroundColor:'#f5f5f5c7'
    }
})
export default Settings