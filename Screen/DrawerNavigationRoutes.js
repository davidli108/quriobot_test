import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

import HomeScreen from './DrawerScreens/Home/HomeScreen';
import BotResponseScreen from './DrawerScreens/Home/BotReponseScreen';
import ResponseDetailScreen from './DrawerScreens/Home/ResponseDetailScreen';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          title: 'Dashboard',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#4ba2f9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name='BotReponseScreen'
        component={BotResponseScreen}
        options={{
          title: 'Bot Reponses',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Icon
                type='ionicon'
                name={
                  Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'
                }
                color='white'
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#4ba2f9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name='ResponseDetailScreen'
        component={ResponseDetailScreen}
        options={{
          title: 'Response Transcript',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Icon
                type='ionicon'
                name={
                  Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'
                }
                color='white'
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#4ba2f9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: { marginVertical: 5, color: 'white' },
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={CustomSidebarMenu}
    >
      <Drawer.Screen
        name='homeScreenStack'
        options={{ drawerLabel: 'Dashboard' }}
        component={homeScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
