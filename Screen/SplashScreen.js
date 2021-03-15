import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { actions as authActions } from '../redux/authSlice';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('token').then((value) => {
        if (value) {
          navigation.replace('DrawerNavigationRoutes');
          dispatch(authActions.setLoggedIn());
        }
        navigation.replace('Auth');
      });
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/appIcon.png')}
        style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color='#FFFFFF'
        size='large'
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ba2f9',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
