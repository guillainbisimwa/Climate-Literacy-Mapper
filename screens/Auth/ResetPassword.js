
import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollViewBase } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { COLORS, FONTS } from '@/constants';
import { Block, Input, Text } from "@/components"
import SvgIcon from '../../assets/icons/SvgIcon';


const ResetPassword = ({ navigation }) => {
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
            <SvgIcon icon={'reset'} width={300} height={300} />
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Reset Password</Text>
            </View>
            <View style={styles.formCon}>
              <View style={[styles.textBoxCon]}>
                <View style={styles.at}>
                  <SvgIcon icon={'lock'} width={20} height={20} />
                </View>
                <View style={[styles.passCon]}>
                  <View style={styles.textCon}>
                    <TextInput
                      style={styles.textInput}
                      placeholder={'New Password'}
                      placeholderTextColor={'#aaa'}
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
                      placeholder={'Confirm Password'}
                      placeholderTextColor={'#aaa'}
                      secureTextEntry={true}
                    />
                  </View>
                  <View style={styles.show}>
                    <SvgIcon icon={'show'} width={20} height={20} />
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.loginCon, { marginTop: 30 }]}>
              <Pressable style={styles.LoginBtn}>
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
    color: COLORS.black,
    fontSize: 38,
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
    color: COLORS.black,
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
    textAlign: 'right',
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
    color: COLORS.black,
    textAlign: 'center',
    paddingHorizontal: 30,
    // fontFamily: Fonts.type.NotoSansBlack,
  },
});

export default ResetPassword;
