import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import InitialLoader from '../screens/InitialLoader';
import Onboard from '../navigations/Onboard';
import AsyncStorage from  "@react-native-community/async-storage";


import { setInstalled, setUnInstalled } from '../redux/appReducer';
import { StatusBar } from 'react-native';

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
  // const u = useSelector((state) => state?.user);


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
        <StatusBar style="auto" />

        {/* <Stack.Navigator initialRouteName={'MyDrawer'}>
          <Stack.Screen
            name="Main"
            component={MyDrawer}
            options={{
              headerShown: false,
              initialParams: { guy: "l" }, // Pass the value as initialParams
            }}
          />
          

        </Stack.Navigator>*/}
      </NavigationContainer>
    );
  } else if (!isInstalled) {
    return <Onboard />;
  }
  return <InitialLoader />;
};

export default App;
