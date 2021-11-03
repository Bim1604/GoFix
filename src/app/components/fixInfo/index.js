/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {stylesHeader} from '../../styles/fixInfo';
import BodyComponent from './Body';
import Bottom from './Bottom';
import HeaderComponent from './Header';

const FixInfoComponent = ({navigation, route}) => {
  return (
    <View style={stylesHeader.default.container}>
      <ScrollView>
        <HeaderComponent navigation={navigation} />
        <BodyComponent navigation={navigation} route={route} />
      </ScrollView>
      <Bottom
        navigation={navigation}
        id={route.params.id}
      />
    </View>
  );
};

export default FixInfoComponent;
