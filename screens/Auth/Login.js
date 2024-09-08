import React, { useEffect, useRef, useState } from 'react'
import {
    View, SafeAreaView, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet,
    TextInput, Pressable, TouchableOpacity, ScrollViewBase, Keyboard,
    Alert
} from 'react-native'
import { Button, } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';

import AsyncStorage from "@react-native-async-storage/async-storage";
import Container, { Toast } from 'toastify-react-native';
import { COLORS, FONTS } from '@/constants';
import { Block, Input, Text } from "@/components"
import SvgIcon from '../../assets/icons/SvgIcon';
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/userSlice';


const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const phoneInput = useRef(null);

    const { error, isLoading, success, user } = useSelector((state) => state.user);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [formattedValue, setFormattedValue] = useState("");
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [listenerError, setListenerError] = useState(false);


    // Use useEffect or any other method to handle the success state and display the alert
    useEffect(() => {
        checkLoginStatus();
        if (error && !success && listenerError) {
            console.log("====>", error);
            // Toast.warn("Verifier votre internet!", 'top');

            Toast.error("An error has occurred", 'top');
            setValid(false);
            setPasswordError(true)

        }
    }, [success, error]);

    const hasErrorKey = (obj) => {
        return obj && typeof obj === 'object' && 'error' in obj;
    }


    const checkLoginStatus = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            console.log("value login", value);

            if (value !== null) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainStack' }],
                });
            } else {
                //Toast.error("An error has occurred!!1", 'top')
                //console.log("error", error);
                //console.log("success", success);
            }
        } catch (error) {
            console.log('Error retrieving installation status:', error);
            Toast.error("An error has occurred!!", 'top');
        }
    };

    const handleSubmit = async () => {
        // Alert.alert("No Internet connection", "Please check your Internet connection and try again.");

        try {
            // Check internet connections
            // Keyboard.dismiss();
            const netInfo = await NetInfo.fetch();
            console.log("netInfo.isConnected", netInfo.isConnected);
            if (!netInfo.isConnected) {
                Alert.alert("No Internet connection", "Please check your Internet connection and try again.");
                return;
            }
            if (!password || !formattedValue) {
                // Alert.alert("Attention", "Veuillez completer tous les champs et réessayer.");
                Toast.error('Complete all fields, please', 'top');
                setPasswordError(true);
            } else {
                if (!valid) {
                    //setValid(false);
                    Toast.error('Incorrect phone number', 'top')
                    return
                }

                if (password.length < 3 || password.length > 20) {
                    setPasswordError(true);
                    Toast.error('Invalid password', 'top')
                    return
                } else {
                    setPasswordError(false);
                }

                // Handle login functionality
                dispatch(loginUser({ mobile: formattedValue, password }))
                    .then((result) => {
                        if (loginUser.fulfilled.match(result)) {
                            // Handle successful login
                            console.log('Login Successful:', result.payload);
                        } else if (loginUser.rejected.match(result)) {
                            // Handle rejected login
                            Toast.error(`Error: ${result.payload?.msg}`, 'top');
                        }
                    })
                    .catch((error) => {
                        // Handle any additional errors
                        console.error('Error during login:', error);
                        Toast.error(`Error during login:, ${error}`, 'top');
                    });
            }

        } catch (error) {
            // Alert.alert("Attention", "Error occurred during login.");
            console.error("Error occurred during login:", error);
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
            <Container position="top" style={{ width: '100%' }} duration={6000} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <View style={styles.loginIcon}>
                    <SvgIcon icon={'login'} width={300} height={300} />
                </View>
                <View style={styles.container}>
                    <View style={styles.loginLblCon}>
                        <Text style={styles.loginLbl}>Login</Text>
                    </View>

                    <View style={styles.formCon}>
                        <View style={styles.textBoxCon}>
                            <View style={styles.at}>
                                <SvgIcon icon={'phone'} width={10} height={10} />
                            </View>
                            <View style={styles.textCon}>
                                <PhoneInput
                                    ref={phoneInput}
                                    // defaultValue={value}
                                    defaultCode="CD"
                                    layout="first"
                                    onChangeText={(text) => {
                                        const checkValid = phoneInput.current?.isValidNumber(text);
                                        setValid(checkValid ? checkValid : false);
                                        setValue(text);
                                        // setLoad(false)
                                    }}
                                    onChangeFormattedText={(text) => {
                                        setFormattedValue(text);
                                    }}
                                    textContainerStyle={{
                                        backgroundColor: COLORS.white
                                    }}
                                    containerStyle={{
                                        // borderColor: valid ? COLORS.darkgreen : "transparent",
                                        // borderWidth: 2,
                                        width: '100%',
                                        borderBottomColor: COLORS.darkgray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                        borderLeftWidth: 0,
                                        borderRightWidth: 0,
                                        color: COLORS.black,
                                        fontSize: 16,
                                    }}

                                />

                            </View>
                        </View>

                        <View style={[styles.textBoxCon, { marginTop: 30 }]}>
                            <View style={styles.at}>
                                <SvgIcon icon={'lock'} width={20} height={20} />
                            </View>
                            <View style={[styles.passCon]}>
                                <View style={styles.textCon}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={'Password'}
                                        placeholderTextColor={COLORS.darkgray}
                                        secureTextEntry={true}
                                        onChangeText={setPassword}
                                    />
                                </View>
                                <View style={styles.show}>
                                    <SvgIcon icon={'show'} width={20} height={20} />
                                </View>
                            </View>
                        </View>

                        <View style={styles.forgotAction}>
                            <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
                                <Text style={styles.forgotLbl}>Forgot Password?</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.loginCon}>
                        <Button style={styles.LoginBtn} disabled={isLoading} mode="contained" loading={isLoading}
                            onPress={() => handleSubmit()}>
                            <Text style={styles.loginBtnLbl}>Login</Text>
                        </Button>
                    </View>
                    <View style={styles.deviderCon}>
                        <View style={styles.devider} />
                        <Text style={styles.or}>OR</Text>
                    </View>
                    <View style={styles.googleIconCon}>
                        <View style={styles.googleIcon}>
                            <SvgIcon icon={'google'} width={20} height={20} />
                        </View>
                        <View style={styles.googleLblCon}>
                            <TouchableOpacity >
                                <Text style={styles.googleLbl}>Login with Google</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.registerCon}>
                        <Text style={styles.registerNew}>New User? </Text>
                        <Pressable onPress={() => navigation.navigate("SignUp")}>
                            <Text style={styles.registerLbl}>Register</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // paddingHorizontal: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
    },
    mainCon: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    loginIcon: {
        alignSelf: 'center',
    },
    formCon: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    loginLblCon: {
        position: 'relative',
        bottom: 40,
    },
    loginLbl: {
        color: COLORS.black,
        fontSize: 40,
        //fontFamily: Fonts.type.NotoSansExtraBold,
    },
    at: {
        alignSelf: 'center',
        width: '10%',
    },
    show: {
        alignSelf: 'center',
        width: '10%',
        position: 'relative',
        right: 20,
        zIndex: 10,
    },
    textBoxCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textCon: {
        width: '90%',
    },
    passCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInput: {
        borderBottomColor: COLORS.darkgray,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        color: COLORS.black,
        fontSize: 16,
        //fontFamily: Fonts.type.NotoSansMedium,
        height: 40,
    },
    forgotAction: {
        paddingVertical: 20,
    },
    registerCon: { flexDirection: 'row', justifyContent: 'center', paddingTop: 10 },
    //registerLbl: {color: '#0057ff', fontFamily: Fonts.type.NotoSansSemiBold},
    registerNew: {
        color: COLORS.darkgray,
        //fontFamily: Fonts.type.NotoSansSemiBold,
    },
    forgotLbl: {
        color: '#0057ff',
        textAlign: 'right',
        //fontFamily: Fonts.type.NotoSansSemiBold,
    },
    registerLbl: {
        color: '#0057ff',
        textAlign: 'right',
    },

    LoginBtn: {
        // backgroundColor: '#0057ff',
        borderRadius: 20,
    },
    loginBtnLbl: {
        textAlign: 'center',
        fontSize: 16,
        //fontFamily: Fonts.type.NotoSansBlack,
        color: COLORS.white,
        paddingVertical: 10,
    },
    devider: {
        borderBottomColor: COLORS.darkgray,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 20,
    },
    or: {
        color: COLORS.darkgray,
        textAlign: 'center',
        backgroundColor: COLORS.white,
        width: 60,
        alignSelf: 'center',
        //fontFamily: Fonts.type.NotoSansSemiBold,
        position: 'relative',
        bottom: 13,
    },
    deviderCon: {
        paddingVertical: 10,
    },
    googleIconCon: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 20,
        paddingHorizontal: 30,
    },
    googleLbl: {
        color: COLORS.black,
        textAlign: 'center',
        paddingHorizontal: 30,
        // afontFamily: Fonts.type.NotoSansBlack,
    },
});

export default Login;
