import React, { useEffect, useState } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import InitialLoader from '../screens/InitialLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../redux/authReducer';
import { setInstalled, setUnInstalled } from '../redux/appReducer';
import { IntroScreen } from '../screens/IntroScreen/IntroScreen';
import { logoutUser } from '@/redux/userSlice';
import Main from './Main';
import Auth from './Auth';
import Login from './Login';
import { Platform, StatusBar } from 'react-native';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isInstalled = useSelector((state) => state.app.isInstalled);
  const isSignedIn = useSelector((state) => state.auth.user);
  
  console.log("========?", isSignedIn);

  const statusBarHeight = StatusBar.currentHeight || (Platform.OS === 'ios' ? 20 : 0);


  useEffect(() => {
   // clearAll()
    checkLoginStatus();
    setTimeout(() => setLoading(false), 2000);
    checkInstallationStatus();
  }, []);

  clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        dispatch(loginSuccess(JSON.parse(value)));
      } else {
        dispatch(logoutUser());
      }
    } catch (error) {
      console.log('Error retrieving login status:', error);
    }
  };

  const checkInstallationStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isInstalled');
      if (value !== null) {
        dispatch(setInstalled());
      } else {
        dispatch(setUnInstalled());
      }
    } catch (error) {
      console.log('Error retrieving installation status:', error);
    }
  };

  if (loading) {
    return <InitialLoader />;
  }

  return (
<>
<StatusBar barStyle="dark-content" />
    {isInstalled ? (
      isSignedIn ? (
        
        <Main />
      ) : (
        <Login />
      )
    ) : (
      <IntroScreen />
    )}
</>
  );
}