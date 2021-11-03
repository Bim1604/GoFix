/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {stylesBody} from '../../styles/fixInfo';

export default function Bottom({navigation, id}) {
  return (
    <TouchableOpacity
      style={stylesBody.default.buttonStyle}
      onPress={() => {
        navigation.navigate('VehicleAddComponent', {
          id: id,
        });
      }}>
      <Text style={stylesBody.default.buttonTextStyle}>+</Text>
    </TouchableOpacity>
  );
}
