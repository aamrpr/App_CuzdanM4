import { View, Text } from 'react-native'
import React, { useState } from 'react'
import BarcodeScannerComponent from '../../Components/BarcodeScannerComponent';
import Transfer from './Transfer';
import Receive from './Receive';

const QrScanner = () => {
    const [DataQR, SetDataQR]: any = useState(null);
    return (
        <View style={{ flex: 1 }}>
            {DataQR ? <View style={{ flex: 1 }}>
                {
                    DataQR.T == "T" ?
                        <Transfer DataBarcode={DataQR}></Transfer>
                        :
                        <Receive DataBarcode={DataQR}></Receive>
                }
            </View>
                :
                <BarcodeScannerComponent OnReadBarcode={(data: any) => { SetDataQR(data); console.log(data, 'read Data Barcode') }}></BarcodeScannerComponent>
            }
        </View>
    )
}

export default QrScanner