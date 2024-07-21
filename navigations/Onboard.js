import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IntroScreen } from '../screens/IntroScreen/IntroScreen';
import { StatusBar } from 'react-native';

const MyStack = createNativeStackNavigator();

const Onboard = () => {
  return (
    <NavigationContainer independent={true}>
      <StatusBar barStyle="dark-content" />
      <MyStack.Navigator initialRouteName="IntroScreen" screenOptions={{ headerShown: false }}>
        <MyStack.Screen name="IntroScreen" component={IntroScreen} />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default Onboard;
