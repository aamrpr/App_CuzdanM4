import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Button } from 'react-native';
import api from '../Services/api';
import { requestCameraPermission } from '../Services/Permissions';
import QRCodeScanner from 'react-native-qrcode-scanner';

const { width } = Dimensions.get('window');
const scanBoxSize = width * 0.8;

interface Prop {
  OnReadBarcode: (data: any) => void;
}

const BarcodeScannerComponent = ({ OnReadBarcode }: Prop) => {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [barcodeScanned, setBarcodeScanned] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const ApiChickQR = async (QR: string) => {
    let result = await api.ApiChickQR(QR);
    return result;
  };

  const handleBarcode = async (event: any) => {
    if (!scanning || barcodeScanned) return;

    const barcodeValue = event.data;  // البيانات القادمة من QR

    if (barcodeValue) {
      setScanning(false);
      setBarcodeScanned(true);
      setResult(barcodeValue);

      try {
        const resultChickQR = await ApiChickQR(barcodeValue);
        if (resultChickQR.error === 0) {
          OnReadBarcode(resultChickQR.data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (e) {
        console.log('QR Check Error:', e);
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      {scanning ? (
        <QRCodeScanner
          onRead={handleBarcode}
          cameraStyle={{ width: '100%', borderRadius: 10, overflow: 'hidden', borderColor: '#FF802C', borderWidth: 2 }}
          reactivate={true}
          showMarker={true}
          markerStyle={{ borderRadius: 10 }}
          containerStyle={{ borderRadius: 10 }}
          cameraContainerStyle={{ borderRadius: 10 }}

        />
      ) : result ? (
        <View style={styles.overlayResult}>
          <ActivityIndicator size={80} color="#fff" />
        </View>
      ) : null}

      {error && (
        <View style={styles.resultContainer}>
          <Text style={styles.errorText}>❌ Barkod geçersiz, lütfen tekrar deneyin.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlayResult: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0007',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    borderRadius: 10,
  },
  errorText: {
    color: '#f00',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  centerText: {
    fontSize: 18,
    padding: 16,
    textAlign: 'center',
  }
});

export default BarcodeScannerComponent;
