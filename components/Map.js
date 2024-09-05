import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'; // Slider for adjusting circle radius
import MapView, { Circle } from 'react-native-maps';
import Slider from '@react-native-community/slider';
import Block from './Block';

// Custom map style to show only countries (no rivers, roads, etc.)
const mapStyle2= [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "landscape",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];
  
const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#ebe3cd' }],
  },
  {
    elementType: 'labels',
    stylers: [{ visibility: 'off' }], // Hide labels for rivers and other features
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#c9b2a6' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }], // Show country borders
  },
];

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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -1.2921, // Centered in Africa (Kenya as an example)
          longitude: 36.8219,
          latitudeDelta: 10.0, // Initial zoom to show a larger region
          longitudeDelta: 10.0,
        }}
        customMapStyle={mapStyle2} // Apply custom style for countries only
        onPress={handleMapPress} // User taps to set the circle
      >
        {circle && (
          <Circle
            center={circle.center}
            radius={circle.radius}
            strokeColor="rgba(0,150,0,0.8)" // Circle border color (green)
            fillColor="rgba(0,150,0,0.3)" // Circle fill color (semi-transparent green)
          />
        )}
      </MapView>

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
        <Block row >
        <Text>Adjust Radius:</Text>
        <Text>{(radius / 1000).toFixed(2)} km</Text>
        </Block>
        <Slider
          minimumValue={80000} // Minimum radius (50 km)
          maximumValue={800000} // Maximum radius (500 km)
          step={10000} // Increment of 10 km
          value={radius}
          onValueChange={handleRadiusChange}
        />
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400
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
