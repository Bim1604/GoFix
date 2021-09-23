/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {stylesBody} from '../../styles/fixInfo';

export default function Bottom({navigation}) {
  return (
    <TouchableOpacity
      style={stylesBody.default.buttonStyle}
      onPress={() => {
        navigation.navigate('FixInfoDetailsComponent', {
          motor: true,
        });
      }}>
      <Text style={stylesBody.default.buttonTextStyle}>+</Text>
    </TouchableOpacity>
  );
}
