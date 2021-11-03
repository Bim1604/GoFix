/* eslint-disable prettier/prettier */
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import data from '../assets/data/navigationJson';
import stylesNav from '../styles/route/tabNav';
import LoginScreen from '../components/auth/Login';

const Tab = createBottomTabNavigator();
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);
const Router = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('0364909656');
  const [id, setId] = useState();
  if (fullName === '') {
    return (
      <LoginScreen
        setFullName={setFullName}
        setInitPhone={setPhone}
        setId={setId}
        navigation={navigation}
      />
    );
  } else {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#fe8c00',
          tabBarStyle: {height: 50},
        }}>
        {data.map((item, index) => (
          <Tab.Screen
            initialParams={{
              fullName: fullName,
              phone: phone,
              id: id,
              setFullName: setFullName,
            }}
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
            key={index}
          />
        ))}
      </Tab.Navigator>
    );
  }
};

export default Router;
