import React, { useEffect, useRef, useState } from 'react'
import { View, SafeAreaView, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollViewBase, Alert } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import Container, { Toast } from 'toastify-react-native';
import { COLORS, FONTS } from '@/constants';
import { Block, Input, Text } from "@/components"
import SvgIcon from '../../assets/icons/SvgIcon';
import PhoneInput from 'react-native-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import { Button } from 'react-native-paper';
import { loginUser, signUpUser } from '@/redux/userSlice';


// const hasErrorKey = (obj) => {
//     return obj && typeof obj === 'object' && 'error' in obj;
// }



const SignUp = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const dispatch = useDispatch();
    const phoneInput = useRef(null);

    const { user, errorSignUp, isLoadingSignUp, successSignUp, error, isLoading } = useSelector((state) => state.user);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [formattedValue, setFormattedValue] = useState("");
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [role, setRole] = useState('user');


    const getData = async () => {
        const value = await AsyncStorage.getItem('userToken');
        console.log(value, "VALUE SIGNUP", user);
        if (value !== null) {
            navigation.navigate("MainStack")
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'MainStack' }],
            //   });
        }
    }


    useEffect(() => {
        getData();
    }, [])

    const handleSubmit = async () => {
        try {
            // Check internet connections
            // Keyboard.dismiss();
            const netInfo = await NetInfo.fetch();
            console.log("netInfo.isConnected", netInfo.isConnected);
            if (!netInfo.isConnected) {
                Alert.alert("No Internet connection", "Please check your Internet connection and try again.");
                return;
            }
            if (!password || !formattedValue || !fullName) {
                // Alert.alert("Attention", "Veuillez completer tous les champs et réessayer.");
                Toast.error('Complete all fields, please', 'top');
                setPasswordError(true);
            } else {
                if (!valid) {
                    //setValid(false);
                    Toast.error('Incorrect phone number', 'top')
                    return
                }
                if (password !== confirmPassword) {
                    setPasswordError(true);
                    Toast.error("Password doesn't match", 'top')
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
                dispatch(
                    signUpUser({
                        name: fullName,
                        email: "",
                        password,
                        mobile: formattedValue,
                        role,
                        cover_url: '',
                        profile_pic: '',
                    })
                )
                    .then((result) => {
                        if (signUpUser.fulfilled.match(result)) {
                            // Handle successful sign up
                            console.log('Sign up Successful:', result.payload);
                            dispatch(loginUser({ mobile: formattedValue, password }))

                        } else if (signUpUser.rejected.match(result)) {
                            // Handle rejected sign up
                            Toast.error(`Error: ${result.payload?.error}`, 'top');
                        }
                    })
                    .catch((error) => {
                        // Handle any additional errors
                        console.error('Error during sign up:', error);
                        Toast.error(`Error during signing up:, ${error}`, 'top');
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
                    <SvgIcon icon={'signup'} width={300} height={300} />
                </View>
                <View style={styles.container}>
                    <View style={styles.loginLblCon}>
                        <Text style={styles.loginLbl}>Sign up</Text>
                    </View>
                    <View style={styles.formCon}>
                        <View style={styles.textBoxCon}>
                            <View style={styles.at}>
                                <SvgIcon icon={'phone'} width={20} height={20} />
                            </View>
                            <View style={styles.textCon}>
                                <PhoneInput
                                    ref={phoneInput}
                                    // defaultValue={value}
                                    defaultCode="KE"
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
                                <SvgIcon icon={'user'} width={20} height={20} />
                            </View>
                            <View style={styles.textCon}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={'Full Name'}
                                    placeholderTextColor={'#aaa'}
                                    onChangeText={setFullName}
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


                        <View style={[styles.textBoxCon, { marginTop: 30 }]}>
                            <View style={styles.at}>
                                <SvgIcon icon={'lock'} width={20} height={20} />
                            </View>
                            <View style={[styles.passCon]}>
                                <View style={styles.textCon}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={'Confirm password'}
                                        placeholderTextColor={COLORS.darkgray}
                                        secureTextEntry={true}
                                        onChangeText={setConfirmPassword}
                                    />
                                </View>
                                <View style={styles.show}>
                                    <SvgIcon icon={'show'} width={20} height={20} />
                                </View>
                            </View>
                        </View>


                        <View style={styles.termsCon}>
                            <Text style={styles.termsBy}>
                                By signing up, you're agree to our{' '}
                            </Text>
                            <Pressable
                            >
                                <Text style={styles.termLbl}>Terms & Conditions </Text>
                            </Pressable>
                            <Text style={styles.termsBy}> and </Text>
                            <Pressable
                            >
                                <Text style={styles.termLbl}>Privacy Policy</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.loginCon}>
                        <Button style={styles.LoginBtn} disabled={isLoadingSignUp} mode="contained" loading={isLoadingSignUp}
                            onPress={() => handleSubmit()}>
                            <Text style={styles.loginBtnLbl}>Create your account</Text>
                        </Button>

                    </View>

                    <View style={styles.registerCon}>
                        <Text style={styles.registerNew}>Joined us before? </Text>
                        <Pressable onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.registerLbl}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({

    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
    },
    mainCon: {
        backgroundColor: '#fff',
        flex: 1,
    },
    loginIcon: {
        alignSelf: 'center',
    },
    formCon: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    container: {
        paddingHorizontal: 20,
    },
    loginLblCon: {
        position: 'relative',
        bottom: 40,
    },
    loginLbl: {
        color: '#000',
        fontSize: 40,
        // fontFamily: Fonts.type.NotoSansExtraBold,
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
        borderBottomColor: '#aaa',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        color: '#000',
        fontSize: 16,
        // fontFamily: Fonts.type.NotoSansMedium,
        height: 40,
    },
    forgotAction: {
        paddingVertical: 20,
    },
    registerCon: { flexDirection: 'row', justifyContent: 'center', paddingTop: 10 },
    registerLbl: {
        color: '#0057ff',
        // fontFamily: Fonts.type.NotoSansSemiBold
    },
    registerNew: {
        color: '#aaa',
        // fontFamily: Fonts.type.NotoSansSemiBold,
    },
    forgotLbl: {
        color: '#0057ff',
        // textAlign: 'right',
        // fontFamily: Fonts.type.NotoSansSemiBold,
    },
    LoginBtn: {
        borderRadius: 20,
    },
    loginBtnLbl: {
        textAlign: 'center',
        fontSize: 16,
        // fontFamily: Fonts.type.NotoSansBlack,
        color: '#fff',
        paddingVertical: 10,
    },
    devider: {
        borderBottomColor: '#aaa',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 20,
    },
    or: {
        color: '#aaa',
        textAlign: 'center',
        backgroundColor: '#fff',
        width: 60,
        alignSelf: 'center',
        // fontFamily: Fonts.type.NotoSansSemiBold,
        position: 'relative',
        bottom: 13,
    },
    deviderCon: {
        paddingVertical: 10,
    },
    googleIconCon: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 20,
        paddingHorizontal: 30,
    },
    googleLbl: {
        color: '#000',
        textAlign: 'center',
        paddingHorizontal: 30,
        // fontFamily: Fonts.type.NotoSansBlack,
    },
    termsCon: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        paddingVertical: 20,
    },
    termsBy: {
        fontSize: 12,
        color: '#aaa',
        // fontFamily: Fonts.type.NotoSansSemiBold,
    },
    termLbl: {
        color: '#0057ff',
        // fontFamily: Fonts.type.NotoSansSemiBold,
        fontSize: 12,
    },
});

export default SignUp;
