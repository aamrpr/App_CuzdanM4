import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

const GuvenlikAyarlar = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [isEnabled3, setIsEnabled3] = useState(false);
    const [isEnabled4, setIsEnabled4] = useState(false);
    const [isEnabled5, setIsEnabled5] = useState(false);
    const [isEnabled6, setIsEnabled6] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.Guvenliktitle}>Guvenlik Ayarlari</Text>

            <View style={styles.rowContainer}>
                <View style={styles.twoRows}>
                    <Text style={styles.row1Txt}>Bildirimler</Text>
                </View>
                <View style={styles.twoRows}>
                    <Switch style={styles.switerQQz}
                        trackColor={{ false: '#767577', true: '#ddd' }}
                        thumbColor={isEnabled ? '#fa6400' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { setIsEnabled(!isEnabled) }}
                        value={isEnabled}
                    />
                </View>
            </View>

            <View style={styles.rowContainer}>
                <View style={styles.twoRows}>
                    <Text style={styles.row1Txt}>Konum</Text>
                </View>
                <View style={styles.twoRows}>
                    <Switch style={styles.switerQQz}
                        trackColor={{ false: '#767577', true: '#ddd' }}
                        thumbColor={isEnabled1 ? '#fa6400' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { setIsEnabled1(!isEnabled1) }}
                        value={isEnabled1}
                    />
                </View>
            </View>

            <View style={styles.rowContainer}>
                <View style={styles.twoRows}>
                    <Text style={styles.row1Txt}>Fotgraf</Text>
                </View>
                <View style={styles.twoRows}>
                    <Switch style={styles.switerQQz}
                        trackColor={{ false: '#767577', true: '#ddd' }}
                        thumbColor={isEnabled2 ? '#fa6400' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { setIsEnabled2(!isEnabled2) }}
                        value={isEnabled2}
                    />
                </View>
            </View>

            <View style={styles.rowContainer}>
                <View style={styles.twoRows}>
                    <Text style={styles.row1Txt}>Mikrofon</Text>
                </View>
                <View style={styles.twoRows}>
                    <Switch style={styles.switerQQz}
                        trackColor={{ false: '#767577', true: '#ddd' }}
                        thumbColor={isEnabled3 ? '#fa6400' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { setIsEnabled3(!isEnabled3) }}
                        value={isEnabled3}
                    />
                </View>
            </View>

            <View style={styles.rowContainer}>
                <View style={styles.twoRows}>
                    <Text style={styles.row1Txt}>Dil</Text>
                </View>
                <View style={styles.twoRows}>
                    <Switch style={styles.switerQQz}
                        trackColor={{ false: '#767577', true: '#ddd' }}
                        thumbColor={isEnabled4 ? '#fa6400' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { setIsEnabled4(!isEnabled4) }}
                        value={isEnabled4}
                    />
                </View>
            </View>

            <View style={styles.rowContainer}>
                <View style={styles.twoRows}>
                    <Text style={styles.row1Txt}>Gece Modu</Text>
                </View>
                <View style={styles.twoRows}>
                    <Switch style={styles.switerQQz}
                        trackColor={{ false: '#767577', true: '#ddd' }}
                        thumbColor={isEnabled5 ? '#fa6400' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { setIsEnabled5(!isEnabled5) }}
                        value={isEnabled5}
                    />
                </View>
            </View>

            <View style={styles.rowContainer}>
                <View style={styles.twoRows}>
                    <Text style={styles.row1Txt}>Hafizalari Yonet</Text>
                </View>
                <View style={styles.twoRows}>
                    <Switch style={styles.switerQQz}
                        trackColor={{ false: '#767577', true: '#ddd' }}
                        thumbColor={isEnabled6 ? '#fa6400' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { setIsEnabled6(!isEnabled6) }}
                        value={isEnabled6}
                    />
                </View>
            </View>

            <Text style={styles.HesabiTxt}>Hesabi Degistir</Text>
            <Text style={styles.OturumTxt}>Oturum Kapat</Text>
            <Text style={styles.HesabiSilTxt}>Hesabi Sil</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    HesabiTxt: {
        textAlign: 'center',
        fontSize: 16,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fa6400',
        marginBottom: 10,
        borderRadius: 6,
        backgroundColor: '#fff',
        marginTop: 20
    },
    OturumTxt: {
        textAlign: 'center',
        fontSize: 16,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fa6400',
        marginBottom: 10,
        borderRadius: 6,
        backgroundColor: '#fff'
    },
    HesabiSilTxt: {
        textAlign: 'center',
        fontSize: 16,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fa6400',
        marginBottom: 10,
        borderRadius: 6,
        color: '#fa6400',
        backgroundColor: '#fff'
    },
    switerQQz: {
        // marginBottom:20
    },
    row1Txt: {
        fontSize: 16,
        // marginBottom:20
    },
    twoRows: {
        flex: 1,
        margin: 6,
    },
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: 2,
        borderRadius: 10,
        padding: 6,
    },
    Guvenliktitle: {
        marginTop: 40,
        marginBottom: 40,
        textAlign: 'center',
        fontSize: 20
    },
    container: {
        // backgroundColor: '#fa6400',
        margin: 12,
    },
    // body:{
    //   backgroundColor:'#f5f5f5c7'
    // }
})

export default GuvenlikAyarlar