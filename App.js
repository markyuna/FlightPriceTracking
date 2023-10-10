import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import SearchForm from './src/components/SearchForm';
import FlightOptionItem from './src/components/FlightOptionItem';
import { LinearGradient } from 'expo-linear-gradient';
import dummyData from './data.json';
import { useState } from 'react';
import { searchFlights } from './src/services/api';

export default function App() {
   const [items, setItems] = useState([]);
  // const [loading, setLoading] = useState(false);

  const onSearch = async (data) => {
    console.warn(data);

    // get items form the backend
    const response = await searchFlights(data);
    console.log(response);

    setItems(response.data);
  };

  return (
    <LinearGradient
      colors={['#A9CCE3', '#2451A7']}
      style={styles.container}
    >
      <SafeAreaView>
        <SearchForm onSearch={onSearch} />

        {/* <FlightOptionItem flight={option1} /> */}
        <FlatList
          data={items}
          renderItem={({ item }) => <FlightOptionItem flight={item} />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

      {/* <StatusBar style="auto" /> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
