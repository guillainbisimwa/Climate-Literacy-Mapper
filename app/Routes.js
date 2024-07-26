import React, { useEffect, useState } from 'react';
import { NavigationContainer,  DefaultTheme } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import InitialLoader from '../screens/InitialLoader';
import Onboard from '../navigations/Onboard';
import AsyncStorage from  "@react-native-async-storage/async-storage";
import MainScreen from "../screens/Main/MainScreen"

import { loginSuccess } from '../redux/authReducer';

import { setInstalled, setUnInstalled } from '../redux/appReducer';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {EnterOtp, ForgotPassword, Login, ResetPassword, SignUp} from "../screens/Auth"
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
  console.log("Is signed", isSignedIn);
  const Stack = createNativeStackNavigator();


  useEffect(() => {
    checkLoginStatus();
    setTimeout(() => setLoading(false), 2000);
    
    // AsyncStorage.clear();
    checkInstallationStatus();

  }, []);

  const checkInstallationStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isInstalled');
      console.log('installed', value);
      if (value !== null && value === 'true') {
        dispatch(setInstalled());
      } else {
        // setLoading(false);
        dispatch(setUnInstalled());
      }
    } catch (error) {
      console.log('Error retrieving installation status:', error);
      // setLoading(false);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      // AsyncStorage.clear();

      console.log('value-user', value);
      if (value !== null) {
        dispatch(loginSuccess(value));
      } else {
        //setLoading(false);
        //dispatch(setUnInstalled());
      }
    } catch (error) {
      console.log('Error retrieving installation status:', error);
    }
  };

  if (loading) {
    return <InitialLoader />;
  }
  if (isInstalled) {
    return (
      <NavigationContainer  independent={true} theme={theme}>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="EnterOtp" component={EnterOtp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (!isInstalled) {
    return <Onboard />;
  }
  return <InitialLoader />;
};

export default App;
