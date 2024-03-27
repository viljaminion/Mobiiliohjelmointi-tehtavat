 
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { APIKEY } from './salaisuuksia';


export default function App() {
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
 

  const [location, setLocation] = useState(null);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to get location');
      return;
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setLocation(location);
    console.log('Location:', location);
    const { latitude, longitude } = location.coords;
    const newRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    };
    setMapRegion(newRegion);
  }

  useEffect(() => {
    getLocation();
  }, []);

  const showLocation = async () => {
    const response = await fetch(`https://geocode.maps.co/search?q=${address}&api_key=${APIKEY}`);
    const data = await response.json();

    console.log(data);

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      const newRegion = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      };
      setCoords({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      setMapRegion(newRegion);
    } else {
      Alert.alert('Error, address not found');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Show" onPress={showLocation} />
      {mapRegion && (
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          region={mapRegion}
          onRegionChange={setMapRegion}
          showsUserLocation={true}
        >
          {coords && <Marker coordinate={coords} />}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  map: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
});
