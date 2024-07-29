import React from 'react';
import { IntroScreen } from '../screens/IntroScreen/IntroScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainScreen, ProfileScreen } from "../screens/Main/";
import { Login, EnterOtp, ForgotPassword, ResetPassword, SignUp } from "../screens/Auth";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { CommonActions } from '@react-navigation/native';
import { Text, BottomNavigation } from 'react-native-paper';
import { COLORS } from '@/constants';
import {CustomTab} from '../components'

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const OnboardStack = createNativeStackNavigator();

const Onboard = () => (
  <OnboardStack.Navigator initialRouteName="IntroScreen" screenOptions={{ headerShown: false }}>
    <OnboardStack.Screen name="IntroScreen" component={IntroScreen} />
  </OnboardStack.Navigator>
);


const MainStackNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTab {...props} />}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Main"
      component={MainScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => <Icon name="account" size={size} color={color} />,
      }}
    />
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
