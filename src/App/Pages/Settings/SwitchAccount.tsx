import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/EvilIcons';
import Iconq from 'react-native-vector-icons/FontAwesome';
import Store from "../../Services/Store";
import env from "../../Core/Env";

const SwitchAccount = () => {
    const UserInfo = Store((state) => state.UserInfo);
    return (
        <View style={styles.body}>
            <ScrollView>
                <View style={styles.allContent}>
                    <Text style={styles.centerText}>hesabı değiştir</Text>
                    <Text style={styles.HebiSilText}>Hebi Sil</Text>

                    <View style={styles.boxItems}>
                        <View>
                            <Image
                                source={{ uri: env.url + 'api/Storage/' + UserInfo.image }}
                                style={styles.ImageProfile}
                            />
                            <Icon style={styles.cameraIconProfPage} name="camera" size={20} />
                        </View>
                        <View>
                            <Text style={styles.nameWithId}>{UserInfo.name}</Text>
                            <Text style={styles.justId}>iD: {UserInfo.Code}</Text>
                        </View>
                        <View style={styles.nameOfU}>
                            <Text style={styles.nameOfUText}>Aklif</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    nameOfUTextNoColor: {
        textAlign: 'center',
    },
    nameOfUText: {
        textAlign: 'center',
        color: '#fa6400',
    },
    nameOfU: {
        flex: 1,
        marginTop: 15,
        textAlign: 'right',
    },
    justId: {
        marginTop: 20,
    },
    nameWithId: {
        marginTop: 36,
    },
    centerText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 20
    },
    HebiSilText: {
        textAlign: 'center',
        padding: 5,
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: 4,
        backgroundColor: '#fa6400',
        width: 70,
        marginTop: 16,
        alignSelf: 'flex-end'
    },
    boxItems: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#fa6400',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
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
        height: 120,
        width: 120,
        borderRadius: 80,
        margin: 14
    },
    cameraIconProfPage: {
        position: 'absolute',
        top: 6,
        left: 90,
        backgroundColor: '#fff',
        padding: 6,
        borderRadius: 20
    },
    allContent: {
        margin: 16,
    },
    body: {
        // backgroundColor:'#f5f5f5c7'
    }
})
export default SwitchAccount