import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import FaceDetector from '@react-native-ml-kit/face-detection';
import { useIsFocused } from '@react-navigation/native';
import Tts from 'react-native-tts';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Prop {
    onNext: Function,
    onBack: Function
}
const TackFace = ({ onNext, onBack }: Prop) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [photosCount, setPhotosCount] = useState(0);
    const [statusText, setStatusText] = useState('Lütfen yüzünüzü kameraya çevirin');
    const [lastPhotoUri, setLastPhotoUri] = useState<string | null>(null);
    const [started, setStarted] = useState(false);
    const [faceDetected, setFaceDetected] = useState(false);
    const [step, setStep] = useState<'front' | 'right' | 'left'>('front');
    const [countPerStep, setCountPerStep] = useState(0);

    const [photosByStep, setPhotosByStep] = useState<{ front: string | null, right: string | null, left: string | null }>({
        front: null,
        right: null,
        left: null,
    });

    const cameraRef: any = useRef<Camera>(null);
    const devices = useCameraDevices();
    const deviceFront = devices.find(d => d.position === 'front');
    const device = deviceFront ?? devices[0];
    const isFocused = useIsFocused();

    const maxPhotosPerStep = 1;

    useEffect(() => {
        Tts.setDefaultLanguage('tr-TR');
        Tts.setDefaultRate(0.5);
        (async () => {
            const cameraPermission: any = await Camera.requestCameraPermission();
            console.log('Camera permission:', cameraPermission);
            setHasPermission(cameraPermission === 'authorized' || cameraPermission === "granted");
        })();
    }, []);

    const speakStepInstruction = (currentStep: 'front' | 'right' | 'left') => {
        if (!started) return;
        if (currentStep === 'front') {
            Tts.speak('Lütfen yüzünüzü kameraya çevirin.');
        } else if (currentStep === 'right') {
            Tts.speak('Lütfen başınızı sağa çevirin.');
        } else if (currentStep === 'left') {
            Tts.speak('Lütfen başınızı sola çevirin.');
        }
    };

    useEffect(() => {
        speakStepInstruction(step);
    }, [step]);

    const takePhotoIfHeadInPosition = async () => {
        if (!cameraRef.current) return;
        try {
            const photo = await cameraRef.current.takePhoto({
                qualityPrioritization: 'speed',
            });

            const imagePath = photo.path.startsWith('file://') ? photo.path : `file://${photo.path}`;

            const faces = await FaceDetector.detect(imagePath, {
                landmarkMode: 'all',
                performanceMode: 'fast',
                classificationMode: 'all',
            });

            if (faces.length === 0) {
                setFaceDetected(false);
                setStatusText('Yüz algılanamadı, lütfen yüzünüzü kameraya çevirin.');
                return false;
            }

            const face = faces[0];
            const yaw = face.rotationY;
            console.log(yaw);
            let inCorrectPosition = false;

            if (step === 'front') {
                if (yaw > -15 && yaw < 15) {
                    inCorrectPosition = true;
                    setStatusText(`Önden fotoğraf çekiliyor: ${countPerStep + 1} / ${maxPhotosPerStep}`);
                } else {
                    setStatusText('Lütfen yüzünüzü kameraya çevirin (Önden).');
                }
            } else if (step === 'right') {
                if (yaw >= -50 && yaw <= -15) {
                    inCorrectPosition = true;
                    setStatusText(`Sağdan fotoğraf çekiliyor: ${countPerStep + 1} / ${maxPhotosPerStep}`);
                } else {
                    setStatusText('Lütfen başınızı sağa çevirin.');
                }
            } else if (step === 'left') {
                if (yaw >= 15 && yaw <= 50) {
                    inCorrectPosition = true;
                    setStatusText(`Soldan fotoğraf çekiliyor: ${countPerStep + 1} / ${maxPhotosPerStep}`);
                } else {
                    setStatusText('Lütfen başınızı sola çevirin.');
                }
            }

            setFaceDetected(inCorrectPosition);

            if (!inCorrectPosition) return false;

            setLastPhotoUri(imagePath);

            setPhotosByStep(prev => ({
                ...prev,
                [step]: imagePath,
            }));

            const newCount = countPerStep + 1;
            setCountPerStep(newCount);
            setPhotosCount(photosCount + 1);

            if (newCount >= maxPhotosPerStep) {
                if (step === 'front') {
                    setStep('right');
                    setCountPerStep(0);
                    setStatusText('Lütfen başınızı sağa çevirin.');
                } else if (step === 'right') {
                    setStep('left');
                    setCountPerStep(0);
                    setStatusText('Lütfen başınızı sola çevirin.');
                } else if (step === 'left') {
                    setStatusText('✔️ Tüm fotoğraflar başarıyla çekildi!');
                    Alert.alert('Doğrulama Başarılı', 'Yüzünüz başarıyla doğrulandı!');
                    setStarted(false);
                    Tts.speak('Tüm fotoğraflar başarıyla çekildi.');
                }
            }

            return true;

        } catch (error) {
            console.warn('Fotoğraf çekme veya yüz algılama hatası:', error);
            return false;
        }
    };

    useEffect(() => {
        let active = true;

        const captureLoop = async () => {
            console.log(photosCount);
            while (active && started && photosCount < 5) {
                await takePhotoIfHeadInPosition();
                await new Promise(resolve => setTimeout(resolve, 2500));
            }
        };

        if (started) {
            captureLoop();
        }

        return () => {
            active = false;
        };
    }, [started, photosCount, step]);

    if (!device || !hasPermission || !isFocused) {
        return <Text style={styles.center}>Kamera yükleniyor veya izin bekleniyor...</Text>;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, backgroundColor: '#fff' }}>
                    <TouchableOpacity style={[{ width: 30 }]} onPress={() => { onBack() }}>
                        <Ionicons name="arrow-back-outline" size={26} color="#000" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ backgroundColor: '#f2f2f2', flex: 1, height: 20, borderRadius: 10, marginEnd: 10 }}>
                            <View style={{ width: '100%', height: 20, backgroundColor: '#fa6400', borderRadius: 10 }}></View>
                        </View>
                        <Text>3/3</Text>
                    </View>
                </View>
                <Text style={styles.title}>Kimlik Belgenizi Yükleyin</Text>
                <Text style={styles.description}>
                    Hesabınızı doğrulamak ve güvenliğinizi sağlamak için geçerli belgenizin (Nüfus Cüzdanı, Pasaport, Ehliyet vb.) fotoğrafını yükleyin. Belgeleriniz gizlilikle korunacaktır.
                </Text>

                <View style={styles.cameraWrapper}>
                    <Camera
                        ref={cameraRef}
                        style={styles.camera}
                        device={device}
                        isActive={started}
                        photo={true}
                    />
                    <View
                        style={[
                            styles.faceOutlineOverlay,
                            { borderColor: faceDetected ? 'green' : 'red' },
                        ]}
                    />
                </View>

                <View style={styles.thumbnailsContainer}>
                    <View style={styles.thumbnailBox}>
                        <Text style={styles.thumbLabel}>Ön</Text>
                        {photosByStep.front ? (
                            <Image source={{ uri: photosByStep.front }} style={styles.thumbnail} />
                        ) : (
                            <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
                                <Image source={require('../../../../Assets/images/other/front.png')} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }}></Image>
                            </View>
                        )}
                    </View>
                    <View style={styles.thumbnailBox}>
                        <Text style={styles.thumbLabel}>Sağ</Text>
                        {photosByStep.right ? (
                            <Image source={{ uri: photosByStep.right }} style={styles.thumbnail} />
                        ) : (
                            <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
                                <Image source={require('../../../../Assets/images/other/left.png')} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }}></Image>
                            </View>
                        )}
                    </View>
                    <View style={styles.thumbnailBox}>
                        <Text style={styles.thumbLabel}>Sol</Text>
                        {photosByStep.left ? (
                            <Image source={{ uri: photosByStep.left }} style={styles.thumbnail} />
                        ) : (
                            <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
                                <Image source={require('../../../../Assets/images/other/Rieht.png')} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }}></Image>
                            </View>
                        )}
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.button, started && styles.buttonDisabled]}
                    onPress={() => {
                        if (!started) {
                            setPhotosCount(0);
                            setCountPerStep(0);
                            setStep('front');
                            setLastPhotoUri(null);
                            setPhotosByStep({ front: null, right: null, left: null });
                            setStatusText('Lütfen yüzünüzü kameraya çevirin');
                            setFaceDetected(false);
                            setStarted(true);
                            Tts.speak('Lütfen yüzünüzü kameraya çevirin.');
                        }
                    }}
                    disabled={started}
                >
                    <Text style={styles.buttonText}>{started ? 'Devam Ediliyor...' : 'Başla'}</Text>
                </TouchableOpacity>

                <Text style={styles.status}>{statusText}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        paddingTop: 5,
        alignItems: 'center',
    },
    progressBarBackground: {
        height: 8,
        width: '100%',
        backgroundColor: '#eee',
        borderRadius: 4,
        marginBottom: 8,
        position: 'relative',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#ff6600',
        borderRadius: 4,
    },
    progressText: {
        position: 'absolute',
        right: 10,
        top: -22,
        fontWeight: '600',
        color: '#333',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
        textAlign: 'center',
        color: '#000',
    },
    description: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
    },
    cameraWrapper: {
        width: 300,
        height: 300,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 15,
        position: 'relative',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    faceOutlineOverlay: {
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '80%',
        height: '80%',
        borderWidth: 4,
        borderRadius: 20,
        borderColor: 'red',
        zIndex: 10,
    },
    thumbnailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        marginBottom: 25,
    },
    thumbnailBox: {
        alignItems: 'center',
    },
    thumbLabel: {
        marginBottom: 6,
        fontWeight: '600',
        fontSize: 16,
        color: '#333',
    },
    thumbnail: {
        width: 90,
        height: 90,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        backgroundColor: '#f0f0f0',
    },
    thumbnailPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
    },
    placeholderText: {
        fontSize: 20,
        color: '#888',
    },
    button: {
        backgroundColor: '#ff6600',
        paddingVertical: 14,
        paddingHorizontal: 60,
        borderRadius: 30,
        marginBottom: 15,
    },
    buttonDisabled: {
        backgroundColor: '#ffa366',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
    },
    status: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 30,
        minHeight: 40,
    },
    center: {
        flex: 1,
        fontSize: 16,
        marginTop: 40,
        textAlign: 'center',
    },
});

export default TackFace;
