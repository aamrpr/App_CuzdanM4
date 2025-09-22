import React, { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import Icon from 'react-native-vector-icons/EvilIcons';
import api from "../../../Services/api";
import InputSelect from "../../../Components/InputSelect";
import { TextInput } from "react-native-gesture-handler";
import { goToBack, goToPage } from "../../../../Router";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import Toast from "react-native-toast-message";

interface Prop {
    onNext: Function
}
const Start = ({ onNext }: Prop) => {
    const [Loading, SetLoading] = React.useState(false);
    const [selected, setSelected] = React.useState(1);
    const [ItemCounties, SetItemCounties]: any = useState([]);
    const [CountryValue, SetCountryValue]: any = useState('');
    const [IDNumber, SetIDNumber]: any = useState('');
    const [FirstName, SetFirstName]: any = useState('');
    const [LastName, SetLastName]: any = useState('');
    const [DateOfBirth, SetDateOfBirth]: any = useState(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
    });

    const [showStartPicker, setShowStartPicker] = useState(false);

    useEffect(() => {
        GetDataCountries();
    }, []);

    const GetDataCountries = async () => {
        let result = await api.ApiGetCountries();
        if (result.error == 0) {
            let countries = [];
            for (let i = 0; i < result.data.length; i++) {
                countries.push({ label: result.data[i].Text, value: result.data[i].Code });
            }
            console.log(countries);

            SetItemCounties(countries);
        }
    }


    const CreateOrUpdateInformation = async () => {
        SetLoading(true);
        let result = await api.ApiCreateOrUpdateInformation(CountryValue, IDNumber, FirstName, LastName, DateOfBirth.toString());
        if (result.error == 0) {
            Toast.show({
                type: 'success', // 'success' | 'error' | 'info'
                text1: 'Operation successful!',
                text2: 'Information saved successfully',
            });
            onNext();
            SetLoading(false);
        }
        else {
            Toast.show({
                type: 'error', // 'success' | 'error' | 'info'
                text1: 'Error Server!',
                text2: result.data,
            });
        }
    }

    const GetInformation = async () => {
        SetLoading(true);
        let result = await api.ApiGetAllClientInformation();
        if (result.error == 0) {
            if (result.data) {
                SetCountryValue(result.data.CountryCode);
                SetFirstName(result.data.FirstName);
                SetLastName(result.data.LastName);
                SetIDNumber(result.data.IDNumber);
                SetDateOfBirth(new Date(result.data.DateOfBirth));
            }
        }
        SetLoading(false);
    }

    useEffect(() => {
        GetInformation();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <DatePicker
                modal
                open={showStartPicker}
                date={DateOfBirth}
                mode="date"
                onConfirm={(date) => {
                    setShowStartPicker(false);
                    SetDateOfBirth(date);
                }}
                onCancel={() => {
                    setShowStartPicker(false);
                }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                <TouchableOpacity style={styles.backButton} onPress={() => { goToBack() }}>
                    <Ionicons name="arrow-back-outline" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={[styles.Guvenliktitle, { flex: 1 }]}>Belge Bilgileriniz Girin</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.twoBtnToggle}>
                        <TouchableOpacity
                            style={[styles.twoBtnS1, selected === 1 ? styles.activeButton : styles.inactiveButton]} onPress={() => setSelected(1)} >
                            <Text
                                style={[styles.buttonText, selected === 1 && styles.activeButtonText]} >
                                Bireysel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.twoBtnS2, selected === 2 ? styles.activeButton : styles.inactiveButton]} onPress={() => setSelected(2)} >
                            <Text
                                style={[
                                    styles.buttonText,
                                    selected === 2 && styles.activeButtonText
                                ]}
                            >
                                Kurumsal
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {selected == 1 ?
                        <View>
                            <View style={{ height: 100 }}>
                                <Text style={styles.titleOfSelectionList}>Ülkeyi seçin</Text>
                                <InputSelect Items={ItemCounties} onChange={(e: any) => { SetCountryValue(e()); }} Value={CountryValue}></InputSelect>
                            </View>
                            <View style={[styles.rowContainer, { marginTop: 4 }]}>
                                <View style={styles.twoRows}>
                                    <Text style={styles.row1Txt}>TC Numaranız:</Text>
                                </View>
                                <View style={[styles.twoRows, { flex: 1 }]}>
                                    <TextInput defaultValue={IDNumber} onChangeText={(e) => { SetIDNumber(e) }} style={{ padding: 0 }} placeholder=""></TextInput>
                                </View>
                            </View>

                            <View style={styles.rowContainer}>
                                <View style={styles.twoRows}>
                                    <Text style={styles.row1Txt}>Adınızı:</Text>
                                </View>
                                <View style={[styles.twoRows, { flex: 1 }]}>
                                    <TextInput defaultValue={FirstName} onChangeText={SetFirstName} style={{ padding: 0 }} placeholder=""></TextInput>
                                </View>
                            </View>

                            <View style={styles.rowContainer}>
                                <View style={styles.twoRows}>
                                    <Text style={styles.row1Txt}>Soy Adınızı :</Text>
                                </View>
                                <View style={[styles.twoRows, { flex: 1 }]}>
                                    <TextInput defaultValue={LastName} onChangeText={SetLastName} style={{ padding: 0 }} placeholder=""></TextInput>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.rowContainer} onPress={() => { setShowStartPicker(true); }}>
                                <View style={styles.twoRows}>
                                    <Text style={styles.row1Txt}>Doğum Tarihiniz:</Text>
                                </View>
                                <View style={[styles.twoRows, { flex: 1, justifyContent: 'center' }]}>
                                    {DateOfBirth ? <Text>{DateOfBirth.toLocaleDateString()}</Text> : null}
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity style={[styles.btnViewOnaylay, { marginTop: 15 }]} onPress={CreateOrUpdateInformation}>
                                <Text style={styles.btnTxtOnaylay}>Onaylay</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
                            <View style={{ height: 100 }}>
                                <Text style={styles.titleOfSelectionList}>Ülkeyi seçin</Text>
                                <InputSelect Items={ItemCounties} onChange={(e: any) => { SetCountryValue(e()); }} Value={CountryValue}></InputSelect>
                            </View>
                            <Text style={styles.titleOfSelectionList}>Kimtik Bilgileri</Text>
                            <View style={styles.textIconContainer}>
                                <Text style={styles.textOfCam}>
                                    Kimlik Otomatik Doldurmak İçin Fotoğraf Çek
                                </Text>
                                <Icon style={styles.cameraIconProfPage} name="camera" size={40} />
                            </View>

                            <View style={styles.rowContainer}>
                                <View style={styles.twoRows}>
                                    <Text style={styles.row1Txt}>Sirket Adi        :</Text>
                                </View>
                                <View style={[styles.twoRows, { flex: 1 }]}>
                                    <TextInput style={{ padding: 0 }} placeholder="xxxxxxx"></TextInput>
                                </View>
                            </View>

                            <View style={styles.rowContainer}>
                                <View style={styles.twoRows}>
                                    <Text style={styles.row1Txt}>Vergi Numrasi:</Text>
                                </View>
                                <View style={[styles.twoRows, { flex: 1 }]}>
                                    <TextInput style={{ padding: 0 }} placeholder="xxxxxxx"></TextInput>
                                </View>
                            </View>

                            <View style={styles.rowContainer}>
                                <View style={styles.twoRows}>
                                    <Text style={styles.row1Txt}>Vergi Dairesi   :</Text>
                                </View>
                                <View style={[styles.twoRows, { flex: 1 }]}>
                                    <TextInput style={{ padding: 0 }} placeholder="xxxxxxx"></TextInput>
                                </View>
                            </View>

                            <View style={[styles.bottomView, { flexDirection: 'column', padding: 10 }]}>
                                <Text style={styles.twoRows}>
                                    Sirket Adresi
                                </Text>
                                <View style={[{ flex: 1, margin: 6 }]}>
                                    <TextInput style={{ padding: 0, height: 100, textAlignVertical: 'top' }} placeholderTextColor={'#0002'} placeholder="**** NO:9 SOK:8765" multiline={true}></TextInput>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.btnViewOnaylay} onPress={() => {
                                goToPage('AddId', {})
                            }}>
                                <Text style={styles.btnTxtOnaylay}>Onaylay</Text>
                            </TouchableOpacity>
                        </View>}
                </View>
            </ScrollView>
            {Loading ? <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#fff6', justifyContent: 'center' }}>
                <ActivityIndicator size={50} color={'#fa6400'}></ActivityIndicator>
            </View> : null}
        </View >
    );
}

