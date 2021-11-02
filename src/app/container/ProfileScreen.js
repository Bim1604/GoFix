/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileComponent from '../components/profile';
import InfoUpdateComponent from '../components/profile/InfoUpdate';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import InfoDetailsComponent from '../components/profile/InfoDetails';
import VehicleDetailsComponent from '../components/profile/VehicleDetails';
import VehicleUpdateComponent from '../components/profile/VehicleUpdate';
import VehicleAddComponent from '../components/profile/VehicleAdd';

const Stack = createStackNavigator();

const ProfileScreen = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'InfoUpdateComponent' ||
      routeName === 'InfoDetailsComponent' ||
      routeName === 'VehicleDetailsComponent' ||
      routeName === 'VehicleUpdateComponent' ||
      routeName === 'VehicleAddComponent'
    ) {
      navigation.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: 'flex',
        },
      });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ProfileComponent"
        initialParams={{
          fullName: route.params.fullName,
          phone: route.params.phone,
          setFullName: route.params.setFullName,
        }}
        component={ProfileComponent}
      />
      <Stack.Screen
        name="InfoUpdateComponent"
        component={InfoUpdateComponent}
      />
      <Stack.Screen
        name="InfoDetailsComponent"
        component={InfoDetailsComponent}
      />
      <Stack.Screen
        name="VehicleDetailsComponent"
        component={VehicleDetailsComponent}
      />
      <Stack.Screen
        name="VehicleAddComponent"
        component={VehicleAddComponent}
      />
      <Stack.Screen
        name="VehicleUpdateComponent"
        component={VehicleUpdateComponent}
      />
    </Stack.Navigator>
  );
};

export default ProfileScreen;
