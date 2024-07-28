import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollViewBase } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { COLORS, FONTS } from '@/constants';
import { Block, Input, Text } from "@/components"
import SvgIcon from '../../assets/icons/SvgIcon';


const ForgotPassword = ({navigation}) => {
  
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
            <SvgIcon icon={'forgot'} width={320} height={320} />
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Forgot Password?</Text>
            </View>
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                Don't worry! It happens, please enter the phone number associated
                with your account
              </Text>
            </View>
            <View style={styles.formCon}>
              <View style={styles.textBoxCon}>
                <View style={styles.at}>
                  <SvgIcon icon={'phone'} width={20} height={20} />
                </View>
                <View style={styles.textCon}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'Phone number: +243 ...'}
                    placeholderTextColor={'#aaa'}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>

            <View style={[styles.loginCon, { marginTop: 40 }]}>
              <Pressable
                style={styles.LoginBtn}
                onPress={() => navigation.navigate('EnterOTP')}>
                <Text style={styles.loginBtnLbl}>Submit</Text>
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

  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCon: {
    width: '90%',
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

  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    // fontFamily: Fonts.type.NotoSansRegular,
  },
});

export default ForgotPassword;
