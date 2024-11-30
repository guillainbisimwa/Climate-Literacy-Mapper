import React, { useEffect, useState } from 'react';
import { DefaultTheme, StatusBar } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import InitialLoader from '../screens/InitialLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../redux/authReducer';
import { setInstalled, setUnInstalled } from '../redux/appReducer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboard, MainStackNavigator, AuthStackNavigator } from '../navigations';
import { logoutUser } from '@/redux/userSlice';

const RootStack = createNativeStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isInstalled = useSelector((state) => state.app.isInstalled);
  const isSignedIn = useSelector((state) => state.auth.user);
  console.log("========", isSignedIn);

  useEffect(() => {
    checkLoginStatus();
    setTimeout(() => setLoading(false), 4000);
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
      const value = await AsyncStorage.getItem('user');
      console.log("--------value", value);
      if (value !== null) {
        dispatch(loginSuccess(value));
      } else {
        dispatch(logoutUser())
      }
    } catch (error) {
      console.log('Error retrieving login status:', error);
    }
  };

  if (loading) {
    return <InitialLoader />;
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isInstalled ? (
        isSignedIn ? (
          <RootStack.Screen name="MainStack" component={MainStackNavigator} />
        ) : (
          <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        )
      ) : (
        <RootStack.Screen name="Onboard" component={Onboard} />
      )}
    </RootStack.Navigator>
  );
};

export default App;
