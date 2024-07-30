import { useDispatch, useSelector } from "react-redux";
import { Block, Text } from "../../components"
import { logoutUser } from "@/redux/authReducer";
import { Avatar, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { COLORS, SIZES } from "@/constants";
import { Image, StyleSheet } from "react-native";

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

    return <Block flex style={{ position: "relative",}}>
        <Block paddingBottom={60} padding={30} middle row space="between" color={COLORS.primary}>
            <Block>
                <Text white >Good morning </Text>
                <Text bold h2 white >Full Name </Text>
            </Block>
            <Avatar.Icon size={54} icon="account-circle" />
        </Block>
        <Block center padding={[30, 10, 30, 10]} row
            space="between" color={COLORS.white} card shadow style={{
                width: '90%',
                position: "relative", left: '2.5%', top: -30
            }}
        >
            <Block>
                <Text gray>
                    Start your QUIZ
                </Text>
                <Text bold h3>Climate Literacy Mapper</Text>
            </Block>
            <Avatar.Icon size={54} icon="account-circle" />

        </Block>

            <Block margin={20} padding={40} card shadow color={COLORS.yellow} >
                <Text center bold>
                    Do you know people from other tribes that would like to participate in this exercise?
                </Text>


                <Button style={{marginTop: 15}}  mode="outlined" >Invite a friend</Button>
                <Image
                    source={{ uri: 'https://deep-image.ai/_next/static/media/app-info-deepimage.a6eea05d.webp' }}
                    style={[styles.profileImage, styles.profileImageLeft]}
                />
                <Image
                    source={{ uri: 'https://deep-image.ai/_next/static/media/app-info-deepimage.a6eea05d.webp' }}
                    style={[styles.profileImage, styles.profileImageBottomRight]}
                />
        </Block>
        <Block  >

        </Block>
    </Block>
};


const styles = StyleSheet.create({
    
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      position: 'absolute',
    },
    profileImageLeft: {
      top: -10,
      left: -10,
    },
    profileImageBottomRight: {
      bottom: -10,
      right: -10,
    },
  });
  

export default MainScreen
