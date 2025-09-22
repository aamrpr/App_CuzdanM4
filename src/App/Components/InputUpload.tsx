import { View, Text, TouchableOpacity, Image, ViewStyle, StyleProp, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import DocumentPicker, { types } from 'react-native-document-picker';
import Http from '../Core/Http';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import env from '../Core/Env';

interface Prop {
    src?: string,
    style?: StyleProp<ViewStyle>,
    onChange: Function
}
const InputUpload = ({ src, style = {}, onChange }: Prop) => {
    const [Progress, SetProgress] = useState(-1);
    const [SrcTemp, SetSrcTemp]: any = useState(null);
    const [imageStatic, SetImageStatic]: any = useState(src);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        console.log(src);

        SetImageStatic(src);
    }, [src])
    const SelectFile = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [types.images],
                copyTo: 'cachesDirectory',
            });

            let result: any = await Http.UploadFile(res.uri, res.name, res.type, (progress: number) => {
                SetProgress(progress);
            });

            if (result.error == 0) {
                SetProgress(-1);
                onChange(result.data);
                SetSrcTemp(result.data);
            } else {
                SetProgress(-1);
            }
        } catch (err: any) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.error(err);
            }
        }
    }

    const handlePress = () => {
        if (SrcTemp || src) {
            setShowOptions(true);
        } else {
            SelectFile();
        }
    }
    return (
        <View>
            <TouchableOpacity style={[{ width: 100, height: 100, borderColor: '#000', borderWidth: 0.5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }, style ? style : {}]} onPress={handlePress}>
                <View style={{ width: '100%', height: '100%' }}>
                    <Image source={{ uri: SrcTemp ? env.url + 'api/Storage/Temp/' + SrcTemp : imageStatic ? imageStatic : 'https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png' }} style={{ width: '100%', height: '100%' }}></Image>
                    {Progress !== -1 ?
                        <View style={{ position: 'absolute', backgroundColor: '#0009', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <AnimatedCircularProgress
                                size={75}
                                width={5}
                                fill={Progress}
                                tintColor="#FF802C"
                                backgroundColor="#0009" >
                                {
                                    (fill) => (
                                        <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 20 }}>
                                            {fill.toFixed(0)}%
                                        </Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View> : null}
                </View>
            </TouchableOpacity>
            <Modal transparent visible={showOptions} animationType="fade">
                <View style={{ flex: 1, backgroundColor: '#0005', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 20, width: 250 }}>
                        <TouchableOpacity onPress={() => {
                            SetSrcTemp(null);
                            SetImageStatic(null);
                            onChange(null);
                            setShowOptions(false);
                        }}>
                            <Text style={{ fontSize: 16, marginBottom: 10 }}>🗑️ Remove</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setShowOptions(false);
                            SelectFile(); // استبدال
                        }}>
                            <Text style={{ fontSize: 16 }}>📁 Select File</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowOptions(false)} style={{ marginTop: 10 }}>
                            <Text style={{ color: 'gray', textAlign: 'right' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default InputUpload