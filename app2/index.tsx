import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { store } from '../redux/Store';
import { Provider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './Routes';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  }
};

const Index = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

AppRegistry.registerComponent('CLM', () => Index);

export default Index;
