import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825, // Default location (you can change to your preference)
    longitude: -122.4324,
    latitudeDelta: 0.0922,  // Initial zoom level
    longitudeDelta: 0.0421,
  });

  const [markerLocation, setMarkerLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerLocation({
      latitude,
      longitude,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={handleRegionChange}
        onPress={handleMapPress} // Press to set marker
      >
        <Marker
          coordinate={markerLocation}
          title="Selected Location"
          description={`${markerLocation.latitude}, ${markerLocation.longitude}`}
        />
      </MapView>
      <View style={styles.coordinates}>
        <Text>Latitude: {markerLocation.latitude.toFixed(6)}</Text>
        <Text>Longitude: {markerLocation.longitude.toFixed(6)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200
  },
  map: {
    flex: 1,
  },
  coordinates: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 5,
  },
});

export default Map;
