import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { IntroScreen } from '../screens/IntroScreen/IntroScreen';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from "../screens/Main/MainScreen";
import { Login, EnterOtp, ForgotPassword, ResetPassword, SignUp } from "../screens/Auth";

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

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

const MainStackNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="MainScreen" component={MainScreen} />
  </MainStack.Navigator>
);

const AuthStackNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="EnterOtp" component={EnterOtp} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
  </AuthStack.Navigator>
);

export {Onboard, MainStackNavigator, AuthStackNavigator};
