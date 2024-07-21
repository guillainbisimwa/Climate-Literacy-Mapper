import React from 'react';
import { View, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native';
//import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rounded: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
    position: 'absolute',
  },
  bg: {
    width: '100%',
    height: '100%',
  },
});

const InitialLoader = () => (
  <ImageBackground source={require('../assets/images/splash.png')} style={styles.bg}>
    <View style={styles.container}>
      <View style={styles.rounded}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <ActivityIndicator style={{ paddingTop: 20 }} size={30} color={COLORS.white} />
      </View>
    </View>
  </ImageBackground>
);

export default InitialLoader;
