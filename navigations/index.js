import React from 'react';
import { IntroScreen } from '../screens/IntroScreen/IntroScreen';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainScreen, ProfileScreen } from "../screens/Main/";
import { Login, EnterOtp, ForgotPassword, ResetPassword, SignUp } from "../screens/Auth";

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const OnboardStack = createNativeStackNavigator();

const Onboard = () => (
  <OnboardStack.Navigator initialRouteName="IntroScreen" screenOptions={{ headerShown: false }}>
    <OnboardStack.Screen name="IntroScreen" component={IntroScreen} />
  </OnboardStack.Navigator>
);

const MainStackNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Main" component={MainScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AuthStackNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="EnterOtp" component={EnterOtp} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
    <AuthStack.Screen name="MainStack" component={MainStackNavigator} />
  </AuthStack.Navigator>
);

export { Onboard, MainStackNavigator, AuthStackNavigator };
