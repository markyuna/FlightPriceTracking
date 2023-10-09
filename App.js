import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import SearchForm from './src/components/SearchForm';
import FlightOptionItem from './src/components/FlightOptionItem';
import { LinearGradient } from 'expo-linear-gradient';
import data from './data.json';
import { useState } from 'react';
const option1 = data[0];

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async (data) => {
    setLoading(true);
    setItems([]);

    // get items form the backend
    const response = await searchFlights(data);

    setItems(response.data);
    setLoading(false);
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
          data={data}
          renderItem={({ item }) => <FlightOptionItem flight={item} />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
