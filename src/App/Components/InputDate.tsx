import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
interface Prop {
    onchange: Function,
    value: any
}
const InputDate = ({ onchange, value }: Prop) => {
    const [birthDate, setBirthDate] = React.useState(new Date(value));
    const [showPicker, setShowPicker] = React.useState(false);

    useEffect(() => {
        setBirthDate(new Date(value));
    }, [value]);

    const onChange = (event: any, selectedDate?: Date) => {
        setShowPicker(Platform.OS === 'ios'); // تبقى مفتوحة في iOS
        if (selectedDate) {
            setBirthDate(selectedDate);
            onchange(selectedDate);
        }
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0]; // YYYY-MM-DD
    };
    return (
        <View style={{ width: '100%', marginTop: 10 }}>
            <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={{
                    borderRadius: 5,
                    borderColor: '#c1c1c1',
                    borderBottomWidth: 1,
                    padding: 10,
                }}
            >
                <Text>{formatDate(birthDate)}</Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={birthDate}
                    mode="date"
                    display="spinner"
                    maximumDate={new Date("2010-12-31")}
                    onChange={onChange}
                />
            )}
        </View>
    )
}

export default InputDate