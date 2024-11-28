import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: 
  //   {
  //     "msg": "Login successful",
  //     "user": {
  //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzNmODViMTdiM2VkMWJmMjA3ZmM2Y2MiLCJlbWFpbCI6IiIsIm5hbWUiOiJDTE1VU0VSIiwibW9iaWxlIjoiKzI0Mzg5MTk3OTAxOCIsInByb2ZpbGVfcGljIjoiIiwiaWF0IjoxNzMyMjE2Mzg5LCJleHAiOjE3MzIzMDI3ODl9.oexzo2mmf1beC-4hr1vHO6TxwkeQuY4nR_tDMXKM16o",
  //         "user": {
  //             "userId": "673f85b17b3ed1bf207fc6cc",
  //             "email": "",
  //             "name": "CLMUSER",
  //             "mobile": "+243891979018",
  //             "profile_pic": ""
  //         }
  //     }
  // }, 
   null, // Use user data from AS or set to null
    error: null,
    isLoading: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    logoutUser: (state) => {
      state.isLoading = false;
      state.user = null;
      state.error = null;

      // Clear user data from AsyncStorage
      AsyncStorage.removeItem('user');

    },
  },
});

export const { loginSuccess, logoutUser } = authSlice.actions;

export default authSlice.reducer;
