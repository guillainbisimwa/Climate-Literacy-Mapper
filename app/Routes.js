import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import InitialLoader from '../screens/InitialLoader';
import {Onboard, MainStackNavigator, AuthStackNavigator} from '../navigations';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess } from '../redux/authReducer';
import { setInstalled, setUnInstalled } from '../redux/appReducer';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isInstalled = useSelector((state) => state.app.isInstalled);
  const isSignedIn = useSelector((state) => state?.user);

  useEffect(() => {
    checkLoginStatus();
    setTimeout(() => setLoading(false), 2000);
    checkInstallationStatus();
  }, []);

  const checkInstallationStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isInstalled');
      if (value !== null && value === 'true') {
        dispatch(setInstalled());
      } else {
        dispatch(setUnInstalled());
      }
    } catch (error) {
      console.log('Error retrieving installation status:', error);
    }
  };

  const checkLoginStatus = async () => {
    try {
      AsyncStorage.clear();
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        dispatch(loginSuccess(value));
      }
    } catch (error) {
      console.log('Error retrieving login status:', error);
    }
  };

  if (loading) {
    return <InitialLoader />;
  }

  return (
    <NavigationContainer independent={true} theme={theme}>
      <StatusBar barStyle="dark-content" />
      {isInstalled ? (
        isSignedIn ? <MainStackNavigator /> : <AuthStackNavigator />
      ) : (
        <Onboard />
      )}
    </NavigationContainer>
  );
};

export default App;
