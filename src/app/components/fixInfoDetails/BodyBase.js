/* eslint-disable prettier/prettier */
import {
  faCar,
  faChevronRight,
  faMapMarkerAlt,
  faMotorcycle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  stylesBodyItem,
  stylesBodyBase,
} from '../../styles/fixInfoDetails/index';

const BodyBase = ({navigation, route, address, latitude, longitude, city}) => {
  return (
    <View>
      <Text style={stylesBodyBase.default.bodyTitle}>Vị trí hiện tại</Text>
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
      <Text style={stylesBodyBase.default.bodyTitle}>Thông tin xe</Text>
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
                {route.params.motor ? 'Subaru Impreza WRX STI RA Spec-C (Đỏ, đen)' : 'Toyota Vios'}
              </Text>
            </View>
            <View style={stylesBodyItem.default.bodyMotorDetailContainer}>
              <Text style={stylesBodyItem.default.bodyMotorNumberText}>
                {'  '}
                {route.params.motor ? '73B.263162' : '73B.283342'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={stylesBodyBase.default.bodyTitle}>Mô tả hư hỏng</Text>
    </View>
  );
};
export default BodyBase;
