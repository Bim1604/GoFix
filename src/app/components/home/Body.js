/* eslint-disable prettier/prettier */
import {
  faGasPump,
  faLocationArrow,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {stylesVehicle, stylesGeneral} from '../../styles/home/index';

const ItemBodyVehicle = ({icon, title, size, navigation, route}) => {
  return (
    <View>
      <View style={stylesVehicle.default.itemContainer}>
        <TouchableOpacity
          style={stylesVehicle.default.itemVehicleTouchable}
          onPress={() => {
            navigation.navigate('FixInfoComponent', {id: route.params.id});
          }}>
          <FontAwesomeIcon icon={icon} size={size} color="#fff" />
          <Text style={stylesVehicle.default.bodyItemVehicleText}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ItemBodyService = ({icon, title, size}) => {
  return (
    <View>
      <View style={stylesVehicle.default.itemContainer}>
        <TouchableOpacity style={stylesVehicle.default.itemVehicleTouchable}>
          <FontAwesomeIcon icon={icon} size={size} color="#fff" />
          <Text style={stylesVehicle.default.bodyItemVehicleText}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BodyComponent = ({navigation, route}) => {
  return (
    <View style={stylesGeneral.default.bodyContainer}>
      <View style={stylesVehicle.default.vehicleContainer}>
        <LinearGradient
          style={stylesVehicle.default.LinearGradientWrap}
          colors={['#fe8c00', '#f83600']}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}>
          <ItemBodyVehicle
            navigation={navigation}
            route={route}
            icon={faWrench}
            size={50}
            title="Đặt sửa xe cấp tốc"
          />
        </LinearGradient>
      </View>
      <View>
        <LinearGradient
          style={stylesVehicle.default.LinearServiceGradientWrap}
          colors={['#fe8c00', '#f83600']}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}>
          <ItemBodyService
            icon={faLocationArrow}
            size={40}
            title="Điểm sửa xe gần đây"
          />
        </LinearGradient>
        <LinearGradient
          style={stylesVehicle.default.LinearServiceGradientWrap}
          colors={['#fe8c00', '#f83600']}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}>
          <ItemBodyService
            icon={faGasPump}
            size={40}
            title="Trạm xăng gần đây"
          />
        </LinearGradient>
      </View>
    </View>
  );
};

export default BodyComponent;
