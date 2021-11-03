/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import RegisComponent from '../components/auth/Regis';
import Router from '../router/navigation';

const Stack = createStackNavigator();

const LoginScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginComponent" component={Router} />
        <Stack.Screen name="RegisComponent" component={RegisComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginScreen;
