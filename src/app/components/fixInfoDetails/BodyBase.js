/* eslint-disable prettier/prettier */
import {
  faCar,
  faChevronRight,
  faMapMarkerAlt,
  faMotorcycle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  stylesBodyItem,
  stylesBodyBase,
} from '../../styles/fixInfoDetails/index';

const BodyBase = ({navigation, route, address, latitude, longitude, city}) => {
  return (
    <View>
      <Text style={stylesBodyBase.default.bodyTitle}>VỊ TRÍ HIỆN TẠI</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CurrentLocationComponent', {
            address:
              route.params.address === undefined
                ? address
                : route.params.address,
            lat: route.params.lat === undefined ? latitude : route.params.lat,
            lng: route.params.lng === undefined ? longitude : route.params.lng,
            city: route.params.city === undefined ? city : route.params.city,
          });
        }}
        style={stylesBodyBase.default.bodyFormContainer}>
        <View style={stylesBodyBase.default.bodyAddress}>
          <View style={stylesBodyBase.default.bodyAddressIconContainer}>
            <FontAwesomeIcon
              style={stylesBodyBase.default.bodyAddressIcon}
              icon={faMapMarkerAlt}
              size={25}
            />
          </View>
          <View style={stylesBodyBase.default.bodyAddressTextContainer}>
            <Text style={stylesBodyBase.default.bodyAddressText}>
              {route.params.address === undefined
                ? address
                : route.params.address}
            </Text>
          </View>
          <View style={stylesBodyBase.default.bodyIconContainer}>
            <FontAwesomeIcon
              style={stylesBodyBase.default.bodyIcon}
              icon={faChevronRight}
              size={20}
            />
          </View>
        </View>
      </TouchableOpacity>
      <Text style={stylesBodyBase.default.bodyTitle}>THÔNG TIN XE</Text>
      {/* Xe máy */}
      <View>
        <View style={stylesBodyBase.default.bodyFormContainer}>
          <View style={stylesBodyBase.default.bodyAddressIconContainer}>
            <FontAwesomeIcon
              style={stylesBodyBase.default.bodyAddressIcon}
              icon={route.params.motor ? faMotorcycle : faCar}
              size={32}
            />
          </View>
          <View>
            <View style={stylesBodyItem.default.bodyMotorNameContainer}>
              <Text style={stylesBodyItem.default.bodyMotorNameText}>
                Subaru Impreza WRX STI RA Spec-C (Đỏ, đen)
              </Text>
            </View>
            <View style={stylesBodyItem.default.bodyMotorDetailContainer}>
              <Text style={stylesBodyItem.default.bodyMotorNumberText}>
                {' '}
                73B.263162
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={stylesBodyBase.default.bodyTitle}>MÔ TẢ HƯ HỎNG</Text>
    </View>
  );
};
export default BodyBase;
