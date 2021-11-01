/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileComponent from '../components/profile';
import InfoUpdateComponent from '../components/profile/InfoUpdate';

const Stack = createStackNavigator();

const ProfileScreen = ({route}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ProfileComponent"
        initialParams={{
          fullName: route.params.fullName,
          phone: route.params.phone,
        }}
        component={ProfileComponent}
      />
      <Stack.Screen
        name="InfoUpdateComponent"
        component={InfoUpdateComponent}
      />
    </Stack.Navigator>
  );
};

export default ProfileScreen;
