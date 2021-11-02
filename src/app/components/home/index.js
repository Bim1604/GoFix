/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {stylesGeneral} from '../../styles/home/index';
import AdvertisementComponent from './Advertisement';
import BodyComponent from './Body';
import HeaderComponent from './Header';


const HomeComponent = ({navigation, route}) => {
  return (
    <View style={stylesGeneral.default.container}>
      <ScrollView>
        {/* Header */}
        <HeaderComponent />
        {/* Quang cao */}
        <AdvertisementComponent />
        {/* Main Home */}
        <BodyComponent route={route} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default HomeComponent;
