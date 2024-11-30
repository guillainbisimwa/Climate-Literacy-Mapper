import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '../redux/Store';
import { PaperProvider  } from 'react-native-paper';

import { useColorScheme } from '@/components/useColorScheme';
import { StatusBar } from 'expo-status-bar';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    }
  };

  return (
    <Provider store={store}>
       {/* theme={colorScheme === 'dark' ? DarkTheme : theme} */}
      <PaperProvider >
     
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
         {/* <Stack.Screen name="(Auth2)" options={{ headerShown: false }} />  */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Login"  options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        <Stack.Screen name="Auth" options={{ title: 'Auth' }} />
        <Stack.Screen name="MainScreen" options={{ title: 'MainScreen' }} />
      </Stack>
    </PaperProvider>
    </Provider>
  );
}
