/* eslint-disable prettier/prettier */
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Animated, Image, TouchableOpacity, View} from 'react-native';
import {useRef} from 'react';
import data from '../assets/data/navigationJson';
import stylesNav from '../styles/route/tabNav';

const Tab = createBottomTabNavigator();

const Router = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#fe8c00',
          tabBarStyle: {height: 50},
        }}>
        {data.map((item, index) => (
          <Tab.Screen
            name={item.name}
            component={item.component}
            options={{
              tabBarHideOnKeyboard: true,
              tabBarLabelStyle: {
                fontSize: item.fontSize,
              },
              tabBarVisibilityAnimationConfig: true,
              tabBarLabel: item.name,
              headerShown: false,
              tabBarIcon: ({color}) =>
                item.image === undefined ? (
                  <FontAwesomeIcon icon={item.icon} size={22} color={color} />
                ) : (
                  <TouchableOpacity style={stylesNav.middleIconContainer}>
                    <View>
                      <Image
                        source={item.image}
                        style={stylesNav.middleIconImage}
                      />
                    </View>
                  </TouchableOpacity>
                ),
              tabBarIconStyle: {
                marginTop: item.marginTop,
              },
            }}
            listeners={() => ({
              tabPress: e => {
                Animated.spring(tabOffsetValue, {
                  toValue: item.toValue,
                  useNativeDriver: true,
                }).start();
              },
            })}
            key={index}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Router;
