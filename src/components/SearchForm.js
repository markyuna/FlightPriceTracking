import {Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';

export default function SearchForm() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departDate, setDepartDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());

    const onSearchPress = () => {
        console.warn('Searching for: ', from);
    }

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Search the best price</Text>
        
            <TextInput 
                value={from}
                onChangeText={setFrom}
                placeholder='From' 
                style={styles.input} 
            />
            <TextInput
                value={to}
                onChangeText={setTo}
                placeholder='To' 
                style={styles.input}
            />

            <View style={styles.datePicker}>
                <Feather name="calendar" size={24} color="#2471A3" />
                <DateTimePicker 
                    value={departDate} 
                    onChange={(event, date) => setDepartDate(date || new Date())}
                    minimumDate={new Date()}
                />
                <Text style={{ fontSize: 20, color: '#2471A3', marginLeft: 10 }}>|  </Text>
                <DateTimePicker 
                    value={returnDate} 
                    onChange={(event, date) => setReturnDate(date || new Date())}
                    minimumDate={departDate}
                />
            </View>


            <Button title='Search' onPress={onSearchPress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        // Shadows
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
    },
    title: {
        alignSelf: 'center',
        fontWeight: '500',
        fontSize: 18,
        marginVertical: 15,
    },
    input: {
        backgroundColor: '#EAF2F8',
        borderWidth: 1,
        borderColor: '#2471A3',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
      },
      datePicker: {
        borderWidth: 1,
        borderColor: '#2471A3',
        padding: 5,
        borderRadius: 5,
        marginVertical: 5,
    
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

