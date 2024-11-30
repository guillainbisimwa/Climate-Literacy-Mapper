import React, { useEffect, useState } from 'react';
import {
    View, KeyboardAvoidingView, ScrollView, StyleSheet,
    TextInput, Pressable, TouchableOpacity,
    Alert,
    Image
} from 'react-native'
import { Button, } from 'react-native-paper';
import PhoneInput from 'react-native-international-phone-number';

// import AsyncStorage from "@react-native-async-storage/async-storage";
import Container, { Toast } from 'toastify-react-native';
import { COLORS, FONTS } from '../constants';
import Text  from "../components/Text"
import SvgIcon from '../assets/icons/SvgIcon';
// import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '@/redux/userSlice';



export default function Auth() {
  const dispatch = useDispatch();

  const { error, isLoading, success, user } = useSelector((state) => state.user);

  const [phone, setPhone] = useState("");
  const [country, setCounty] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  return (
    <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
            <Container position="top" style={{ width: '100%' }} duration={6000} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <View style={styles.loginIcon}>
                    {/* <SvgIcon icon={'login'} width={300} height={300} /> */}
                    <Image source={require('../assets/images/logo.png')} style={{ height: 300, width: 300 }} />
                </View>
                {/* <View style={styles.container}>
                    <View style={styles.loginLblCon}>
                        <Text style={styles.loginLbl}>Login</Text>
                    </View>

                    <View style={styles.formCon}>
                        <View style={styles.textBoxCon}>

                            <PhoneInput
                                value={phone}
                                onChangePhoneNumber={setPhone}
                                selectedCountry={country}
                                onChangeSelectedCountry={setCounty}
                                defaultCountry='KE'
                            />

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
                            <Pressable 
                            //</View>onPress={() => navigation.navigate("ForgotPassword")}
                            >
                                <Text style={styles.forgotLbl}>Forgot Password?</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.loginCon}>
                        <Button style={styles.LoginBtn} disabled={isLoading} mode="contained" loading={isLoading}
                            // onPress={() => handleSubmit()}
                            >
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
                        <Pressable // onPress={() => navigation.navigate("SignUp")}
                          >
                            <Text style={styles.registerLbl}>Register</Text>
                        </Pressable>
                    </View>
                </View> */}
            </ScrollView>
        </KeyboardAvoidingView>
  );
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
