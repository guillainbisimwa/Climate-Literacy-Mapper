import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'; // Slider for adjusting circle radius
// import MapView, { Circle } from 'react-native-maps';
// import Slider from '@react-native-community/slider';
import Block from './Block';

const Map = () => {
  const [circle, setCircle] = useState(null); // Holds circle data
  const [radius, setRadius] = useState(100000); // Circle radius in meters (default 100km)

  // Handle user tapping on the map
  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    // Update circle center location
    setCircle({
      center: {
        latitude,
        longitude,
      },
      radius,
    });
  };

  // Handle radius change via slider
  const handleRadiusChange = (value) => {
    setRadius(value);
    if (circle) {
      setCircle({ ...circle, radius: value }); // Update circle radius dynamically
    }
  };

  return (
    <View style={styles.container}>
      {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: -1.2921, // Centered in Africa (Kenya as an example)
          longitude: 16.8219,
          latitudeDelta: 90.0, // Initial zoom to show a larger region
          longitudeDelta: 10.0,
        }}
        // customMapStyle={mapStyle2} // Apply custom style for countries only
        onPress={handleMapPress} // User taps to set the circle
      >
        {circle && (
          <Circle
            center={circle.center}
            radius={circle.radius}
            strokeColor="rgba(150,0,0,0.8)" // Circle border color (green)
            fillColor="rgba(150,0,0,0.4)" // Circle fill color (semi-transparent green)
          />
        )}
      </MapView> */}

      {/* Display selected location's coordinates and radius */}
      {/* {circle && (
        <View style={styles.infoBox}>
          <Text>Latitude: {circle.center.latitude.toFixed(6)}</Text>
          <Text>Longitude: {circle.center.longitude.toFixed(6)}</Text>
          <Text>Radius: {(circle.radius / 1000).toFixed(2)} km</Text>
        </View>
      )} */}

      {/* Slider for adjusting the circle radius */}
      <View style={styles.sliderContainer}>
        <Block row space="between" >
          <Text>Adjust Radius:</Text>
          <Text>{(radius / 1000).toFixed(2)} km</Text>
        </Block>
        {/* <Slider
          minimumValue={80000} // Minimum radius (50 km)
          maximumValue={800000} // Maximum radius (500 km)
          step={1000} // Increment of 10 km
          value={radius}
          onValueChange={handleRadiusChange}
        /> */}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: 400
  },
  map: {
    flex: 1,
  },
  infoBox: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    bottom: 70,
    left: 10,
    right: 10,
    borderRadius: 5,
  },
  sliderContainer: {
    padding: 10,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
  },
});

export default Map;
