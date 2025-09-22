import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';

import { BarChart } from 'react-native-chart-kit';
import Transactions from '../Home/Transactions';
import DatePicker from 'react-native-date-picker';
import api from '../../Services/api';

const screenWidth = Dimensions.get('window').width;




export default function HesapHareketleri() {
    const [activeTab, setActiveTab] = useState('Dikont');

    // States for Tab 2
    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
    });
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [clientName, setClientName]: any = useState();
    const [MacAmount, setMacAmount]: any = useState(null);
    const [MaxAmountNumber, setMaxAmountNumber]: any = useState(0);
    const [ChangeFilterIndex, SetChangeFilterIndex]: any = useState(0);

    const GetMonthlyMaxAmounts = async () => {
        let result = await api.ApiGetMonthlyMaxAmounts();
        if (result.error == 0) {
            setMacAmount(result.data);
            let d = JSON.parse(JSON.stringify(result.data.datasets[0].data));
            if (d.length !== 0) {
                try {
                    let dataC = d.sort((a: any, b: any) => b - a);
                    let n = dataC[0];
                    setMaxAmountNumber(n);
                } catch (error) {
                    setMaxAmountNumber(0);
                }

            }
        }
    }

    useEffect(() => {
        GetMonthlyMaxAmounts();
    }, []);
    return (
        <View style={styles.container}>
            {/* Header with Tabs */}
            <DatePicker
                modal
                open={showStartPicker}
                date={startDate}
                mode="date"
                onConfirm={(date) => {
                    setShowStartPicker(false);
                    setStartDate(date);
                }}
                onCancel={() => {
                    setShowStartPicker(false);
                }}
            />

            <DatePicker
                modal
                open={showEndPicker}
                date={endDate}
                mode="date"
                onConfirm={(date) => {
                    setShowEndPicker(false);
                    setEndDate(date);
                }}
                onCancel={() => {
                    setShowEndPicker(false);
                }}
            />
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Dikont' && styles.activeTab]}
                    onPress={() => setActiveTab('Dikont')}
                >
                    <Text style={[styles.tabText, activeTab === 'Dikont' && styles.activeTabText]}>Dikont </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Toplu Dikont' && styles.activeTab]}
                    onPress={() => setActiveTab('Toplu Dikont')}
                >
                    <Text style={[styles.tabText, activeTab === 'Toplu Dikont' && styles.activeTabText]}>Toplu Dikont</Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            {activeTab === 'Dikont' ? (
                <ScrollView style={{ padding: 10, flex: 1 }}>
                    <Text style={styles.totalIncomeTitle}>Top Income</Text>
                    <Text style={styles.totalIncomeAmount}>TL {MaxAmountNumber}</Text>

                    {MacAmount ? <BarChart
                        data={MacAmount}
                        width={screenWidth - 32}
                        height={220}
                        yAxisLabel="TL"
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(210, 105, 30, ${opacity})`, // chocolate color
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForBackgroundLines: {
                                strokeDasharray: '', // solid lines
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    /> : null}

                    <Text style={styles.historyHeader}>This Month</Text>
                    {/* Here you can add your transaction list for this tab */}
                    {/* Example item */}
                    <View style={styles.historyItem}>
                        <Transactions></Transactions>
                    </View>
                </ScrollView>
            ) : (
                <ScrollView style={{ padding: 10 }}>
                    {/* Filter Section */}
                    <View style={styles.filterSection}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
                                <Text style={styles.dateText}>Başlangıç: {startDate.toLocaleDateString()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
                                <Text style={styles.dateText}>Bitiş: {endDate.toLocaleDateString()}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.label}>name client</Text>
                            <TextInput
                                style={styles.input}
                                value={clientName}
                                onChangeText={setClientName}
                            />
                        </View>

                        <TouchableOpacity style={styles.filterButton} onPress={() => { SetChangeFilterIndex(ChangeFilterIndex + 1) }}>
                            <Text style={styles.filterButtonText}>Filter</Text>
                        </TouchableOpacity>
                    </View>

                    {/* History List */}
                    <Text style={styles.historyHeader}>History</Text>
                    <Transactions startDate={startDate} endDate={endDate} targetName={clientName} changeFilter={ChangeFilterIndex}></Transactions>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    tabsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#eee',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 12,
    },
    tabButtonText: {
        fontWeight: 'bold',
        color: '#777',
    },
    totalIncomeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#999',
    },
    totalIncomeAmount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#D2691E',
        marginBottom: 12,
    },

    filterSection: {
        backgroundColor: '#fff',
        padding: 16,
    },

    row: { flexDirection: 'row', justifyContent: 'space-between' },

    inputGroup: { flex: 1, marginRight: 10 },
    label: { color: '#777', fontWeight: '600', marginBottom: 4 },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },

    filterButton: {
        backgroundColor: '#D2691E',
        borderRadius: 50,
        marginTop: 20,
        paddingVertical: 14,
        alignItems: 'center',
    },
    filterButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

    periodButtons: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        backgroundColor: '#eee',
        borderRadius: 8,
        padding: 4,
    },
    periodButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    periodButtonSelected: {
        backgroundColor: '#fff',
    },
    periodButtonText: {
        fontWeight: 'bold',
        color: '#777',
    },
    periodButtonTextSelected: {
        color: '#D2691E',
    },

    historyHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    historyItem: {
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dateButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 8,
        marginHorizontal: 5,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        backgroundColor: '#ccc',
        borderRadius: 20,
        marginRight: 12,
    },
    historyName: {
        fontWeight: '600',
        fontSize: 16,
    },
    historyDate: {
        color: '#999',
        fontSize: 12,
    },
    historyAmount: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        backgroundColor: '#0001'
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        flex: 1,
    },
    activeTab: {
        backgroundColor: '#FF802C',
        borderColor: '#d57d47',
        flex: 1
    },
    tabText: {
        color: '#333',
        textAlign: 'center'
    },
    activeTabText: {
        color: '#fff',
        fontWeight: '600',
    },
});
