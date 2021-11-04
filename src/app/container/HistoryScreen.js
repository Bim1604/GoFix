/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HistoryComponent from '../components/history';
import DetailsItem from '../components/detailsHistory';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';

const Stack = createStackNavigator();

const HistoryScreen = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'HistoryDetailsComponent') {
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
          id: route.params.id,
        }}
        name="HistoryComponent"
        component={HistoryComponent}
      />
      <Stack.Screen name="HistoryDetailsComponent" component={DetailsItem} />
    </Stack.Navigator>
  );
};

export default HistoryScreen;
