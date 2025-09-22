import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

const KimlikBilgilerimInformation = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.container}>
            <Text style={styles.Guvenliktitle}>Kimlik Bilgilerim</Text>



            <View style={styles.rowContainer}>
                <View style={styles.twoRows}>
                    <Text style={styles.row1Txt}>Adi Soyadi:</Text>
                </View>
                <View style={styles.twoRows}>
                    <Text style={styles.switerQQz}>Fatih</Text>
                </View>
            </View>



            <View style={styles.rowContainer}>
                <View style={styles.twoRows}>
                    <Text style={styles.row1Txt}>Sirket Adi:</Text>
                </View>
                <View style={styles.twoRows}>
                    <Text style={styles.switerQQz}>Kerim</Text>
                </View>
            </View>



            <View style={styles.rowContainer}>
                <View style={styles.twoRows}>
                    <Text style={styles.row1Txt}>Vergi No:</Text>
                </View>
                <View style={styles.twoRows}>
                    <Text style={styles.switerQQz}>145******256</Text>
                </View>
            </View>


            <View style={styles.rowContainer}>
                <View style={styles.twoRows}>
                    <Text style={styles.row1Txt}>Vergi Dairesi:</Text>
                </View>
                <View style={styles.twoRows}>
                    <Text style={styles.switerQQz}>Kadikoy</Text>
                </View>
            </View>

            <View style={styles.bottomView}>
                <Text style={styles.ctxt}>
                    Sirket Adresi:
                </Text>
                <Text style={styles.smtxt}>
                    Universite. Firuzkoy Biv. No:83/b. 34320....
                </Text>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    bottomView: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: 2,
        borderRadius: 10,
        padding: 12,
    },
    smtxt: {
        fontSize: 10,
        // backgroundColor:'red'
        marginStart: 10,
        marginTop: 4
    },
    ctxt: {
        fontSize: 16,
    },
    HesabiTxt: {
        textAlign: 'center',
        fontSize: 16,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fa6400',
        marginBottom: 20,
        borderRadius: 6
    },
    OturumTxt: {
        textAlign: 'center',
        fontSize: 16,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fa6400',
        marginBottom: 20,
        borderRadius: 6
    },
    HesabiSilTxt: {
        textAlign: 'center',
        fontSize: 16,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fa6400',
        // marginBottom:20,
        borderRadius: 6,
        color: '#fa6400'
    },
    switerQQz: {
        // marginBottom:20,
        textAlign: 'right'
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
        marginTop: 50,
        marginBottom: 50,
        textAlign: 'center',
        fontSize: 20
    },
    container: {
        // backgroundColor: '#fa6400',
        margin: 22
    }
})
export default KimlikBilgilerimInformation