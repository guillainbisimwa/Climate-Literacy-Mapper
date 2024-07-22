import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollViewBase } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { COLORS, FONTS } from '@/constants';
import { Block, Input, Text } from "@/components"
import SvgIcon from '../../assets/icons/SvgIcon';


const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userLoggedIn, setUserLoggedIn] = useState(false);


    const getData = async () => {
        const value = await AsyncStorage.getItem('userToken')
        if (value !== null) {
            // navigation.navigate("homeScreen")
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
                    <SvgIcon icon={'login'} width={300} height={300} />
                </View>
                <View style={styles.container}>
                    <View style={styles.loginLblCon}>
                        <Text style={styles.loginLbl}>Login</Text>
                    </View>

                    <View style={styles.formCon}>
                        <View style={styles.textBoxCon}>
                            <View style={styles.at}>
                                <SvgIcon icon={'phone'} width={20} height={20} />
                            </View>
                            <View style={styles.textCon}>
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType="phone-pad"
                                    placeholder={'Phone number: +350 ...'}
                                    placeholderTextColor={COLORS.darkgray}
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
                        
                        <View style={styles.forgotAction}>
                            <Pressable>
                                <Text style={styles.forgotLbl}>Forgot Password?</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.loginCon}>
                        <Pressable style={styles.LoginBtn}>
                            <Text style={styles.loginBtnLbl}>Login</Text>
                        </Pressable>
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
                        <Pressable>
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
    container: {
        paddingHorizontal: 20,
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
    registerLbl:{
        color: '#0057ff',
        textAlign: 'right',
    },

    LoginBtn: {
        backgroundColor: '#0057ff',
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
