import React, { useEffect, useState } from 'react';
import { enableSreens } from 'react-native-screens';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import InitialLoader from '../screens/InitialLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../redux/authReducer';
import { setInstalled, setUnInstalled } from '../redux/appReducer';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboard, MainStackNavigator, AuthStackNavigator } from '../navigations';
import { logoutUser } from '@/redux/userSlice';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

// useEffect(() => {
// const prepare = async () => {
//   try {
//     await Font.loadAsync({
//       "black": require("./assets/fonts//Roboto-Black.ttf"),
//       "blackItalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
//       "bold": require("./assets/fonts/Roboto-Bold.ttf"),
//       "boldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
//       "italic": require("./assets/fonts/Roboto-Italic.ttf"),
//       "light": require("./assets/fonts/Roboto-Light.ttf"),
//       "lightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
//       "medium": require("./assets/fonts/Roboto-Medium.ttf"),
//       "mediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
//       "regular": require("./assets/fonts/Roboto-Regular.ttf"),
//       "thin": require("./assets/fonts/Roboto-Thin.ttf"),
//       "thinItalic": require("./assets/fonts/Roboto-ThinItalic.ttf"),
//     });
//   }
//   catch (error) {
//     console.log.error();
//   }
//   finally {
//     setAppIsLoaded(true);
//   }
// };

// prepare();
// }, []);


const RootStack = createNativeStackNavigator();


const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isInstalled = useSelector((state) => state.app.isInstalled);
  const isSignedIn = useSelector((state) => state.auth.user);
  console.log("========", isSignedIn);

  useEffect(() => {
    // AsyncStorage.clear();
    checkLoginStatus();
    // setLoading(false)
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
      // AsyncStorage.clear();
      const value = await AsyncStorage.getItem('user');
      console.log("--------value", value);
      if (value !== null) {
        user = {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmE3ODNmMjVhMzQyNjE4ZmVjZTA3MGIiLCJlbWFpbCI6Imd1eUBleGFtcGxlLmNvbSIsIm5hbWUiOiJHdXkgIiwibW9iaWxlIjoiKzI0Mzg5MTk3OTAxOCIsInByb2ZpbGVfcGljIjoiaHR0cDovL2V4YW1wbGUuY29tL3Byb2ZpbGUuanBnIiwiaWF0IjoxNzI1MDE0NjEwLCJleHAiOjE3MjUxMDEwMTB9.QG2KE-NganefXQpAUQskuCXl6or0lEAVIfnNrN6V42s", 
          "user": {"email": "guy@example.com", "mobile": "+243891979018",
             "name": "Guy WEZA ", "profile_pic": "http://example.com/profile.jpg", 
             "userId": "66a783f25a342618fece070b"}}

        // dispatch(loginSuccess(user));
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
    <NavigationContainer independent theme={theme}>
      <StatusBar barStyle="dark-content" />
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
    </NavigationContainer>
  );
};

export default App;
