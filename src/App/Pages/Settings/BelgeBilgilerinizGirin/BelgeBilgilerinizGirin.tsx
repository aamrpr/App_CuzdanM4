import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Start from './Start';
import UploadYourResidenceCertificate from './UploadYourResidenceCertificate';
import AddId from './AddId';
import TackFace from './TackFace';

const BelgeBilgilerinizGirin = () => {
    const [Status, SetStatus] = useState(0);
    if (Status == 0) {
        return <Start onNext={() => { SetStatus(1) }} />
    }
    else if (Status == 1) {
        return <UploadYourResidenceCertificate onNext={() => { SetStatus(2) }} onBack={() => { SetStatus(0) }} />
    }
    else if (Status == 2) {
        return <AddId onNext={() => { SetStatus(3) }} onBack={() => { SetStatus(1) }} />
    }
    else if (Status == 3) {
        return <TackFace onNext={() => { SetStatus(3) }} onBack={() => { SetStatus(2) }} />
    }
}

export default BelgeBilgilerinizGirin