/* eslint-disable prettier/prettier */
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {stylesBottom} from '../../styles/fixInfoDetails/index';

const BottomView = ({
  description,
  readyHetBinh,
  readyLopXe,
  readyBeBanh,
  readyBugi,
  readyTooHot,
  readyChetMay,
  navigation,
  lat,
  lng,
  address,
  city,
}) => {
  return (
    <View>
      <View style={stylesBottom.default.bottomView}>
        <Text style={stylesBottom.default.bottomText}>
          {description.length === 0 &&
          !readyHetBinh &&
          !readyLopXe &&
          !readyBeBanh &&
          !readyBugi &&
          !readyTooHot &&
          !readyChetMay
            ? 'Bạn chưa điền mô tả'
            : ''}
        </Text>
        <TouchableOpacity
          style={
            description.length === 0 &&
            !readyHetBinh &&
            !readyLopXe &&
            !readyBeBanh &&
            !readyBugi &&
            !readyTooHot &&
            !readyChetMay
              ? stylesBottom.default.bottomTouchableNotReady
              : stylesBottom.default.bottomTouchableReady
          }
          onPress={() => {
            if (
              description.length === 0 &&
              !readyHetBinh &&
              !readyLopXe &&
              !readyBeBanh &&
              !readyBugi &&
              !readyTooHot &&
              !readyChetMay
            ) {
              console.log('hi');
            } else {
              navigation.navigate('WaitingMechanicComponent', {
                latitude: lat,
                longitude: lng,
                address: address,
                city: city,
              });
            }
          }}>
          <Text style={stylesBottom.default.bottomTextTouchable}>
            XÁC NHẬN VÀ TIẾP TỤC
          </Text>
          <FontAwesomeIcon
            style={stylesBottom.default.bottomIcon}
            icon={faChevronRight}
            size={23}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomView;
