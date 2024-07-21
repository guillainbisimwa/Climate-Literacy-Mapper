import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, StatusBar } from 'react-native'; // Add this import
import { store } from '../redux/Store';
import { Provider } from 'react-redux';
import Routes from './Routes';

const Index = () => {
  return (
    <Provider store={store}>
      {/* <StatusBar style="auto" /> */}
      <StatusBar barStyle="dark-content" />
      <Routes />
    </Provider>
  );
};

AppRegistry.registerComponent('CLM', () => Index); // Add this line

export default Index;
