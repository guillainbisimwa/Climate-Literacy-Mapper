import { useDispatch, useSelector } from "react-redux";
import { Block, Text } from "../../components"
import { logoutUser } from "@/redux/authReducer";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const MainScreen = ({ navigation }) => {
    const { error, isLoading, success, user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    // Use useEffect or any other method to handle the success state and display the alert
    useEffect(() => {
        checkLoginStatus();
        if (error && !success) {
            console.log("====>", error);
            // Toast.warn("Verifier votre internet!", 'top');

            Toast.error("An error has occurred", 'top');
            setValid(false);
            setPasswordError(true)

        }
    }, []);

    const checkLoginStatus = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            console.log("value main", value)
            if (value == null) {
                console.log(navigation);

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }
        } catch (error) {
            console.log('Error retrieving installation status:', error);
            Toast.error("An error has occurred!!", 'top');
        }
    };

    const handleLogout = async () => {

        dispatch(logoutUser());

        navigation.navigate('Login');
    };

    return <Block>
        <Text>MAINScreen SCREEN</Text>
        <Button onPress={handleLogout}  >LOGOUT</Button>

    </Block>
}

export default MainScreen
