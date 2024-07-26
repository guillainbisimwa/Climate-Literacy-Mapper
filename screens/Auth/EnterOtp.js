import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollViewBase } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { COLORS, FONTS } from '@/constants';
import { Block, Input, Text } from "@/components"
import SvgIcon from '../../assets/icons/SvgIcon';
import OTPInputView from '@twotalltotems/react-native-otp-input';


const EnterOtp = ({ navigation }) => {
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

        <View style={{ padding: 20 }}>
          <Pressable onPress={() => navigation.goBack(null)}>
            <SvgIcon icon={'back'} width={30} height={30} />
          </Pressable>
        </View>
        <View style={{ position: 'relative', bottom: 30 }}>
          <View style={styles.loginIcon}>
            <SvgIcon icon={'enterOtp'} width={280} height={280} />
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Enter OTP?</Text>
            </View>
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                An 4 digit code has been sent to +234 ----
              </Text>
            </View>
            <View style={styles.formCon}>
              <OTPInputView
                pinCount={4}
                autoFocusOnLoad
                style={{ width: '80%', height: 70 }}
                codeInputFieldStyle={{ color: COLORS.black }}
                onCodeFilled={
                  code => {navigation.navigate('ResetPassword')}
                }
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                
                codeInputHighlightStyle={{ borderColor: "#03DAC6" }}
               
              />
              <Pressable>
                <Text style={styles.registerLbl}>Resend OTP</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({

  scrollContainer: {
    flexGrow: 1,
    // paddingHorizontal: 24,
  },
  mainCon: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: COLORS.black,
    fontSize: 40,
    // fontFamily: Fonts.type.NotoSansExtraBold,
  },
  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: COLORS.black,
    // fontFamily: Fonts.type.NotoSansRegular,
  },
  registerLbl: {
    color: '#0057ff',
    // fontFamily: Fonts.type.NotoSansSemiBold
  },
});

export default EnterOtp;
