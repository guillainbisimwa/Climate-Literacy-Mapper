import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, StatusBar } from 'react-native'; // Add this import
import { store } from '../redux/Store';
import { Provider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider} from  'react-native-paper'
import Routes from './Routes';

const theme = {
  ...DefaultTheme, 
  // roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#3498db',
    // accent: '#f1c40f'
  }
};

const Index2 = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <Routes />
      </PaperProvider>
    </Provider>
  );
};

AppRegistry.registerComponent('CLM', () => Index2); // Add this line

export default Index2;
