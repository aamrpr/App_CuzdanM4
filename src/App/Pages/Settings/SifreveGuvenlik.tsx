import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import KayitliNumra from "./KayitliNumra";
import TelefonNumra from "./TelefonNumra";
import Email from "./Email";
import Password from "./Password";
import { goToPage } from "../../../Router";

const SifreveGuvenlik = () => {
    const [ModalStatus, SetModalStatus] = useState(false);
    const [TypeModal, SetTypeModal] = useState('');
    const RenderModal = () => {
        if (TypeModal == "Phone") {
            return <TelefonNumra></TelefonNumra>;
        }
        else if (TypeModal == "Email") {
            return <Email></Email>;
        }
        else if (TypeModal == "IdCard") {
            return null;
        }
        else if (TypeModal == "Password") {
            return <Password></Password>;
        }
        else if (TypeModal == "SecuritySettings") {
            return null;
        }
        else {
            return null;
        }

    }
    return (
        <View style={styles.Conatiner}>
            <Text style={styles.titlePg}>Ayarlar</Text>
            <View style={styles.boxesContent}>
                <TouchableOpacity style={styles.thebox} onPress={() => { goToPage('PhoneNumber', {}) }}>
                    <Icon style={styles.firstIcon} name="phone" size={24} color="#fa6400" />
                    <Text style={styles.iconTxt}>
                        Telefon numra
                    </Text>
                    <Text style={styles.iconArrow}>
                        <Icon name="arrow-right" size={20} color="#fa6400" />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.thebox} onPress={() => { }}>
                    <Icon style={styles.firstIcon} name="envelope" size={24} color="#fa6400" />
                    <Text style={styles.iconTxt}>
                        E posta
                    </Text>
                    <Text style={styles.iconArrow}>
                        <Icon name="arrow-right" size={20} color="#fa6400" />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.thebox} onPress={() => { goToPage('Password', {}) }}>
                    <Icon style={styles.firstIcon} name="lock" size={24} color="#fa6400" />
                    <Text style={styles.iconTxt}>
                        Şifre
                    </Text>
                    <Text style={styles.iconArrow}>
                        <Icon name="arrow-right" size={20} color="#fa6400" />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.thebox} onPress={() => { goToPage('KimlikBilgilerim', {}) }}>
                    <Icon style={styles.firstIcon} name="id-card" size={24} color="#fa6400" />
                    <Text style={styles.iconTxt}>
                        Kimlik Bilgilerim
                    </Text>
                    <Text style={styles.iconArrow}>
                        <Icon name="arrow-right" size={20} color="#fa6400" />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.thebox} onPress={() => { goToPage('GuvenlikAyarlar', {}) }}>
                    <Icon style={styles.firstIcon} name="gear" size={24} color="#fa6400" />
                    <Text style={styles.iconTxt}>
                        Güvenlik Ayarlar
                    </Text>
                    <Text style={styles.iconArrow}>
                        <Icon name="arrow-right" size={20} color="#fa6400" />
                    </Text>
                </TouchableOpacity>

            </View>
            <Modal animationType="slide" onRequestClose={() => SetModalStatus(false)} transparent={true} visible={ModalStatus}>
                {RenderModal()}
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    firstIcon: {
        flex: 0.26
    },
    iconArrow: {
        flex: 1,
        textAlign: 'right',
        margin: 8
    },
    iconTxt: {
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
    titlePg: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 50,
        marginBottom: 30
    },
    Conatiner: {
    }
})

export default SifreveGuvenlik