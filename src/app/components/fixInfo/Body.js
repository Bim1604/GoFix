/* eslint-disable prettier/prettier */
import { faCar, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {stylesBody} from '../../styles/fixInfo';

const BodyComponent = ({navigation}) => {
  return (
    <View style={stylesBody.default.bodyContainer}>
      <TouchableOpacity
        style={stylesBody.default.bodyItemTouchable}
        onPress={() => {
          navigation.navigate('FixInfoDetailsComponent', {
            motor: true,
          });
        }}>
        <View style={stylesBody.default.bodyIconContainer}>
          <FontAwesomeIcon
            style={stylesBody.default.bodyIcon}
            icon={faMotorcycle}
            size={48}
          />
        </View>
        <View style={stylesBody.default.bodyTextContainer}>
          <View>
            <Text style={stylesBody.default.bodyTextName}>
              Subaru Impreza WRX STI RA Spec-C
            </Text>
            <Text style={stylesBody.default.bodyTextNumber}>73B.263162</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={stylesBody.default.bodyItemTouchable}
        onPress={() => {
          navigation.navigate('FixInfoDetailsComponent', {
            motor: false,
          });
        }}>
        <View style={stylesBody.default.bodyIconContainer}>
          <FontAwesomeIcon
            style={stylesBody.default.bodyIcon}
            icon={faCar}
            size={48}
          />
        </View>
        <View style={stylesBody.default.bodyTextContainer}>
          <View>
            <Text style={stylesBody.default.bodyTextName}>
              Toyota Vios
            </Text>
            <Text style={stylesBody.default.bodyTextNumber}>73B.283342</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BodyComponent;