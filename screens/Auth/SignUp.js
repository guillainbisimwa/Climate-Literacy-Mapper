import React, { useEffect, useRef, useState } from 'react'
import { View, SafeAreaView, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollViewBase } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { COLORS, FONTS } from '@/constants';
import { Block, Input, Text } from "@/components"
import SvgIcon from '../../assets/icons/SvgIcon';
import PhoneInput from 'react-native-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';



const SignUp = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const phoneInput = useRef(null);

    const { error, isLoading, success, user } = useSelector((state) => state.user);

    const getData = async () => {
        const value = await AsyncStorage.getItem('userToken');
        console.log(value, "VALUE SIGNUP", user);
        if (value != null) {
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

    const handleSubmit = () => {

    }

    return (
        <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
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
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={'Phone number : +243 ...'}
                                    placeholderTextColor={'#aaa'}
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
                        <Pressable style={styles.LoginBtn} 
                        onPress={() => navigation.navigate("EnterOtp")} >
                            <Text style={styles.loginBtnLbl}>Create your account</Text>
                        </Pressable>
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
        backgroundColor: '#0057ff',
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
