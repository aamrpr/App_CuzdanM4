import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface Prop {
    Items: any[],
    Value?: any,
    onChange: Function
}
const InputSelect = ({ Items, Value, onChange }: Prop) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={{ zIndex: 1000, flex: 1, marginTop: 5 }}>
            <DropDownPicker
                open={open}
                value={Value}
                items={Items}
                setValue={(e) => { onChange(e); }}
                setOpen={setOpen}
                onChangeValue={() => { }}
                searchContainerStyle={{ borderColor: '#f2f2f2', borderWidth: 0 }}
                containerStyle={{ borderColor: '#f2f2f2', borderWidth: 0 }}
                selectedItemContainerStyle={{ borderColor: '#f2f2f2', borderWidth: 0 }}
                disableBorderRadius={true}
                modalContentContainerStyle={{ borderColor: '#f2f2f2', borderWidth: 0 }}
                dropDownContainerStyle={{ borderColor: '#f2f2f2', borderWidth: 1 }}
                style={{ borderColor: '#f2f2f2', borderRadius: 5, height: 10 }}
                placeholder="Select Countries"
            />
        </View>
    );
}

export default InputSelect