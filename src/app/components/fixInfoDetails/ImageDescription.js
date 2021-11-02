/* eslint-disable prettier/prettier */
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {stylesBodyItem, stylesBodyBase} from '../../styles/fixInfoDetails/index';
const ImageDescription = ({navigation}) => {
  return (
    <View>
      <View style={stylesBodyBase.default.bodyFormContainer}>
        <TouchableOpacity
          style={stylesBodyItem.default.bodyImageDesContainer}
          onPress={() => {
            navigation.navigate('CameraComponent');
          }}>
          <View style={stylesBodyItem.default.bodyImageDesIconContainer}>
            <FontAwesomeIcon
              style={stylesBodyItem.default.bodyImageDesIcon}
              icon={faCamera}
              size={23}
            />
          </View>
          <View>
            <Text style={stylesBodyItem.default.bodyImageDesText}>
              Chụp ảnh
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageDescription;
