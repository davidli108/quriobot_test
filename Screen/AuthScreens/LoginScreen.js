import React, { useState, createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import axios from 'axios';

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { actions } from '../../redux/authSlice';

import Loader from '../../components/Loader';

const baseUrl = 'https://control.quriobot.com';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [siteKey, setSiteKey] = useState('');

  const passwordInputRef = createRef();
  const captchaRef = createRef();

  const authLoading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    setLoading(authLoading);

    if (authLoading) {
      navigation.replace('DrawerNavigationRoutes');
    }
  }, [authLoading]);

  useEffect(() => {
    const fetchSiteKey = async () => {
      const res = await axios.get('/recaptcha');
      setSiteKey(res.data.site_key);
    };

    fetchSiteKey();
  }, []);

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    captchaRef.current.show();
  };

  const onMessage = (event) => {
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        captchaRef.current.hide();
        return;
      } else {
        console.log('Verified code from Google');
        captchaRef.current.hide();
        dispatch(
          actions.login({
            userEmail,
            userPassword,
            captchaMsg: event.nativeEvent.data,
          })
        );
      }
    }
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../Image/appIcon.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder='Enter Email'
                placeholderTextColor='#bbb'
                autoCapitalize='none'
                keyboardType='email-address'
                returnKeyType='next'
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid='#f000'
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder='Enter Password'
                placeholderTextColor='#bbb'
                keyboardType='default'
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid='#f000'
                returnKeyType='next'
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <ConfirmGoogleCaptcha
              ref={captchaRef}
              siteKey={siteKey}
              baseUrl={baseUrl}
              languageCode='en'
              onMessage={onMessage}
            />
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4ba2f9',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