const styles = StyleSheet.create({
    btnViewOnaylay: {
        margin: 6,
        backgroundColor: '#fa6400',
        padding: 10,
        borderRadius: 30,
    },
    btnTxtOnaylay: {
        color: '#ffffffff',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        margin: 22
    },
    backButton: {
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 20,
    },
    textIconContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
        padding: 10,
        backgroundColor: '#fff',
        // margin:4,
        borderRadius: 8,
        marginBottom: 6
    },
    textOfCam: {
        fontSize: 10,
        color: '#000',
        flex: 1.5, // Take up available space
        textAlign: 'center', // Center text
        borderRadius: 8,
    },
    titleOfSelectionList: {
        fontSize: 12,
        color: '#ccc',
        marginTop: 20
    },
    cameraIconProfPage: {
        marginStart: 8, // Space between text and icon
        backgroundColor: '#fff'
    },
    twoBtnToggle: {
        flexDirection: 'row',
        marginTop: 30,
        borderRadius: 8,
        backgroundColor: '#ddd',
    },
    twoBtnS1: {
        flex: 1,
        padding: 16,
        margin: 4,
        borderRadius: 8,
        fontWeight: 'bold',
    },
    twoBtnS2: {
        flex: 1,
        textAlign: 'center',
        padding: 16,
        margin: 4,
        borderRadius: 8,
        fontWeight: 'bold',
    },
    activeButton: {
        backgroundColor: '#fff', // Active button has a white background
    },
    inactiveButton: {
        backgroundColor: '#ddd', // Inactive button has a light gray background
    },
    activeButtonText: {
        color: '#fa6400', // Active button's text is orange
    },
    buttonText: {
        color: '#000', // Default text color for inactive buttons (black)
        textAlign: 'center',
    },

    // -----------------------------------------------------

    bottomView: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 8,
        marginTop: 4,
        width: '98%',
        marginStart: 4
    },
    smtxt: {
        fontSize: 10,
        // backgroundColor:'red'
        margin: 10,
    },
    ctxt: {
        fontSize: 14,
        margin: 6
    },
    switerQQz: {
        fontSize: 14,
        margin: 6,
        textAlign: 'right'
    },
    row1Txt: {
        margin: 6,
        fontSize: 14,
    },
    twoRows: {
        margin: 6,
    },
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 14,
        borderRadius: 5
    },
    Guvenliktitle: {
        textAlign: 'center',
        fontSize: 20
    },
    uploadBox: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 30,
        alignItems: 'center',
        marginBottom: 20
    },
    uploadText: {
        color: 'blue',
        fontSize: 16
    },
    uploadNote: {
        fontSize: 11,
        color: 'gray',
        marginTop: 8
    },
    fileBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    fileName: {
        fontWeight: 'bold',
        marginBottom: 4
    },
})

export default Start