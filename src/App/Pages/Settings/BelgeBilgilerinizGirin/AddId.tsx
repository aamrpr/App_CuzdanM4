// UploadIDScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goToBack } from '../../../../Router';
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

interface Prop {
    onNext: Function,
    onBack: Function,
}
const AddId = ({ onNext, onBack }: Prop) => {
    const [files, setFiles] = useState<any[]>([]);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });

            const updatedFiles = [...files, result[0]];
            setFiles(updatedFiles);
        } catch (err) {
            if (!DocumentPicker.isCancel(err)) {
                Alert.alert('خطأ', 'فشل تحميل الملف');
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, backgroundColor: '#fff' }}>
                <TouchableOpacity style={[{ width: 30 }]} onPress={() => { onBack() }}>
                    <Ionicons name="arrow-back-outline" size={26} color="#000" />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#f2f2f2', flex: 1, height: 20, borderRadius: 10 }}>
                        <View style={{ width: '60%', height: 20, backgroundColor: '#fa6400', borderRadius: 10 }}></View>
                    </View>
                    <Text>2/3</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <Text style={styles.title}>Kimlik Belgenizi Yükleyin</Text>
                <Text style={styles.subtitle}>
                    Hesabınızı doğrulamak ve güvenliğinizi sağlamak için geçerli belgenizin
                    (Nüfus Cüzdan, Pasaport, Ehliyet vb.) fotoğrafını yükleyin. Belgeleriniz
                    gizlilikle korunacaktır.
                </Text>

                {/* Upload Box */}
                <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
                    <Text style={styles.uploadText}>Belge Yükle</Text>
                    <Text style={styles.uploadNote}>Desteklenen Dosya: PDF, JPG, PNG | Max: 2MB</Text>
                </TouchableOpacity>

                {/* Files List */}
                {files.map((file, index) => (
                    <View key={index} style={styles.fileBox}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.fileName}>{file.name}</Text>
                            <Text style={{
                                color: file.size > MAX_FILE_SIZE ? 'red' : 'gray'
                            }}>
                                {file.size > MAX_FILE_SIZE
                                    ? 'Uyarı: Dosya 2MB’den Büyük'
                                    : `${Math.round(file.size / 1024)}kb`}
                            </Text>
                        </View>
                    </View>
                ))}

                {/* Upload Button */}
                <TouchableOpacity style={styles.button} onPress={() => onNext()}>
                    <Text style={styles.buttonText}>Yükle</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default AddId;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flexGrow: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10
    },
    subtitle: {
        fontSize: 13,
        color: 'gray',
        marginBottom: 20
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
    button: {
        backgroundColor: '#FF6A00',
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});
