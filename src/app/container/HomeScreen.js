/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeComponent from '../components/home/index';
import FixInfoComponent from '../components/fixInfo/index';
import FixInfoDetailsComponent from '../components/fixInfoDetails/index';
import ImagePicker from '../components/fixInfoDetails/CameraComponent';
import LocationComponent from '../components/fixInfoDetails/LocationComponent';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import SearchMapComponent from '../components/fixInfoDetails/SearchMapComponent';
import WaitingMechanic from '../components/waitingMechanic';
import EvaluateComponent from '../components/evaluate';
import VehicleAddComponent from '../components/profile/VehicleAdd';
const Stack = createStackNavigator();

const HomeScreen = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'FixInfoDetailsComponent' ||
      routeName === 'CurrentLocationComponent' ||
      routeName === 'CameraComponent' ||
      routeName === 'SearchMapComponent' ||
      routeName === 'WaitingMechanicComponent' ||
      routeName === 'EvaluateComponent' ||
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
        initialParams={{
          fullName: route.params.fullName,
          phone: route.params.phone,
          setFullName: route.params.setFullName,
          id: route.params.id,
        }}
        name="HomeComponent"
        component={HomeComponent}
      />
      <Stack.Screen name="FixInfoComponent" component={FixInfoComponent} />
      <Stack.Screen
        name="FixInfoDetailsComponent"
        component={FixInfoDetailsComponent}
      />
      <Stack.Screen name="CameraComponent" component={ImagePicker} />
      <Stack.Screen
        name="CurrentLocationComponent"
        component={LocationComponent}
      />
      <Stack.Screen name="SearchMapComponent" component={SearchMapComponent} />
      <Stack.Screen
        name="WaitingMechanicComponent"
        component={WaitingMechanic}
      />
      <Stack.Screen
        name="VehicleAddComponent"
        component={VehicleAddComponent}
      />
      <Stack.Screen name="EvaluateComponent" component={EvaluateComponent} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
