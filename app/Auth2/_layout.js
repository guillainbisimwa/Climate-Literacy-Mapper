import { Stack } from 'expo-router';

export default function Auth2Layout() {
  return (
    <Stack>
       <Stack.Screen name="Login" options={{ title: 'Login' }} />
       <Stack.Screen name="SignUp" options={{ title: 'SignUp' }} />
      </Stack>
  );
}
